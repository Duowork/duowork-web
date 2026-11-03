import DocumentEditor from "../../components/tools/DocumentEditor";
import ToolPage from "../../components/tools/ToolPage";
import { QUOTE_VS_INVOICE } from "../../data/tool-notes";

export default function QuotationGenerator() {
  return (
    <ToolPage
      slug="quotation-generator"
      aside={
        <p className="m-0 max-w-[68ch] rounded-2xl bg-volt-tint px-5 py-4 text-[15px] text-ink-80">
          <strong className="font-title font-semibold">{QUOTE_VS_INVOICE.lead}</strong>{" "}
          {QUOTE_VS_INVOICE.body}
        </p>
      }
    >
      <DocumentEditor kind="quotation" />
    </ToolPage>
  );
}
