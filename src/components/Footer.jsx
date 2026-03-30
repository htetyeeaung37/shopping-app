"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <ShoppingBag className="text-white" size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                VIBE<span className="text-violet-600">STORE</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Elevate your lifestyle with our curated collection of premium products. Quality meets style at VibeStore.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <Link key={i} href="#" className="w-9 h-9 rounded-lg border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-violet-600 hover:border-violet-200 transition-all">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Shop Categories</h4>
            <ul className="space-y-4">
              {["Electronics", "Fashion", "Home Decor", "Accessories"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
              <li><Link href="#" className="hover:text-violet-600">Track Order</Link></li>
              <li><Link href="#" className="hover:text-violet-600">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-violet-600">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-violet-600">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={18} className="text-violet-600 flex-shrink-0" />
                123 Vibe Street, Yangon, Myanmar
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Phone size={18} className="text-violet-600 flex-shrink-0" />
                +95 9 123 456 789
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Mail size={18} className="text-violet-600 flex-shrink-0" />
                hello@vibestore.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © 2026 VibeStore. All rights reserved. Built with ❤️ for developers.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 font-medium">
            <Link href="#" className="hover:text-slate-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}