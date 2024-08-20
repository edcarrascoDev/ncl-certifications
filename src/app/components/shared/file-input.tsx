import { useState } from "react";

interface Props {
  id: string;
  label?: string;
  accept?: string;
  onChange: (event: File | null) => void;
}
export default function FileInput({
  label,
  onChange,
  id,
  accept = "image/*",
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <input
          type="file"
          id={id}
          accept={accept}
          onChange={(e) => {
            setSelectedFile(
              e.target && e.target.files ? e.target.files[0] : null,
            );
            onChange(e.target && e.target.files ? e.target.files[0] : null);
          }}
          hidden
        />
        <label
          htmlFor={id}
          className="block text-xs mr-2 p-2
            rounded border-0 font-semibold bg-primary
            text-white hover:opacity-85 cursor-pointer text-nowrap "
        >
          {label}
        </label>
        <label className="text-xs text-slate-500 text-nowrap overflow-ellipsis overflow-hidden max-w-1/4 ">
          {selectedFile?.name || "..."}
        </label>
      </div>
    </div>
  );
}
