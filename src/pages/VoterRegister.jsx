import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OtpVerification from "@/components/OtpVerification";
import client from "@/api/client";

const VoterRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("register");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  
  // Dropdown Data
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  const [formData, setFormData] = useState({
    name: "", email: "", cnic: "", password: "", province: "", city: "", area: ""
  });

  // Fetch Provinces on Load
  useEffect(() => {
    client.get('/public/province').then(res => setProvinces(res.data));
    client.get('/public/cities').then(res => setCities(res.data));
    client.get('/public/areas').then(res => setAreas(res.data));
  }, []);

  // Filtering Logic
  const filteredCities = cities.filter(c => {
    const p = provinces.find(prov => prov.name === formData.province);
    return p && c.provinceid === p.id;
  });

  const filteredAreas = areas.filter(a => {
    const c = cities.find(city => city.name === formData.city);
    return c && a.cityid === c.city_id; // Check backend response key (city_id vs id)
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await client.post('/users/account/create', formData);
      setUserId(res.data.userId);
      setStep("otp");
      toast.success("Account created! Please verify OTP.");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (otp) => {
    setIsLoading(true);
    try {
      await client.post('/users/account/verify', { userId, otp });
      toast.success("Verified successfully!");
      navigate("/voter-login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid Code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Voter Account</CardTitle>
          </CardHeader>
          <CardContent>
            {step === "register" ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Name</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="space-y-1">
                    <Label>CNIC</Label>
                    <Input value={formData.cnic} onChange={(e) => setFormData({...formData, cnic: e.target.value})} placeholder="XXXXX-XXXXXXX-X" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <Label>Password</Label>
                  <Input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                </div>

                {/* Location Selects */}
                <div className="space-y-1">
                  <Label>Province</Label>
                  <Select onValueChange={(v) => setFormData({...formData, province: v, city: "", area: ""})}>
                    <SelectTrigger><SelectValue placeholder="Select Province" /></SelectTrigger>
                    <SelectContent>
                      {provinces.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>City</Label>
                    <Select disabled={!formData.province} onValueChange={(v) => setFormData({...formData, city: v, area: ""})}>
                      <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
                      <SelectContent>
                        {filteredCities.map(c => <SelectItem key={c.city_id} value={c.city_name}>{c.city_name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Area</Label>
                    <Select disabled={!formData.city} onValueChange={(v) => setFormData({...formData, area: v})}>
                      <SelectTrigger><SelectValue placeholder="Select Area" /></SelectTrigger>
                      <SelectContent>
                        {filteredAreas.map(a => <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full mt-2" disabled={isLoading}>Register</Button>
              </form>
            ) : (
              <OtpVerification 
                email={formData.email} 
                onVerify={handleOtpVerify} 
                onResend={() => client.post('/public/resend/otp', { userId, email: formData.email })} 
                isLoading={isLoading} 
              />
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default VoterRegister;