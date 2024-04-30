export type FilePreview = {
  type: string;
  name: string;
  url: string;
};

export interface UploadFileProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  labelText?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  onPreview?: (preview: FilePreview[]) => void;
}
