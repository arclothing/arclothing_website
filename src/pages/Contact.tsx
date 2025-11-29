import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-[#dcdcdc] flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-10 max-w-2xl flex-1">
        <h1 className="text-3xl font-bold mb-2 text-[#D4AF37]">Contact Us</h1>
        <p className="text-[#bfbfbf] mb-8">Reach us instantly via WhatsApp or call. We respond quickly.</p>

        <div className="grid gap-4">
          <a
            href="https://wa.me/+919900724060"
            target="_blank"
            rel="noreferrer"
            className="block"
          >
            <Button className="w-full bg-[#25D366] text-black hover:bg-[#1fb358]">Chat on WhatsApp</Button>
          </a>

          <a href="tel:+919900724060" className="block">
            <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#b08d2f]">Call +91 99007 24060</Button>
          </a>

          <div className="text-sm text-[#9a9a9a] mt-6">
            <p>Official email: arclothingsnew@gmail.com</p>
            <p>Brand: AR FASHIONS</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;



