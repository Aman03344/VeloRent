import React from "react";

const Footer = () => {
  return (
    <>
      {/* <!-- Footer --> */}
      <footer className="mt-20 bg-gray-50 px-6 py-10 relative bottom-[0%] ">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-2">VeloRent</h3>
            <p className="text-sm text-gray-600">
              The future of car rentals. Experience luxury and convenience.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Home</li>
              <li>Cars</li>
              <li>Deals</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Support</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-2">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="border rounded px-2 py-1 flex-1"
              />
              <button className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 text-center mt-10">
          © 2025 VeloRent. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
