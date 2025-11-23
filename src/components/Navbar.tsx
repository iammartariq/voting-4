import { Link, useLocation, useNavigate } from "react-router-dom";
import { Vote, Menu, X, LogOut, User, LayoutDashboard, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // State to track the currently logged-in user
  const [userSession, setUserSession] = useState<{ type: string; identifier: string; dashboard: string } | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Session Check
  useEffect(() => {
    const checkSession = () => {
      const admin = sessionStorage.getItem("adminLoggedIn");
      const party = sessionStorage.getItem("partyLoggedIn");
      const voter = sessionStorage.getItem("voterNid");

      if (admin) {
        setUserSession({ 
          type: "Administrator", 
          identifier: "Super Admin", 
          dashboard: "/admin-dashboard" 
        });
      } else if (party) {
        setUserSession({
            type: "Party Rep",
            identifier: sessionStorage.getItem("partyEmail") || "Party Account",
            dashboard: "/party-dashboard"
        });
      } else if (voter) {
        setUserSession({
            type: "Voter",
            identifier: sessionStorage.getItem("voterNid") || "Voter",
            dashboard: "/voter-dashboard"
        });
      } else {
        setUserSession(null);
      }
    };

    checkSession();
  }, [location]); // Re-run check on route change

  const handleLogout = () => {
    sessionStorage.clear();
    setUserSession(null);
    setMobileMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

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

          {/* Logo Section */}
          <div className="flex-shrink-0 z-10">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 font-bold text-lg sm:text-xl text-primary hover:opacity-80 transition-all duration-200">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-lg flex items-center justify-center hover:bg-primary/15 transition-colors">
                <Vote className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <span className="tracking-tight hidden xs:inline">VoteOnline</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
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

          {/* Desktop Action Buttons / User Profile */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 flex-shrink-0">
            {userSession ? (
              // --- LOGGED IN VIEW ---
              <div className="flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                <Link to={userSession.dashboard}>
                  <Button variant="ghost" className="flex items-center gap-2 text-primary hover:bg-primary/10">
                     <LayoutDashboard className="h-4 w-4" />
                     Dashboard
                  </Button>
                </Link>
                
                <div className="flex flex-col items-end border-r border-border pr-4 mr-1">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1">
                    <User className="h-3 w-3" /> {userSession.type}
                  </span>
                  <span className="text-[10px] text-muted-foreground max-w-[100px] truncate">
                    {userSession.identifier}
                  </span>
                </div>

                <Button 
                  onClick={handleLogout} 
                  variant="ghost" 
                  size="icon"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              // --- LOGGED OUT VIEW ---
              <>
                <Link to="/party-login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/5 font-medium transition-all duration-200 text-xs lg:text-sm">
                    Party Portal
                  </Button>
                </Link>
                <Link to="/voter-login">
                  <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/5 font-medium transition-all duration-200">
                    Voter Login
                  </Button>
                </Link>
                <Link to="/admin-login">
                  <Button className="font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                    Admin Portal
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden z-10">
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
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

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden border-t border-border/50 bg-background/98 backdrop-blur-lg absolute w-full left-0 shadow-2xl transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'max-h-[85vh] opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-6 space-y-6 overflow-y-auto max-h-[calc(85vh-2rem)]">
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
            {userSession ? (
               // --- MOBILE LOGGED IN ---
               <div className="space-y-3">
                 <div className="px-4 py-2 bg-secondary/30 rounded-lg flex items-center justify-between">
                    <div>
                        <p className="text-sm font-bold text-primary">{userSession.type}</p>
                        <p className="text-xs text-muted-foreground">{userSession.identifier}</p>
                    </div>
                    <Link to={userSession.dashboard} onClick={() => setMobileMenuOpen(false)}>
                        <Button size="sm" variant="outline" className="h-8">Dashboard</Button>
                    </Link>
                 </div>
                 <Button 
                    onClick={handleLogout}
                    className="w-full justify-center h-12 text-base font-medium bg-destructive/10 text-destructive hover:bg-destructive/20"
                 >
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                 </Button>
               </div>
            ) : (
                // --- MOBILE LOGGED OUT ---
                <>
                    <Link to="/voter-login" onClick={() => setMobileMenuOpen(false)} className="block">
                    <Button variant="outline" className="w-full justify-center h-12 text-base font-medium hover:bg-secondary/80">
                        Voter Login
                    </Button>
                    </Link>
                    <div className="grid grid-cols-2 gap-3">
                        <Link to="/party-login" onClick={() => setMobileMenuOpen(false)} className="block">
                            <Button variant="secondary" className="w-full justify-center h-12">
                                <Building2 className="mr-2 h-4 w-4" /> Party
                            </Button>
                        </Link>
                        <Link to="/admin-login" onClick={() => setMobileMenuOpen(false)} className="block">
                            <Button className="w-full justify-center h-12 bg-gradient-to-r from-primary to-blue-600">
                                <ShieldCheck className="mr-2 h-4 w-4" /> Admin
                            </Button>
                        </Link>
                    </div>
                </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;