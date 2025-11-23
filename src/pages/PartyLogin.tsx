import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import client from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";

// Define the shape of the error response
interface LoginErrorResponse {
  response?: {
    data?: {
      userId?: number;
      error?: string;
    };
  };
}

const PartyLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await client.post('/parties/account/signin', formData);
      // Backend returns: { message, PartyData, token }
      login(res.data.token, { ...res.data.PartyData, role: 'party' });
      toast.success("Welcome back!");
      navigate("/party-dashboard");
    } catch (err) {
      console.error(err);
      // Cast the error to our defined type instead of 'any'
      const error = err as LoginErrorResponse;
      
      // Backend returns userId if account exists but isn't verified
      if (error.response?.data?.userId) {
        toast.error("Account verification pending. Please check your email.");
      } else {
        toast.error(error.response?.data?.error || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Party Login</CardTitle>
            <CardDescription>Access your party management dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Party Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="party@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login as Party"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/party-register" className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PartyLogin;