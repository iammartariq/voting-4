import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification";

const VoterRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("register"); // 'register' | 'otp'
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nid: "",
    dateOfBirth: "",
    address: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
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
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate Backend API call for Registration + Sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsLoading(false);
      setStep("otp");
      toast.success("Registration initiated. Please verify OTP sent to your email.");
    } else {
      setErrors(newErrors);
    }
  };

  const handleOtpVerify = async (otp) => {
    setIsLoading(true);
    // Simulate Backend API call for OTP Verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otp === "123456") {
        toast.success("Registration successful! You can now login.");
        navigate("/voter-login");
    } else {
        toast.error("Invalid Code");
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
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              {step === "register" ? "Voter Registration" : "Verify Email"}
            </CardTitle>
            <CardDescription>
              {step === "register" ? "Create your account to participate" : "Enter the code sent to your email"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "register" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

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
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nid">National ID Number</Label>
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
                  {errors.nid && <p className="text-sm text-destructive">{errors.nid}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={errors.dateOfBirth ? "border-destructive" : ""}
                  />
                  {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Your address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Register"}
                </Button>
              </form>
            ) : (
               <OtpVerification 
                  email={formData.email}
                  onVerify={handleOtpVerify}
                  onResend={async () => { toast.success("Code resent") }}
                  isLoading={isLoading}
               />
            )}

            <div className="mt-6 text-center">
              {step === "register" && (
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/voter-login" className="text-primary hover:underline font-medium">
                    Login here
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default VoterRegister;