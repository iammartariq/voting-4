import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification";
import client from "@/api/client";
import { useAuth } from "@/contexts/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "", cnic: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Step 1: Verify Credentials
      const res = await client.post('/admin/auth/signin', formData);
      setUserId(res.data.userId);
      setStep("otp");
      toast.info(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (otp) => {
    setIsLoading(true);
    try {
      // Step 2: Verify MFA
      const res = await client.post('/admin/auth/verify-mfa', { userId, otp });
      login(res.data.token, { ...res.data.UserData, role: 'admin' });
      toast.success("Admin Access Granted");
      navigate("/admin-dashboard");
    } catch (error) {
      toast.error(error.response?.data?.error || "MFA Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-destructive/20">
          <CardHeader className="text-center">
            <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-4">
              <ShieldCheck className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Admin Portal</CardTitle>
          </CardHeader>
          <CardContent>
            {step === "login" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="space-y-2">
                  <Label>CNIC</Label>
                  <Input value={formData.cnic} onChange={e => setFormData({...formData, cnic: e.target.value})} placeholder="00000-0000000-0" required />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
                </div>
                <Button variant="destructive" className="w-full" disabled={isLoading}>Login</Button>
              </form>
            ) : (
              <OtpVerification email={formData.email} onVerify={handleOtpVerify} isLoading={isLoading} />
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;