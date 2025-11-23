import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, LogOut, Plus, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useElection } from "@/contexts/ElectionContext";
import client from "@/api/client";

// --- Strictly Typed Interfaces ---
interface Province { id: number; name: string; }
interface City { id: number; name: string; provinceid: number; }
interface Area { id: number; name: string; cityid: number; }

interface Candidate {
  id: number;
  name: string;
  cnic: string;
  email: string;
  imageUrl?: string;
  area?: string;
  city?: string;
  status?: string;
}

interface ActivityLog {
  message: string;
  createdAt: string;
}

interface DashboardStats {
  totalCandidates: number;
  activeElections: number;
  allocatedSeats: number;
  wonSeats: number;
}

interface CandidateForm {
  name: string;
  email: string;
  cnic: string;
  province: string;
  city: string;
  area: string;
  imageFile: File | null;
}

const PartyDashboard = () => {
  const { logout } = useAuth();
  const { addCandidate } = useElection();
  
  const [stats, setStats] = useState<DashboardStats>({ 
    totalCandidates: 0, activeElections: 0, allocatedSeats: 0, wonSeats: 0 
  });
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Dropdown Data
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  // Form State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [candidateForm, setCandidateForm] = useState<CandidateForm>({
    name: "", email: "", cnic: "", province: "", city: "", area: "", imageFile: null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    fetchDropdowns();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, candRes, actRes] = await Promise.all([
        client.get('/parties/stats'),
        client.get('/parties/candidates'),
        client.get('/parties/recent-activity')
      ]);
      setStats(statsRes.data);
      setCandidates(candRes.data);
      setRecentActivity(actRes.data);
    } catch (e) { console.error(e); }
  };

  const fetchDropdowns = async () => {
    try {
      const [p, c, a] = await Promise.all([
        client.get('/public/province'),
        client.get('/public/cities'),
        client.get('/public/areas')
      ]);
      setProvinces(p.data);
      setCities(c.data);
      setAreas(a.data);
    } catch (e) { console.error(e); }
  };

  // Filters for dropdowns (No 'any' needed because state is typed)
  const filteredCities = cities.filter((c) => {
    const p = provinces.find((prov) => prov.name === candidateForm.province);
    return p && c.provinceid === p.id;
  });

  const filteredAreas = areas.filter((a) => {
    const c = cities.find((city) => city.name === candidateForm.city);
    return c && a.cityid === c.id;
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCandidateForm(prev => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCandidate(candidateForm);
    setIsAddOpen(false);
    fetchData(); // Refresh list
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader><CardTitle>Candidates</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{stats.totalCandidates}</CardContent></Card>
        <Card><CardHeader><CardTitle>Active Elections</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{stats.activeElections}</CardContent></Card>
        <Card><CardHeader><CardTitle>Allocated Seats</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{stats.allocatedSeats}</CardContent></Card>
        <Card><CardHeader><CardTitle>Won Seats</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{stats.wonSeats}</CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex justify-between border-b pb-2">
                <span>{act.message}</span>
                <span className="text-sm text-muted-foreground">{new Date(act.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCandidates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Candidates</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Add Candidate</Button></DialogTrigger>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Register Candidate</DialogTitle></DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-secondary rounded-full overflow-hidden">
                  {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <Users className="m-6" />}
                </div>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Name</Label><Input onChange={e => setCandidateForm({...candidateForm, name: e.target.value})} required /></div>
                <div className="space-y-2"><Label>CNIC</Label><Input onChange={e => setCandidateForm({...candidateForm, cnic: e.target.value})} required /></div>
              </div>
              <div className="space-y-2"><Label>Email</Label><Input type="email" onChange={e => setCandidateForm({...candidateForm, email: e.target.value})} required /></div>
              
              <div className="space-y-2">
                <Label>Province</Label>
                <Select onValueChange={v => setCandidateForm({...candidateForm, province: v})}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{provinces.map((p) => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>City</Label>
                  <Select disabled={!candidateForm.province} onValueChange={v => setCandidateForm({...candidateForm, city: v})}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{filteredCities.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Area</Label>
                  <Select disabled={!candidateForm.city} onValueChange={v => setCandidateForm({...candidateForm, area: v})}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{filteredAreas.map((a) => <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>CNIC</TableHead><TableHead>Email</TableHead></TableRow></TableHeader>
        <TableBody>
          {candidates.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="flex items-center gap-2">
                {c.imageUrl && <img src={c.imageUrl} className="w-8 h-8 rounded-full" />}
                {c.name}
              </TableCell>
              <TableCell>{c.cnic}</TableCell>
              <TableCell>{c.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-secondary/10">
      <aside className="w-64 bg-card border-r h-screen p-4 space-y-2">
        <h2 className="font-bold text-xl mb-6 text-primary px-2">Party Panel</h2>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('dashboard')}><Activity className="mr-2 h-4 w-4"/> Dashboard</Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab('candidates')}><Users className="mr-2 h-4 w-4"/> Candidates</Button>
        <div className="pt-20">
          <Button variant="ghost" className="w-full justify-start text-destructive" onClick={logout}><LogOut className="mr-2 h-4 w-4"/> Logout</Button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'candidates' && renderCandidates()}
      </main>
    </div>
  );
};

export default PartyDashboard;