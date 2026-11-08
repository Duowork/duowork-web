import QrEditor from "../../components/tools/QrEditor";
import ToolPage from "../../components/tools/ToolPage";

export default function QrCodeGenerator() {
  return (
    <ToolPage slug="qr-code-generator">
      <QrEditor />
    </ToolPage>
  );
}
