import { useRef } from "react";
import { useDropzone } from "../hooks/useDropzone.js";
import { ACCEPTED_TYPES } from "../lib/constants.js";

// Drag-and-drop area that also opens the file picker when clicked.
export default function DropZone({ file, onFile }) {
  const inputRef = useRef(null);
  const { isDragging, dropProps } = useDropzone(onFile);

  return (
    <div
      {...dropProps}
      onClick={() => inputRef.current?.click()}
      className={`flex flex-col items-start justify-end h-64 border-2 border-dashed p-6 text-left cursor-pointer transition-colors ${
        isDragging ? "bg-surface-2 border-solid border-accent" : "bg-surface border-ink hover:bg-surface-2"
      }`}
    >
      <p className="font-display text-2xl font-semibold leading-tight">Drag and drop your resume here</p>
      <p className="text-muted mt-2">PDF or .docx, or click to choose a file</p>
      {file && <p className="mt-4 text-accent-ink">Selected: {file.name}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        className="hidden"
        onChange={(event) => event.target.files[0] && onFile(event.target.files[0])}
      />
    </div>
  );
}
