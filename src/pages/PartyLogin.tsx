import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification";

const PartyLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"login" | "otp">("login");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/party/login', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock success - replace with actual validation
        setIsLoading(false);
        setStep("otp");
        toast.info(`OTP sent to ${formData.email}`);
      } catch (error) {
        setIsLoading(false);
        toast.error("Login failed. Please check your credentials.");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleOtpVerify = async (otp: string) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/party/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formData.email, otp })
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otp === "123456") {
        sessionStorage.setItem("partyLoggedIn", "true");
        sessionStorage.setItem("partyEmail", formData.email);
        sessionStorage.setItem("partyId", "party_demo_001");
        toast.success("Party login successful!");
        navigate("/party-dashboard");
      } else {
        toast.error("Invalid OTP code");
      }
    } catch (error) {
      toast.error("Verification failed");
    }
    
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("OTP resent successfully");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
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
            <CardTitle className="text-2xl">
              {step === "login" ? "Party Login" : "Two-Factor Authentication"}
            </CardTitle>
            <CardDescription>
              {step === "login" ? "Access your party management dashboard" : "Verify your identity"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "login" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Party Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="party@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Login as Party"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <OtpVerification 
                  email={formData.email}
                  onVerify={handleOtpVerify}
                  onResend={handleResendOtp}
                  isLoading={isLoading}
                />
                <Button 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => setStep("login")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Button>
              </div>
            )}

            {step === "login" && (
              <>
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/party-register" className="text-primary hover:underline font-medium">
                      Register here
                    </Link>
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                    ← Back to Home
                  </Link>
                </div>

                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <p className="text-xs text-muted-foreground font-semibold mb-2">Demo Party Credentials:</p>
                  <p className="text-xs text-muted-foreground">Email: party@example.com</p>
                  <p className="text-xs text-muted-foreground">Password: party123456</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default PartyLogin;