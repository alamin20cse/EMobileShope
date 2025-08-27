import React from 'react';
import { Smartphone, ShoppingBag, Facebook, Twitter, Instagram, Phone, Mail } from "lucide-react";

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content mt-5 p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
   

       {/* Contact */}
        <div>
          <h6 className="footer-title text-lg mb-3">Get in Touch</h6>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> +880 1234 567 890
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Mail className="w-4 h-4" /> support@emobileshop.com
          </p>

        </div>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a className="hover:text-primary"><Facebook /></a>
            <a className="hover:text-primary"><Twitter /></a>
            <a className="hover:text-primary"><Instagram /></a>
          </div>
  </nav>
  
</footer>
  {/* Bottom Section */}
      <div className="border-t border-gray-700 py-4 bg-black text-neutral-content text-center text-sm">
        © {new Date().getFullYear()} E-Mobile Shop. All Rights Reserved.
      </div>
        </div>
    );
};

export default Footer;

