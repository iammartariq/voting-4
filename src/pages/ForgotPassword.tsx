import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification";

const ForgotPassword = () => {
  const navigate = useNavigate();
  // Typed state for Step
  const [step, setStep] = useState<"identify" | "reset">("identify");
  const [userType, setUserType] = useState("voter");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    cnic: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleIdentifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.email) {
        toast.error("Email is required");
        return;
    }
    if (userType !== "admin" && !formData.cnic) {
        toast.error("CNIC is required");
        return;
    }

    setIsLoading(true);
    // Simulate API: Check user exists & send OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);

    setStep("reset");
    toast.info(`OTP sent to ${formData.email}`);
  };

  const handleResetSubmit = async (otp: string) => {
    if (!formData.newPassword || formData.newPassword !== formData.confirmPassword) {
        toast.error("Passwords do not match or are empty");
        return;
    }

    setIsLoading(true);
    // Simulate API: Verify OTP + Update Password
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    if (otp === "123456") {
        toast.success("Password reset successfully! Please login.");
        if(userType === 'admin') navigate("/admin-login");
        else navigate("/voter-login");
    } else {
        toast.error("Invalid OTP");
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
                <KeyRound className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
                {step === "identify" ? "Enter details to find your account" : "Verify OTP and set new password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "identify" ? (
              <form onSubmit={handleIdentifySubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Select onValueChange={setUserType} defaultValue={userType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="voter">Voter</SelectItem>
                      <SelectItem value="party">Party</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="registered@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                {userType !== 'admin' && (
                  <div className="space-y-2">
                    <Label htmlFor="cnic">CNIC</Label>
                    <Input
                      id="cnic"
                      placeholder="12345-1234567-1"
                      value={formData.cnic}
                      onChange={(e) => setFormData({...formData, cnic: e.target.value})}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Send OTP"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="newPass">New Password</Label>
                    <Input
                      id="newPass"
                      type="password"
                      placeholder="New Password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPass">Confirm Password</Label>
                    <Input
                      id="confirmPass"
                      type="password"
                      placeholder="Confirm New Password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                </div>

                <OtpVerification 
                    email={formData.email}
                    onVerify={handleResetSubmit}
                    onResend={async () => { toast.success("Code Resent") }}
                    isLoading={isLoading}
                />
              </div>
            )}

            <div className="mt-6 text-center">
              <Link to="/voter-login" className="text-sm text-muted-foreground hover:text-primary">
                ← Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;