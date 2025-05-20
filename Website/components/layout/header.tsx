"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Case Studies", href: "/project" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

// Add authenticated nav items
const authNavItems = [
  { name: "Dashboard", href: "/dashboard" },
  // Add more authenticated routes as needed
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-gray-900/95 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            goCredo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-purple-400",
                pathname === item.href ? "text-purple-400" : "text-gray-200",
              )}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Show authenticated nav items when signed in */}
          {isLoaded && isSignedIn && authNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-purple-400",
                pathname === item.href ? "text-purple-400" : "text-gray-200",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isLoaded && isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10",
                },
              }}
              afterSignOutUrl="/"
            />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-500/20">
                  Sign In
                </Button>
              </SignInButton>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-200 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium py-2 transition-colors hover:text-purple-400",
                    pathname === item.href ? "text-purple-400" : "text-gray-200",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Show authenticated nav items when signed in */}
              {isLoaded && isSignedIn && authNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium py-2 transition-colors hover:text-purple-400",
                    pathname === item.href ? "text-purple-400" : "text-gray-200",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
                {isLoaded && isSignedIn ? (
                  <div className="flex items-center">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-10 h-10",
                        },
                      }}
                      afterSignOutUrl="/"
                    />
                    <span className="ml-2 text-gray-200">Account</span>
                  </div>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-500/20 w-full">
                        Sign In
                      </Button>
                    </SignInButton>
                    <Link href="/signup" className="w-full">
                      <Button className="bg-gradient-to-r from-purple-500 to-pink-500
                        hover:from-purple-600 hover:to-pink-600 text-white w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}