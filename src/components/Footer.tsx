const Footer = () => {
  return (
    <footer className="border-t border-[#D4AF37]/30 bg-black text-[#dcdcdc]">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-center md:text-left">
        <div>
          <h3 className="font-semibold text-[#D4AF37]">AR FASHIONS</h3>
          <p className="mt-2 text-[#bfbfbf]">AR FASHIONS - Premium B2B Fashion Supplier</p>
        </div>
        <div>
          <h4 className="font-medium text-[#D4AF37]">Contact</h4>
          <p className="mt-2 text-[#bfbfbf]">Email: arclothingsnew@gmail.com</p>
        </div>
        <div>
          <h4 className="font-medium text-[#D4AF37]">Links</h4>
          <div className="mt-2 flex gap-4 justify-center md:justify-start">
            <a href="/" className="text-[#bfbfbf] hover:text-[#D4AF37]">Home</a>
            <a href="/catalog" className="text-[#bfbfbf] hover:text-[#D4AF37]">Catalog</a>
            <a href="/about" className="text-[#bfbfbf] hover:text-[#D4AF37]">About</a>
            <a href="/contact" className="text-[#bfbfbf] hover:text-[#D4AF37]">Contact</a>
          </div>
        </div>
      </div>
      <div className="text-xs text-center text-[#9a9a9a] py-4">© {new Date().getFullYear()} AR FASHIONS. All rights reserved.</div>
    </footer>
  );
};

export default Footer;


