import { Link } from "react-router-dom";
import {
  Headphones,
  MoveUpRight,
  Briefcase,
  X,
  ShieldQuestionMark,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full top-0 flex items-center justify-between p-2 z-40 fixed pb-5 transition-colors duration-300 ${
        isScrolled ? "bg-duo-dark border-b border-white/8" : ""
      }`}
    >
      <div className="size-14 relative">
        <img src="/logo.png" alt="" className="size-full" />
        <Link to="/" className="absolute top-0 left-0 size-full"></Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-3 sm:gap-4 text-white z-20">
        <Link
          to="/what-we-do"
          className="flex items-center gap-1 hover:text-duo-green-200 transition-colors"
        >
          What we do
          <MoveUpRight className="w-5 h-5" />
        </Link>

        <Link
          to="/our-work"
          className="flex items-center gap-1 hover:text-duo-green-200 transition-colors"
        >
          Our work
          <Briefcase className="w-5 h-5" />
        </Link>

        <Link
          to="/contact"
          className="flex items-center gap-1 hover:text-duo-green-200 transition-colors"
        >
          Contact us
          <Headphones className="w-5 h-5" />
        </Link>
        <Link
          to="/contact"
          className="flex items-center gap-1 hover:text-duo-green-200 transition-colors"
        >
          About us
          <ShieldQuestionMark className="w-5 h-5" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex flex-col gap-1.5 z-50 p-2 cursor-pointer hover:scale-105"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-white" strokeWidth={2} />
        ) : (
          <>
            <span className="w-6 h-0.5 bg-white rounded-full transition-all"></span>
            <span className="w-6 h-0.5 bg-white rounded-full transition-all"></span>
          </>
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-duo-dark/95 backdrop-blur-lg z-40 transition-all duration-300 flex items-center justify-center ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col justify-center h-full gap-8 text-white overflow-hidden!">
          <Link
            to="/what-we-do"
            className="flex items-center gap-2 text-2xl font-medium hover:text-duo-green-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            What we do
            <MoveUpRight className="w-6 h-6" />
          </Link>

          <Link
            to="/our-work"
            className="flex items-center gap-2 text-2xl font-medium hover:text-duo-green-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Our work
            <Briefcase className="w-6 h-6" />
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-2 text-2xl font-medium hover:text-duo-green-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact us
            <Headphones className="w-6 h-6" />
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-2 text-2xl font-medium hover:text-duo-green-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact us
            <Headphones className="w-6 h-6" />
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-2 text-2xl font-medium hover:text-duo-green-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About us
            <ShieldQuestionMark className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
