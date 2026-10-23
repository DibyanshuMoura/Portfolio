import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { BackToTop } from "@/components/back-to-top";
import { site } from "@/lib/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
      className={`${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("theme")==="light"){document.documentElement.dataset.theme="light";var m=document.querySelector(\'meta[name="theme-color"]\');if(m)m.setAttribute("content","#fafafa")}}catch(e){}',
          }}
        />
      </head>
      <body id="top" className="flex min-h-full flex-col">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
