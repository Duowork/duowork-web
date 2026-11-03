import ReceiptEditor from "../../components/tools/ReceiptEditor";
import ToolPage from "../../components/tools/ToolPage";

export default function ReceiptGenerator() {
  return (
    <ToolPage slug="receipt-generator">
      <ReceiptEditor />
    </ToolPage>
  );
}
