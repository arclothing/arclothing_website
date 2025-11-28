import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Store, Menu, X } from "lucide-react";

const NavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors border ${
        isActive
          ? "border-[#D4AF37] text-[#D4AF37] bg-transparent"
          : "border-transparent text-[#dcdcdc] hover:text-[#D4AF37] hover:border-[#D4AF37]/60"
      }`}
    >
      {label}
    </Link>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/40 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/75">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/FINAL_LOGO.jpg" alt="AR FASHION logo" className="h-9 w-9 rounded-lg object-contain border border-[#D4AF37]/50 bg-black" />
          <span className="text-lg font-bold tracking-wide text-[#D4AF37]">AR FASHION</span>
        </Link>
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 flex-wrap justify-end">
          <NavLink to="/" label="Home" />
          <NavLink to="/catalog" label="Catalog" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-[#dcdcdc] hover:text-[#D4AF37] hover:bg-black/60 border border-transparent hover:border-[#D4AF37]/60"
          aria-label="Toggle navigation menu"
          onClick={toggle}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-[#D4AF37]/30 bg-black/95">
          <div className="container mx-auto px-4 py-3 grid gap-2">
            <Link to="/" onClick={close} className="px-3 py-2 rounded-md text-sm font-medium border border-transparent text-[#dcdcdc] hover:text-[#D4AF37] hover:border-[#D4AF37]/60">Home</Link>
            <Link to="/catalog" onClick={close} className="px-3 py-2 rounded-md text-sm font-medium border border-transparent text-[#dcdcdc] hover:text-[#D4AF37] hover:border-[#D4AF37]/60">Catalog</Link>
            <Link to="/about" onClick={close} className="px-3 py-2 rounded-md text-sm font-medium border border-transparent text-[#dcdcdc] hover:text-[#D4AF37] hover:border-[#D4AF37]/60">About</Link>
            <Link to="/contact" onClick={close} className="px-3 py-2 rounded-md text-sm font-medium border border-transparent text-[#dcdcdc] hover:text-[#D4AF37] hover:border-[#D4AF37]/60">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;


