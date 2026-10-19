import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { BackToTop } from "@/components/back-to-top";
import { site } from "@/lib/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const iosevkaNerd = localFont({
  src: [
    {
      path: "./fonts/iosevka-nerd-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iosevka-nerd",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: site.handle,
    template: `%s — ${site.handle}`,
  },
  description:
    "Dibyanshu Moura is a student and developer building full-stack web applications with JavaScript, Node.js, REST APIs, and AI-assisted features.",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jetbrainsMono.variable} ${iosevkaNerd.variable} h-full`}
    >
      <body id="top" className="flex min-h-full flex-col">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
