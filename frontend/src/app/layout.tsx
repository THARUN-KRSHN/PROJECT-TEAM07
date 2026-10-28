import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import { IntroScreen } from "@/components/ui/IntroScreen";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "GiriRaksha — Landslide Risk Awareness for Kerala",
  description:
    "Know your area's landslide risk. Simple, trustworthy public landslide risk awareness and safety guidelines for the communities of Kerala.",
  keywords: [
    "Kerala landslides",
    "Landslide Risk Awareness",
    "Wayanad",
    "Idukki",
    "Western Ghats",
    "Disaster Safety",
    "KSDMA",
  ],
  authors: [{ name: "GiriRaksha Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var filterPatterns = [
                  'BillingNotEnabledMapError',
                  'billing-not-enabled-map-error',
                  'maps.googleapis.com',
                  'Google Maps JavaScript API',
                  'google.maps'
                ];
                var origErr = console.error;
                var origWarn = console.warn;
                console.error = function() {
                  var str = (arguments[0] && arguments[0].toString()) || '';
                  for (var i = 0; i < filterPatterns.length; i++) {
                    if (str.indexOf(filterPatterns[i]) !== -1) return;
                  }
                  origErr.apply(console, arguments);
                };
                console.warn = function() {
                  var str = (arguments[0] && arguments[0].toString()) || '';
                  for (var i = 0; i < filterPatterns.length; i++) {
                    if (str.indexOf(filterPatterns[i]) !== -1) return;
                  }
                  origWarn.apply(console, arguments);
                };
                window.gm_authFailure = function() {};
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white text-[#202923] min-h-screen selection:bg-[#247343] selection:text-white antialiased font-sans">
        <AuthProvider>
          <IntroScreen />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
