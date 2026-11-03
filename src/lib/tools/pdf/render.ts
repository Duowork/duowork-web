import { createElement, type ReactElement } from "react";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import regular from "../../../assets/pdf-fonts/IBMPlexSans-Regular.ttf?url";
import medium from "../../../assets/pdf-fonts/IBMPlexSans-Medium.ttf?url";
import semiBold from "../../../assets/pdf-fonts/IBMPlexSans-SemiBold.ttf?url";
import fallbackRegular from "../../../assets/pdf-fonts/NotoSansNigerian-Regular.ttf?url";
import fallbackSemiBold from "../../../assets/pdf-fonts/NotoSansNigerian-SemiBold.ttf?url";
import { pdfFileName, type DocumentView } from "../document";
import { downloadBlob } from "../files";
import type { ReceiptView } from "../receipt";
import { registerPdfFonts } from "./fonts";
import { droppedNotice, pdfSafeView } from "./safe-text";
import DocumentPdf from "./DocumentPdf";
import ReceiptPdf from "./ReceiptPdf";

/**
 * The entry point for PDF export. Editors import this dynamically, so the
 * renderer and its fonts only load for someone who actually downloads.
 */
async function save(element: ReactElement<DocumentProps>, fileName: string) {
  registerPdfFonts({ regular, medium, semiBold, fallbackRegular, fallbackSemiBold });
  downloadBlob(await pdf(element).toBlob(), fileName);
}

/** Both resolve to a note about anything the PDF had to leave out, or "". */
export async function saveDocumentPdf(source: DocumentView) {
  const { view, dropped } = pdfSafeView(source);
  await save(
    createElement(DocumentPdf, { view }) as ReactElement<DocumentProps>,
    pdfFileName(view.title, view.number),
  );
  return droppedNotice(dropped);
}

export async function saveReceiptPdf(source: ReceiptView) {
  const { view, dropped } = pdfSafeView(source);
  await save(
    createElement(ReceiptPdf, { view }) as ReactElement<DocumentProps>,
    pdfFileName("Receipt", view.number),
  );
  return droppedNotice(dropped);
}
