import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivansh Sharma — Software Developer",
  description:
    "Full-stack developer building Flutter apps, automating workflows, and pushing into ML & fintech.",
  keywords: [
    "Shivansh Sharma",
    "Software Developer",
    "Flutter",
    "Full-Stack",
    "Portfolio",
  ],
  openGraph: {
    title: "Shivansh Sharma — Software Developer",
    description:
      "Full-stack developer building Flutter apps, automating workflows, and pushing into ML & fintech.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
