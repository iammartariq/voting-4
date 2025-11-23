import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-primary">VoteSphere</Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden md:inline">
                {user?.name} ({user?.role})
              </span>
              <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/voter-login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link to="/voter-register"><Button size="sm">Register</Button></Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;