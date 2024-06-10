import { useEffect, useRef, useState } from 'react';
import { Slot } from "@radix-ui/react-slot"
import cx from 'clsx';
import TextArea, { TextAreaProps } from '../Textarea';
import Button from '~/components/button/Button';
import { atom, useAtom } from 'jotai';
import useDebounce from '~/hooks/useDebounce';
import { Label } from '../Label';

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

  function addMarkdownStyle(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, style: TextOption) {
    event.preventDefault();
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
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
      case 'list':
        markdownText = `- ${selectedText}`;
        break;
      default:
        markdownText = selectedText;
    }

    textarea.value = textarea.value.substring(0, start) + markdownText + textarea.value.substring(end);
    setDebounce(saveState, 300)
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
      <div className="flex">
        <Button onClick={(event) => addMarkdownStyle(event, "bold")}>Bold</Button>
        <Button onClick={(event) => addMarkdownStyle(event, 'italic')}>Italic</Button>
        <Button onClick={(event) => addMarkdownStyle(event, 'title')}>Title</Button>
        <Button onClick={(event) => addMarkdownStyle(event, 'paragraph')}>Paragraph</Button>
        <Button onClick={(event) => addMarkdownStyle(event, 'list')}>List</Button>
      </div>
      <textarea ref={textareaRef} id={id} name={name} className={cx("w-full mb-2", className)} {...rest} onKeyDown={handleKeyDown} />
    </>
  )
};

export default TextEditor;
