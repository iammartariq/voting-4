import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification";

// Mock Location Data
const locationData = {
  "Province A": {
    "City A1": ["Area 1", "Area 2"],
    "City A2": ["Area 3", "Area 4"]
  },
  "Province B": {
    "City B1": ["Area 5", "Area 6"],
    "City B2": ["Area 7", "Area 8"]
  }
};

const VoterRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("register");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    nid: "",
    dateOfBirth: "",
    province: "",
    city: "",
    area: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.nid.trim() || formData.nid.length !== 10) newErrors.nid = "Valid 10-digit NID is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.province) newErrors.province = "Province is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.area) newErrors.area = "Area is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      // Save temp location data for the session to use in Dashboard later
      sessionStorage.setItem("tempVoterLocation", JSON.stringify({
        province: formData.province,
        city: formData.city,
        area: formData.area
      }));

      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setStep("otp");
      toast.success("OTP sent to your email.");
    } else {
      setErrors(newErrors);
    }
  };

  const handleOtpVerify = async (otp) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (otp === "123456") {
        toast.success("Registration successful!");
        navigate("/voter-login");
    } else {
        toast.error("Invalid Code");
    }
    setIsLoading(false);
  };

  const handleChange = (name, value) => {
    setFormData(prev => {
        const updated = { ...prev, [name]: value };
        // Reset child fields if parent changes
        if (name === 'province') { updated.city = ""; updated.area = ""; }
        if (name === 'city') { updated.area = ""; }
        return updated;
    });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const getCities = () => formData.province ? Object.keys(locationData[formData.province]) : [];
  const getAreas = () => (formData.province && formData.city) ? locationData[formData.province][formData.city] : [];

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
            <CardTitle className="text-2xl">{step === "register" ? "Voter Registration" : "Verify Email"}</CardTitle>
          </CardHeader>
          <CardContent>
            {step === "register" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="John Doe" />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="email@example.com" />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label>National ID</Label>
                  <Input value={formData.nid} onChange={(e) => handleChange("nid", e.target.value)} maxLength="10" placeholder="10-digit NID" />
                  {errors.nid && <p className="text-sm text-destructive">{errors.nid}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" value={formData.dateOfBirth} onChange={(e) => handleChange("dateOfBirth", e.target.value)} />
                </div>

                {/* Requirement 6: Location Selection */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2 col-span-2">
                        <Label>Province</Label>
                        <Select value={formData.province} onValueChange={(val) => handleChange("province", val)}>
                            <SelectTrigger><SelectValue placeholder="Select Province" /></SelectTrigger>
                            <SelectContent>
                                {Object.keys(locationData).map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {errors.province && <p className="text-sm text-destructive">{errors.province}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>City</Label>
                        <Select value={formData.city} onValueChange={(val) => handleChange("city", val)} disabled={!formData.province}>
                            <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
                            <SelectContent>
                                {getCities().map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Area</Label>
                        <Select value={formData.area} onValueChange={(val) => handleChange("area", val)} disabled={!formData.city}>
                            <SelectTrigger><SelectValue placeholder="Select Area" /></SelectTrigger>
                            <SelectContent>
                                {getAreas().map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        {errors.area && <p className="text-sm text-destructive">{errors.area}</p>}
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Processing..." : "Register"}</Button>
              </form>
            ) : (
               <OtpVerification email={formData.email} onVerify={handleOtpVerify} onResend={async () => toast.success("Code resent")} isLoading={isLoading} />
            )}
            
            <div className="mt-6 text-center">
               {step === "register" && <p className="text-sm text-muted-foreground">Already have an account? <Link to="/voter-login" className="text-primary hover:underline">Login</Link></p>}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default VoterRegister;