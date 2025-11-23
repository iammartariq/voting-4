import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, LogOut, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
// FIX: Imported Card components from the correct file
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useElection } from "@/contexts/ElectionContext";

// Reuse the location data mock for consistency
const locationData = {
  "Province A": { "City A1": ["Area 1", "Area 2"], "City A2": ["Area 3", "Area 4"] },
  "Province B": { "City B1": ["Area 5", "Area 6"], "City B2": ["Area 7", "Area 8"] }
};

const PartyDashboard = () => {
  const navigate = useNavigate();
  const { addCandidate, candidates: allCandidates } = useElection();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);
  
  // Candidate Picture State
  const [candidateImage, setCandidateImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    cnic: "",
    province: "",
    city: "",
    area: ""
  });

  useEffect(() => {
    if (!sessionStorage.getItem("partyLoggedIn")) navigate("/party-login");
  }, [navigate]);

  // --- LOGOUT FUNCTIONALITY ---
  const handleLogout = () => {
    sessionStorage.removeItem("partyLoggedIn");
    sessionStorage.removeItem("partyEmail");
    sessionStorage.removeItem("partyId");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setCandidateImage(file);
        setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateForm.name || !candidateForm.area) return toast.error("Required fields missing");

    await addCandidate({
        ...candidateForm,
        partyId: sessionStorage.getItem("partyId"),
        image: imagePreview
    });

    setIsAddCandidateOpen(false);
    setCandidateForm({ name: "", email: "", cnic: "", province: "", city: "", area: "" });
    setCandidateImage(null);
    setImagePreview(null);
  };

  const getCities = () => candidateForm.province ? Object.keys(locationData[candidateForm.province] || {}) : [];
  const getAreas = () => (candidateForm.province && candidateForm.city) ? locationData[candidateForm.province][candidateForm.city] || [] : [];

  const Sidebar = () => (
    <aside className={`fixed md:relative z-40 w-64 bg-card border-r border-border h-screen transition-transform duration-300 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-bold text-primary">Party Panel</h2>
            <button onClick={() => setMobileSidebarOpen(false)} className="md:hidden"><Menu className="h-6 w-6" /></button>
        </div>
        <nav className="p-4 space-y-2">
            <button onClick={() => setActiveTab('candidates')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground">
                <Users className="h-5 w-5" /> Candidates
            </button>
        </nav>
        
        {/* Logout Button at bottom of Sidebar */}
        <div className="absolute bottom-0 w-full p-4 border-t">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors rounded-lg">
                <LogOut className="h-5 w-5" /> Logout
            </button>
        </div>
    </aside>
  );

  const renderCandidates = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Candidates</h1>
        <Dialog open={isAddCandidateOpen} onOpenChange={setIsAddCandidateOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Add Candidate</Button></DialogTrigger>
          <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader><DialogTitle>Add New Candidate</DialogTitle></DialogHeader>
            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div className="flex items-center gap-4">
                 {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                 ) : (
                    <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center"><Users /></div>
                 )}
                 <div>
                    <Label>Candidate Picture</Label>
                    <Input type="file" accept="image/*" onChange={handleImageChange} />
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Name</Label><Input value={candidateForm.name} onChange={e => setCandidateForm({...candidateForm, name: e.target.value})} required /></div>
                  <div className="space-y-2"><Label>CNIC</Label><Input value={candidateForm.cnic} onChange={e => setCandidateForm({...candidateForm, cnic: e.target.value})} required /></div>
              </div>

              <div className="space-y-2"><Label>Province</Label>
                <Select value={candidateForm.province} onValueChange={v => setCandidateForm({...candidateForm, province: v, city: "", area: ""})}>
                    <SelectTrigger><SelectValue placeholder="Select Province" /></SelectTrigger>
                    <SelectContent>{Object.keys(locationData).map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>City</Label>
                    <Select value={candidateForm.city} onValueChange={v => setCandidateForm({...candidateForm, city: v, area: ""})} disabled={!candidateForm.province}>
                        <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
                        <SelectContent>{getCities().map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
                <div className="space-y-2"><Label>Area</Label>
                    <Select value={candidateForm.area} onValueChange={v => setCandidateForm({...candidateForm, area: v})} disabled={!candidateForm.city}>
                        <SelectTrigger><SelectValue placeholder="Select Area" /></SelectTrigger>
                        <SelectContent>{getAreas().map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
              </div>

              <Button type="submit" className="w-full">Register Candidate</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Area</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {allCandidates.map(c => (
                <TableRow key={c.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                        {c.image && <img src={c.image} className="w-8 h-8 rounded-full" />} {c.name}
                    </TableCell>
                    <TableCell>{c.area}, {c.city}</TableCell>
                    <TableCell><Badge>{c.status}</Badge></TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-secondary/10">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">{renderCandidates()}</main>
    </div>
  );
};

export default PartyDashboard;