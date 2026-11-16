import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth";

// pdf.js parses PDFs in a Web Worker so the page stays responsive.
// Vite turns the `?url` import into the address of the worker file it bundled.
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

// Turn an uploaded File into plain text. Nothing leaves the browser.
export async function extractText(file) {
  const name = file.name.toLowerCase();
  const buffer = await file.arrayBuffer();

  if (name.endsWith(".pdf")) {
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let text = "";
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }
    return text;
  }

  if (name.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value;
  }

  throw new Error("Please upload a PDF or .docx file.");
}
