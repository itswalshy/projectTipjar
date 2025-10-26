import Tesseract from "tesseract.js";
import { formatOCRResult } from "@/lib/formatUtils";
import {
  parseStarbucksReport,
  validateParseResult,
} from "@shared/ocrParser";
import type { PartnerHours } from "@shared/schema";

export type OCRClientResult = {
  extractedText: string;
  partnerHours: PartnerHours;
  confidence: number;
  engine: string;
};

export class OCRProcessingError extends Error {
  extractedText?: string;
  constructor(message: string, extractedText?: string) {
    super(message);
    this.name = "OCRProcessingError";
    this.extractedText = extractedText;
  }
}

function formatStatus(status: string): string {
  switch (status) {
    case "loading tesseract core":
      return "Loading OCR engine";
    case "initializing tesseract":
      return "Initializing OCR";
    case "loaded tesseract core":
      return "Preparing OCR engine";
    case "initializing api":
      return "Preparing OCR";
    case "recognizing text":
      return "Analyzing report";
    default:
      return status.replace(/_/g, " ");
  }
}

export async function extractReportData(
  file: File,
  onProgress?: (message: string, percent?: number) => void,
): Promise<OCRClientResult> {
  onProgress?.("Loading OCR engine");

  const result = await Tesseract.recognize(file, "eng", {
    logger: (message) => {
      if (message.status) {
        const friendlyStatus = formatStatus(message.status);
        const percent =
          typeof message.progress === "number"
            ? Math.round(message.progress * 100)
            : undefined;
        onProgress?.(friendlyStatus, percent);
      }
    },
  });

  const rawText = result.data.text?.trim() ?? "";

  if (!rawText) {
    throw new OCRProcessingError(
      "No text detected in the uploaded image. Try a clearer photo or use manual entry.",
    );
  }

  const formattedText = formatOCRResult(rawText);
  const parseResult = parseStarbucksReport(rawText);

  if (!validateParseResult(parseResult)) {
    throw new OCRProcessingError(
      "Couldn't find partner hours in the scanned report. Please double-check the image or enter partners manually.",
      formattedText,
    );
  }

  const partnerHours: PartnerHours = parseResult.partners.map((partner) => ({
    name: partner.name,
    hours: partner.hours,
  }));

  return {
    extractedText: formattedText,
    partnerHours,
    confidence: parseResult.confidence,
    engine: "tesseract",
  };
}
