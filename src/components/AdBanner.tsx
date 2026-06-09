"use client";
import { useEffect } from "react";

declare global {
  interface Window { adsbygoogle?: unknown[]; }
}

export default function AdBanner({ slot, format = "auto", responsive = true }: {
  slot: string;
  format?: string;
  responsive?: boolean;
}) {
  useEffect(() => {
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }, []);

  return (
    <div className="my-4 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Replace with your AdSense ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
