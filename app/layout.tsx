import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import React from "react";
import ToastProvider from "@/lib/toast-provider";
import ClientOnly from "@/components/ClientOnly";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ClientOnly>
            <ToastProvider />
          </ClientOnly>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
