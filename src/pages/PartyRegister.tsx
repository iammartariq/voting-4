import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Upload, X } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification";

const PartyRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"register" | "otp">("register");
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    partyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    registrationNumber: "",
    foundedYear: "",
    description: "",
    website: "",
    phoneNumber: "",
    address: "",
    logo: null as File | null
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.partyName.trim()) newErrors.partyName = "Party name is required";
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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration number is required";
    }
    if (!formData.foundedYear.trim()) {
      newErrors.foundedYear = "Founded year is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.logo) {
      newErrors.logo = "Party logo is required";
    }
    
    return newErrors;
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      
      setFormData(prev => ({ ...prev, logo: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      if (errors.logo) {
        setErrors(prev => ({ ...prev, logo: "" }));
      }
    }
  };

  const handleRemoveLogo = () => {
    setFormData(prev => ({ ...prev, logo: null }));
    setLogoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      
      try {
        // TODO: Replace with actual API call
        // const formDataToSend = new FormData();
        // Object.entries(formData).forEach(([key, value]) => {
        //   if (value !== null) formDataToSend.append(key, value);
        // });
        // const response = await fetch('/api/party/register', {
        //   method: 'POST',
        //   body: formDataToSend
        // });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
        setStep("otp");
        toast.success("Registration initiated. Please verify OTP sent to your email.");
      } catch (error) {
        setIsLoading(false);
        toast.error("Registration failed. Please try again.");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleOtpVerify = async (otp: string) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otp === "123456") {
        toast.success("Registration successful! You can now login.");
        navigate("/party-login");
      } else {
        toast.error("Invalid OTP code");
      }
    } catch (error) {
      toast.error("Verification failed");
    }
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <Card className="w-full max-w-2xl shadow-card">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              {step === "register" ? "Party Registration" : "Verify Email"}
            </CardTitle>
            <CardDescription>
              {step === "register" ? "Register your political party" : "Enter the code sent to your email"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "register" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Party Logo Upload */}
                <div className="space-y-2">
                  <Label>Party Logo *</Label>
                  <div className="flex items-center gap-4">
                    {logoPreview ? (
                      <div className="relative">
                        <img 
                          src={logoPreview} 
                          alt="Logo preview" 
                          className="w-24 h-24 object-cover rounded-lg border-2 border-border"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveLogo}
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                      </label>
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">
                        Upload your party logo (Max 5MB, PNG/JPG)
                      </p>
                    </div>
                  </div>
                  {errors.logo && <p className="text-sm text-destructive">{errors.logo}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="partyName">Party Name *</Label>
                    <Input
                      id="partyName"
                      name="partyName"
                      placeholder="Democratic Party"
                      value={formData.partyName}
                      onChange={handleChange}
                      className={errors.partyName ? "border-destructive" : ""}
                    />
                    {errors.partyName && <p className="text-sm text-destructive">{errors.partyName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number *</Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      placeholder="REG-12345"
                      value={formData.registrationNumber}
                      onChange={handleChange}
                      className={errors.registrationNumber ? "border-destructive" : ""}
                    />
                    {errors.registrationNumber && <p className="text-sm text-destructive">{errors.registrationNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="contact@party.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="+1234567890"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={errors.phoneNumber ? "border-destructive" : ""}
                    />
                    {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Min 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "border-destructive" : ""}
                    />
                    {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foundedYear">Founded Year *</Label>
                    <Input
                      id="foundedYear"
                      name="foundedYear"
                      type="number"
                      placeholder="2020"
                      min="1800"
                      max={new Date().getFullYear()}
                      value={formData.foundedYear}
                      onChange={handleChange}
                      className={errors.foundedYear ? "border-destructive" : ""}
                    />
                    {errors.foundedYear && <p className="text-sm text-destructive">{errors.foundedYear}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://www.party.com"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Party headquarters address"
                    value={formData.address}
                    onChange={handleChange}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of your party's vision and mission"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Register Party"}
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
                  <Link to="/party-login" className="text-primary hover:underline font-medium">
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

export default PartyRegister;