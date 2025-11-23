import { Link, useLocation } from "react-router-dom";
import { Vote, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-lg backdrop-saturate-150 border-b border-border/50 shadow-sm"
          : "bg-background/80 backdrop-blur-sm border-b border-border/30"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between">

          {/* Logo Section - Optimized for all screen sizes */}
          <div className="flex-shrink-0 z-10">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-xl text-primary hover:opacity-80 transition-all duration-200">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg flex items-center justify-center hover:bg-primary/15 transition-colors">
                <Vote className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className="tracking-tight hidden xs:inline">VoteOnline</span>
            </Link>
          </div>

          {/* Desktop Navigation Links - Center aligned with proper spacing */}
          <div className="hidden md:flex items-center justify-center flex-1 px-6 lg:px-8">
            <div className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-all duration-200 hover:text-primary relative py-2 ${
                    isActive(link.to) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-full animate-in slide-in-from-bottom-2 duration-300" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Action Buttons - Professional styling */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
            <Link to="/voter-login">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-primary hover:bg-primary/5 font-medium transition-all duration-200"
              >
                Voter Login
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button className="font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                Admin Portal
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Hamburger - Enhanced with animation */}
          <div className="flex md:hidden z-10">
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100'}`}>
                  <Menu className="h-6 w-6" />
                </span>
                <span className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 -rotate-90'}`}>
                  <X className="h-6 w-6" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Premium slide-down animation */}
      <div
        className={`md:hidden border-t border-border/50 bg-background/98 backdrop-blur-lg absolute w-full left-0 shadow-2xl transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'max-h-[80vh] opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-6 overflow-y-auto max-h-[calc(80vh-2rem)]">
          {/* Mobile Navigation Links */}
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-gradient-to-r from-primary/15 to-blue-600/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground active:scale-95"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Action Buttons */}
          <div className="pt-4 border-t border-border/50 space-y-3">
            <Link to="/voter-login" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button
                variant="outline"
                className="w-full justify-center h-12 text-base font-medium hover:bg-secondary/80 transition-all duration-200"
              >
                Voter Login
              </Button>
            </Link>
            <Link to="/admin-login" onClick={() => setMobileMenuOpen(false)} className="block">
              <Button
                className="w-full justify-center h-12 text-base font-medium bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
