import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import LearnMore from "./pages/learn-more/LearnMore";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
// import CustomCursor from './components/CustomCursor'
import "./App.css";

/* --------------------------------------------------------------- */

function App() {
  return (
    <>
      <main id="duowork" className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/our-work" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* <CustomCursor /> */}
    </>
  );
}

export default App;
