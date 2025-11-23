import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Upload, X } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification";
import client from "@/api/client";

// Define proper error type
interface RegisterError {
  response?: {
    data?: {
      error?: string;
    };
  };
}

interface PartyFormData {
  name: string;
  abbreviation: string;
  email: string;
  password: string;
  logo: File | null;
}

const PartyRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"register" | "otp">("register");
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  // Store partyId for OTP step
  const [partyId, setPartyId] = useState<number | null>(null);

  const [formData, setFormData] = useState<PartyFormData>({
    name: "",
    abbreviation: "",
    email: "",
    password: "",
    logo: null
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.logo) return toast.error("Party logo is required");

    setIsLoading(true);
    
    try {
      // Backend expects multipart/form-data
      const data = new FormData();
      data.append('name', formData.name);
      data.append('abbreviation', formData.abbreviation);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('image', formData.logo); // Route expects 'image' field

      const res = await client.post('/parties/account/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setPartyId(res.data.partyId);
      toast.success("Registration successful. Please verify OTP.");
      setStep("otp");
    } catch (err) {
      // Properly cast the error
      const error = err as RegisterError;
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (otp: string) => {
    setIsLoading(true);
    try {
      await client.post('/parties/account/verify', { partyId, otp });
      toast.success("Account Verified! You can now log in.");
      navigate("/party-login");
    } catch (err) {
      const error = err as RegisterError;
      toast.error(error.response?.data?.error || "Invalid OTP");
    } finally {
      setIsLoading(false);
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
            <CardTitle className="text-2xl">Party Registration</CardTitle>
          </CardHeader>
          <CardContent>
            {step === "register" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Party Logo *</Label>
                  <div className="flex items-center gap-4">
                    {logoPreview ? (
                      <div className="relative">
                        <img src={logoPreview} alt="Logo" className="w-24 h-24 object-cover rounded-lg border" />
                        <button type="button" onClick={() => { setFormData({...formData, logo: null}); setLogoPreview(null); }} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Party Name</Label>
                    <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Abbreviation</Label>
                    <Input value={formData.abbreviation} onChange={e => setFormData({...formData, abbreviation: e.target.value})} placeholder="PTI" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>Register Party</Button>
              </form>
            ) : (
              <OtpVerification 
                email={formData.email}
                onVerify={handleOtpVerify}
                onResend={() => client.post('/public/resend/otp', { userId: partyId, email: formData.email })}
                isLoading={isLoading}
              />
            )}
            <div className="mt-6 text-center text-sm">
                Already have an account? <Link to="/party-login" className="text-primary hover:underline">Login</Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PartyRegister;