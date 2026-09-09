import { Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ScrollManager />
      <TopNav />

      <main id="duowork">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />

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
      </main>

      <Footer />
    </>
  );
}

export default App;
