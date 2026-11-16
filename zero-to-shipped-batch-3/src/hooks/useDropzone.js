import { useState } from "react";

// Custom hook: tracks whether a file is being dragged over an element,
// and hands the dropped file to `onFile`.
// It returns the event handlers to spread onto the element.
export function useDropzone(onFile) {
  const [isDragging, setIsDragging] = useState(false);

  const dropProps = {
    onDragOver: (event) => {
      // preventDefault stops the browser opening the file in a new tab.
      event.preventDefault();
      setIsDragging(true);
    },
    onDragLeave: () => setIsDragging(false),
    onDrop: (event) => {
      event.preventDefault();
      setIsDragging(false);
      const file = event.dataTransfer.files[0];
      if (file) onFile(file);
    },
  };

  return { isDragging, dropProps };
}
