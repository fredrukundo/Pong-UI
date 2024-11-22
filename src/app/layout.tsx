import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Trans App",
  description: "42 Transcendence Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
