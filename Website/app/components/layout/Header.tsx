
import React, { useState, useEffect } from 'react';
import { Menu } from "lucide-react";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          <span className="clip-text">Creado</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white/80 hover:text-gold transition">Home</Link>
          <Link to="/services" className="text-white/80 hover:text-gold transition">Services</Link>
          <Link to="/work" className="text-white/80 hover:text-gold transition">Work</Link>
          <Link to="/about" className="text-white/80 hover:text-gold transition">About</Link>
          <Link to="/blog" className="text-white/80 hover:text-gold transition">Blog</Link>
          <Link to="/contact" className="text-white/80 hover:text-gold transition">Contact</Link>
          <Link to="/login" className="button-gold">Login</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          <Menu />
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-dark-card p-5 shadow-lg md:hidden">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-white/80 hover:text-gold transition py-2">Home</Link>
              <Link to="/services" className="text-white/80 hover:text-gold transition py-2">Services</Link>
              <Link to="/work" className="text-white/80 hover:text-gold transition py-2">Work</Link>
              <Link to="/about" className="text-white/80 hover:text-gold transition py-2">About</Link>
              <Link to="/blog" className="text-white/80 hover:text-gold transition py-2">Blog</Link>
              <Link to="/contact" className="text-white/80 hover:text-gold transition py-2">Contact</Link>
              <Link to="/login" className="button-gold text-center mt-2">Login</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
