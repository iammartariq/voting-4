import { Vote, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary/20 to-secondary/40 border-t border-border/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">

          {/* Brand Section - Responsive spacing and sizing */}
          <div className="space-y-4 sm:space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary/10 p-2 rounded-lg hover:bg-primary/15 transition-colors">
                <Vote className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className="font-bold text-lg sm:text-xl tracking-tight">VoteOnline</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm">
              Empowering democracy through secure, transparent, and accessible digital voting solutions.
            </p>

            {/* Social Icons - Enhanced hover effects */}
            <div className="flex gap-3 pt-2">
              <button
                aria-label="Twitter"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background border border-border/50 flex items-center justify-center hover:border-primary hover:bg-primary/5 hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                aria-label="Facebook"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background border border-border/50 flex items-center justify-center hover:border-primary hover:bg-primary/5 hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <Facebook className="h-4 w-4" />
              </button>
              <button
                aria-label="LinkedIn"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background border border-border/50 flex items-center justify-center hover:border-primary hover:bg-primary/5 hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <Linkedin className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Links - Optimized for mobile stacking */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="font-semibold text-base sm:text-lg text-foreground">Platform</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block group"
                >
                  <span className="group-hover:underline underline-offset-4">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block group"
                >
                  <span className="group-hover:underline underline-offset-4">About Us</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/voter-login"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block group"
                >
                  <span className="group-hover:underline underline-offset-4">Voter Portal</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-login"
                  className="text-sm sm:text-base text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block group"
                >
                  <span className="group-hover:underline underline-offset-4">Administration</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Enhanced mobile responsiveness */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="font-semibold text-base sm:text-lg text-foreground">Contact Support</h3>
            <ul className="space-y-3.5 sm:space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground group">
                <Mail className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                <a href="mailto:support@voteonline.com" className="hover:text-primary transition-colors">
                  support@voteonline.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground group">
                <Phone className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                <a href="tel:+18008683669" className="hover:text-primary transition-colors">
                  +1 (800) VOTE-NOW
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground group">
                <MapPin className="h-5 w-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                <address className="not-italic">
                  101 Constitution Ave,<br />
                  Democracy City, DC 20001
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Fully responsive */}
        <div className="border-t border-border/50 mt-10 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} VoteOnline Systems. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <Link to="#" className="hover:text-primary hover:underline underline-offset-4 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary hover:underline underline-offset-4 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-primary hover:underline underline-offset-4 transition-colors duration-200">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;