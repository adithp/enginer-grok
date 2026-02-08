import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Engineer-Grok | AI Engineering Assistant",
  description: "Professional AI chat interface with engineering-focused responses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
