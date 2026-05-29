import { Link } from "react-router-dom";
import { Headphones, MoveUpRight, Briefcase } from "lucide-react";

export default function TopNav() {
  return (
    <nav className="relative flex items-center justify-between p-2 z-40">
      <div className="size-14 relative">
        <img src="/logo.png" alt="" className="size-full" />
        <Link to="/" className="absolute top-0 left-0 size-full"></Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 text-white z-20">
        <Link to="/contact" className="flex items-center gap-1">
          Contact
          <Headphones />
        </Link>

        <Link to="/work" className="flex items-center gap-1">
          Work
          <Briefcase />
        </Link>

        <Link to="/learn-more" className="flex items-center gap-1">
          Learn more
          <MoveUpRight />
        </Link>
      </div>
    </nav>
  );
}
