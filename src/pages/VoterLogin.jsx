import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Vote, ArrowLeft } from "lucide-react"; 
import { toast } from "sonner";
import { voterCredentials } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification"; 

const VoterLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("login"); 
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    nid: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.nid.trim()) {
      newErrors.nid = "National ID is required";
    } else if (formData.nid.length !== 10) {
      newErrors.nid = "National ID must be 10 digits";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const voter = voterCredentials.find(
        v => v.email === formData.email && v.nid === formData.nid
      );
      
      setIsLoading(false);

      if (voter) {
        setStep("otp");
        toast.info(`OTP code sent to ${formData.email}`);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleOtpVerify = async (otp) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otp === "123456") { 
        sessionStorage.setItem("voterNid", formData.nid);
        sessionStorage.setItem("voterEmail", formData.email);
        toast.success("Login successful!");
        navigate("/voter-dashboard");
    } else {
        toast.error("Invalid OTP code");
    }
    setIsLoading(false);
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
                <Vote className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">
                {step === "login" ? "Voter Login" : "Verify Identity"}
            </CardTitle>
            <CardDescription>
                {step === "login" 
                    ? "Enter your credentials to access your voting dashboard" 
                    : "Enter the security code sent to your email"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "login" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  {/* --- MOVED FORGOT PASSWORD HERE (Next to Label) --- */}
                  <div className="flex justify-between items-center">
                    <Label htmlFor="nid">National ID Number</Label>
                    <Link 
                        to="/forgot-password" 
                        className="text-xs text-muted-foreground hover:text-primary"
                    >
                        Forgot Password?
                    </Link>
                  </div>
                  
                  <Input
                    id="nid"
                    name="nid"
                    type="text"
                    placeholder="Enter 10-digit NID"
                    maxLength="10"
                    value={formData.nid}
                    onChange={handleChange}
                    className={errors.nid ? "border-destructive" : ""}
                  />
                  {errors.nid && (
                    <p className="text-sm text-destructive">{errors.nid}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Login"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                 <OtpVerification 
                    email={formData.email}
                    onVerify={handleOtpVerify}
                    onResend={async () => { toast.success("Code Resent"); }}
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
                        <Link to="/voter-register" className="text-primary hover:underline font-medium">
                        Register here
                        </Link>
                    </p>
                    </div>

                    <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                    <p className="text-xs text-muted-foreground font-semibold mb-2">Demo Credentials:</p>
                    <p className="text-xs text-muted-foreground">Email: alice@example.com</p>
                    <p className="text-xs text-muted-foreground">NID: 1234567890</p>
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

export default VoterLogin;