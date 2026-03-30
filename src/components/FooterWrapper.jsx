"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer"; // Footer component ကို import လုပ်ပါ

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Login နဲ့ Register page တွေမှာ Footer မပေါ်စေချင်တဲ့ logic
  const hideFooter = ["/login", "/register"].includes(pathname);

  if (hideFooter) return null;

  return <Footer />;
}