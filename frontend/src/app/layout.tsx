import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Providers from "@/components/layout/Providers";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import SkipLink from "@/components/layout/SkipLink";
import ErrorBoundary from "@/components/layout/ErrorBoundary";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 AI Command Center",
  description:
    "Build a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, or venue staff. The solution must leverage Generative AI to improve navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance, operational intelligence, or real-time decision support during the FIFA World Cup 2026.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <ThemeProvider>
          <Providers>
            <SkipLink />
            <div className="flex min-h-screen">
              <Sidebar />
              <main id="main-content" className="flex-1 min-w-0">
                <ErrorBoundary>{children}</ErrorBoundary>
              </main>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
