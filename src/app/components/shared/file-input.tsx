import Compressor from "compressorjs";
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
  defaultFile?: File | null;
  id: string;
  label?: string;
  accept?: string;
  onChange: (event: File | null) => void;
}
export default function FileInput({
  defaultFile,
  label,
  onChange,
  id,
  accept = "image/*",
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  useEffect(() => {
    if (defaultFile) {
      setSelectedFile(defaultFile);
    }
  }, [defaultFile]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageFile =
      event.target && event.target.files ? event.target.files[0] : null;

    if (!imageFile) return;

    new Compressor(imageFile, {
      quality: 0.6,
      maxWidth: 800,
      success: (compressedResult) => {
        console.log({ compressedResult });
        setSelectedFile(compressedResult as File);
        onChange(compressedResult as File);
      },
      error: (error) => {
        console.error("Error al comprimir la imagen:", error);
      },
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <input
          type="file"
          id={id}
          accept={accept}
          onChange={handleImageChange}
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
