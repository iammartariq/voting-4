import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { adminCredentials } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("login"); // 'login' | 'otp'
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API latency
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (
        formData.email === adminCredentials.email &&
        formData.password === adminCredentials.password
      ) {
        // Success: Move to OTP step instead of direct login
        setIsLoading(false);
        setStep("otp");
        toast.info(`OTP sent to ${formData.email}`);
      } else {
        setIsLoading(false);
        toast.error("Invalid admin credentials");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleOtpVerify = async (otp) => {
    setIsLoading(true);
    // Simulate Backend Verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (otp === "123456") { // Mock OTP check
        sessionStorage.setItem("adminLoggedIn", "true");
        toast.success("Admin login successful!");
        navigate("/admin-dashboard");
    } else {
        toast.error("Invalid OTP code");
    }
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Resending OTP to", formData.email);
  };

  const handleChange = (e) => {
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
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              {step === "login" ? "Admin Login" : "Two-Factor Auth"}
            </CardTitle>
            <CardDescription>
              {step === "login" ? "Access the administrative dashboard" : "Verify your identity"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "login" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@voting.com"
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
                  {isLoading ? "Verifying..." : "Login as Admin"}
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
                 <Button variant="ghost" className="w-full" onClick={() => setStep("login")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                 </Button>
              </div>
            )}

            {step === "login" && (
              <>
                <div className="mt-6 text-center">
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                    ← Back to Home
                  </Link>
                </div>

                <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                  <p className="text-xs text-muted-foreground font-semibold mb-2">Demo Admin Credentials:</p>
                  <p className="text-xs text-muted-foreground">Email: admin@voting.com</p>
                  <p className="text-xs text-muted-foreground">Password: admin123</p>
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

export default AdminLogin;