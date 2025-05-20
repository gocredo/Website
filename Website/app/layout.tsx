import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/layout/theme-provider"
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  )
}

export const metadata = {
  title: {
    default: "goCredo - Digital Marketing Agency",
    template: "%s | goCredo",
  },
  description: "Boost your business with goCredo's SEO, PPC, and social media services.",
    generator: 'v0.dev'
}
