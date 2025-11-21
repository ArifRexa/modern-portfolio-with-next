import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { ThemeProvider } from '@/context/ThemeContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ariful Islam - Software Engineer",
  description: "Personal portfolio of Ariful Islam, Software Engineer and Cloud Solutions Architect",
  icons: {
    icon: [
      { url: '/images/profile-logo.png', sizes: 'any', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/profile-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/profile-logo.png" type="image/png" />
      </head>
      <body>
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
