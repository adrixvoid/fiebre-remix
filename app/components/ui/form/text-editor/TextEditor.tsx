import { Slot } from "@radix-ui/react-slot";
import cx from 'clsx';
import { atom, useAtom } from 'jotai';
import { Bold, Heading, Italic, List, Text } from "lucide-react";
import { useEffect, useRef } from 'react';

import Button from '~/components/ui/button/Button';
import { Label } from '~/components/ui/form/Label';
import TextArea, { TextAreaProps } from '~/components/ui/form/TextArea';

import useDebounce from '~/hooks/useDebounce';

import styles from "./TextEditor.module.css";

const historyAtom = atom<string[]>([])
const historyIndexAtom = atom(-1)

export interface TextEditorProps extends TextAreaProps {
  asChild?: boolean;
}

type TextOption = "bold" | "italic" | "title" | "paragraph" | "list"

export function TextEditor({ id, name, label, labelProps, children, className, asChild, onKeyDown, ...rest }: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [history, saveHistory] = useAtom<string[]>(historyAtom)
  const [historyIndex, setHistoryIndex] = useAtom(historyIndexAtom)
  const { setDebounce } = useDebounce()

  function saveState() {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    // If we're not at the latest state, remove all states ahead of the current one
    if (historyIndex < history.length - 1) {
      saveHistory(history.slice(0, historyIndex + 1));
    }

    // overwrite history
    let currentHistory = history
    if (history.length > historyIndex + 1) {
      currentHistory = currentHistory.splice(historyIndex + 1, currentHistory.length - (historyIndex + 1));
    }

    const saveHistoryState = [
      ...currentHistory,
      textarea.value
    ];

    saveHistory(saveHistoryState);
    setHistoryIndex(historyIndex + 1);
  }

  function undo() {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      textarea.value = history[historyIndex - 1];
    }
  }

  function redo() {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      textarea.value = history[historyIndex + 1];
    }
  }

  function lineText(value: string, start: number, end: number, char: string) {
    // Find the start of the line
    const beforeStart = value.substring(0, start);
    const lineStart = beforeStart.lastIndexOf('\n') + 1;
    const afterEnd = value.substring(end);
    const nextNewline = afterEnd.indexOf('\n');
    const lineEnd = end + (nextNewline === -1 ? afterEnd.length : nextNewline);

    // Prepend the '-' to the line
    const lineText = value.substring(lineStart, lineEnd);
    const markdownText = `${char} ${lineText}`;

    return {
      start: lineStart,
      end: lineEnd,
      text: markdownText,
    };
  }

  function searchCoincidence(value: string, start: number, end: number, char: string) {

  }

  type MarkdownTextTypes = "bold" | "italic" | "title" | "paragraph" | "list";

  function addMarkdownCode(selectedText: string, style: MarkdownTextTypes) {
    let markdownText = '';

    switch (style) {
      case 'bold':
        markdownText = `**${selectedText}**`;
        break;
      case 'italic':
        markdownText = `*${selectedText}*`;
        break;
      case 'title':
        markdownText = `# ${selectedText}`;
        break;
      case 'paragraph':
        markdownText = `${selectedText}\n\n`;
        break;
      default:
        markdownText = selectedText;
    }

    return markdownText;
  }

  function completeEntireWord(value: string, start: number, end: number, style: MarkdownTextTypes) {
    const beforeStart = value.substring(0, start);
    const afterEnd = value.substring(end);
    const textStartIndex = beforeStart.lastIndexOf(' ') + 1;
    const textEndIndex = afterEnd.indexOf(' ') + end;

    const selectedText = value.substring(textStartIndex, textEndIndex)

    const markdownText = addMarkdownCode(selectedText, style);

    return {
      start: textStartIndex,
      end: textEndIndex,
      text: markdownText
    }
  }

  function addMarkdownStyle(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, style: TextOption) {
    event.preventDefault();
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (start === end && style !== 'list') {
      const result = completeEntireWord(textarea.value, start, end, style)
      textarea.value = textarea.value.substring(0, result.start) + result.text + textarea.value.substring(result.end);
      saveState();
      return;
    }

    if (style === 'list') {
      const result = lineText(textarea.value, start, end, '-');
      textarea.value = textarea.value.substring(0, result.start) + result.text + textarea.value.substring(result.end);
      saveState();
      return;
    }

    const markdownText = addMarkdownCode(selectedText, style);

    textarea.value = textarea.value.substring(0, start) + markdownText + textarea.value.substring(end);
    saveState();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const isUndo = (event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey;
    const isRedo = (event.ctrlKey || event.metaKey) && event.key === 'z' && event.shiftKey;

    if ((isUndo || isRedo)) {
      event.preventDefault();
      if (isUndo) {
        undo();
      } else {
        redo();
      }
    } else {
      if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {
        setDebounce(saveState, 300)
      }
    }

    onKeyDown?.(event);
  }

  useEffect(() => {
    saveState();
  }, [])

  const Comp = asChild ? Slot : TextArea

  return (
    <>
      {label && <Label id={id} name={name} {...labelProps}>{label}</Label>}
      <div className={styles.wrapper}>
        <div className={styles["button-group"]}>
          <Button variant="ghost" size="sm" onClick={(event) => addMarkdownStyle(event, "bold")}><Bold /><span className="sr-only">Bold</span></Button>
          <Button variant="ghost" size="sm" onClick={(event) => addMarkdownStyle(event, 'italic')}><Italic /></Button>
          <Button variant="ghost" size="sm" onClick={(event) => addMarkdownStyle(event, 'title')}><Heading /><span className="sr-only">Title</span></Button>
          <Button variant="ghost" size="sm" onClick={(event) => addMarkdownStyle(event, 'paragraph')}><Text /><span className="sr-only">Paragraph</span></Button>
          <Button variant="ghost" size="sm" onClick={(event) => addMarkdownStyle(event, 'list')}><List /><span className="sr-only">List</span></Button>
        </div>
        <TextArea ref={textareaRef} id={id} name={name} className={cx(styles.base, className)} {...rest} onKeyDown={handleKeyDown} />
      </div>
    </>
  )
};

export default TextEditor;
