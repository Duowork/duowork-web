import DocumentEditor from "../../components/tools/DocumentEditor";
import ToolPage from "../../components/tools/ToolPage";

export default function InvoiceGenerator() {
  return (
    <ToolPage slug="invoice-generator">
      <DocumentEditor kind="invoice" />
    </ToolPage>
  );
}
