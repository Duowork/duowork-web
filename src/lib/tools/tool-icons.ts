import {
  BellRinging,
  ChartPieSlice,
  ClipboardText,
  FileText,
  Hourglass,
  LinkSimple,
  Money,
  Percent,
  QrCode,
  Receipt,
  type Icon,
} from "@phosphor-icons/react";
import type { ToolSlug } from "../../data/tools";

export const TOOL_ICONS: Record<ToolSlug, Icon> = {
  "invoice-generator": FileText,
  "quotation-generator": ClipboardText,
  "receipt-generator": Receipt,
  "profit-margin-calculator": ChartPieSlice,
  "vat-calculator": Percent,
  "payslip-generator": Money,
  "freelance-rate-calculator": Hourglass,
  "qr-code-generator": QrCode,
  "utm-builder": LinkSimple,
  "payment-reminder-generator": BellRinging,
};
