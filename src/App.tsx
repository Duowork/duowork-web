import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import Spinner from "./components/Spinner";

// Loaded on demand, so visitors to the rest of the site don't carry their weight.
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const ToolsHome = lazy(() => import("./pages/tools/ToolsHome"));
const InvoiceGenerator = lazy(() => import("./pages/tools/InvoiceGenerator"));
const QuotationGenerator = lazy(() => import("./pages/tools/QuotationGenerator"));
const ReceiptGenerator = lazy(() => import("./pages/tools/ReceiptGenerator"));
const ProfitMarginCalculator = lazy(() => import("./pages/tools/ProfitMarginCalculator"));
const VatCalculator = lazy(() => import("./pages/tools/VatCalculator"));
const QrCodeGenerator = lazy(() => import("./pages/tools/QrCodeGenerator"));

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Loading">
      <Spinner isLoading arcColor="#222222" circleColor="#222222" />
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollManager />
      <TopNav />

      <main id="duowork">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="/tools" element={<ToolsHome />} />
            <Route path="/tools/invoice-generator" element={<InvoiceGenerator />} />
            <Route path="/tools/quotation-generator" element={<QuotationGenerator />} />
            <Route path="/tools/receipt-generator" element={<ReceiptGenerator />} />
            <Route path="/tools/profit-margin-calculator" element={<ProfitMarginCalculator />} />
            <Route path="/tools/vat-calculator" element={<VatCalculator />} />
            <Route path="/tools/qr-code-generator" element={<QrCodeGenerator />} />

            {/* 1.0 paths. Kept so existing links and indexed URLs still land. */}
            <Route
              path="/what-we-do"
              element={<Navigate to={{ pathname: "/", hash: "#services" }} replace />}
            />
            <Route path="/our-work" element={<Navigate to="/work" replace />} />
            <Route
              path="/contact"
              element={<Navigate to={{ pathname: "/", hash: "#contact" }} replace />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;
