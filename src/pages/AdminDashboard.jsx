import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, CalendarCheck, Users, UserCheck, LogOut,
  Plus, Trash2, Menu, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useElection } from "@/contexts/ElectionContext";

// Location Data
const locationData = {
  "Province A": { "City A1": ["Area 1", "Area 2"], "City A2": ["Area 3", "Area 4"] },
  "Province B": { "City B1": ["Area 5", "Area 6"], "City B2": ["Area 7", "Area 8"] }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { elections, candidates, voters, deleteElection, deleteVoter, createElection, uploadBulkData, addCandidate } = useElection();
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);
  
  // Election Form State
  const [newElection, setNewElection] = useState({ 
    title: "", type: "National", startDate: "", endDate: "", province: ""
  });
  
  // Candidate Form State
  const [candidateForm, setCandidateForm] = useState({
    name: "", party: "", cnic: "", province: "", city: "", area: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [bulkType, setBulkType] = useState("constituencies");

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  // --- Election Creation Logic ---
  const handleCreateElection = async (e) => {
    e.preventDefault();
    if (newElection.type === 'Provincial' && !newElection.province) return toast.error("Please select a province");

    await createElection(newElection);
    setNewElection({ title: "", type: "National", startDate: "", endDate: "", province: "" });
  };

  // --- Candidate Creation Logic ---
  const handleAdminAddCandidate = async (e) => {
    e.preventDefault();
    if (!candidateForm.name || !candidateForm.party || !candidateForm.area) return toast.error("Required fields missing");
    await addCandidate({ ...candidateForm, image: imagePreview });
    setIsAddCandidateOpen(false);
    setCandidateForm({ name: "", party: "", cnic: "", province: "", city: "", area: "" });
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const getCandCities = () => candidateForm.province ? Object.keys(locationData[candidateForm.province] || {}) : [];
  const getCandAreas = () => (candidateForm.province && candidateForm.city) ? locationData[candidateForm.province][candidateForm.city] || [] : [];

  const handleBulkUpload = async () => {
    if (!csvFile) return toast.error("Please select a CSV file");
    const reader = new FileReader();
    reader.onload = async (e) => {
        await uploadBulkData(bulkType, e.target.result);
        setCsvFile(null);
    };
    reader.readAsText(csvFile);
  };

  const Sidebar = () => (
    <aside className={`fixed md:relative z-40 w-64 bg-card border-r border-border h-screen transition-transform duration-300 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-primary">Admin Panel</h2>
        <button onClick={() => setMobileSidebarOpen(false)} className="md:hidden"><Menu /></button>
      </div>
      <nav className="p-4 space-y-2">
        {[{id:"dashboard", label:"Dashboard", icon:LayoutDashboard}, {id:"elections", label:"Manage Elections", icon:CalendarCheck}, {id:"candidates", label:"Candidates", icon:Users}, {id:"voters", label:"Manage Voters", icon:UserCheck}, {id:"bulk", label:"Bulk Upload", icon:Upload}].map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === item.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                <item.icon className="h-5 w-5" /><span>{item.label}</span>
            </button>
        ))}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t"><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><LogOut className="h-5 w-5" /> Logout</button></div>
    </aside>
  );

  const renderDashboard = () => (
      <div className="animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Elections</CardTitle></CardHeader><CardContent><div className="text-4xl font-bold">{elections.length}</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Candidates</CardTitle></CardHeader><CardContent><div className="text-4xl font-bold text-blue-600">{candidates.length}</div></CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Registered Voters</CardTitle></CardHeader><CardContent><div className="text-4xl font-bold text-green-600">{voters.length}</div></CardContent></Card>
        </div>
      </div>
  );

  const renderElections = () => (
    <div className="animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage Elections</h1>
            <Dialog>
                <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> New Election</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader><DialogTitle>Create New Election</DialogTitle></DialogHeader>
                    <form onSubmit={handleCreateElection} className="space-y-4">
                        <div className="space-y-2"><Label>Title</Label><Input value={newElection.title} onChange={e => setNewElection({...newElection, title: e.target.value})} required /></div>
                        
                        <div className="space-y-2"><Label>Type</Label>
                            <Select value={newElection.type} onValueChange={v => setNewElection({...newElection, type: v, province: ""})}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="National">National</SelectItem>
                                    <SelectItem value="Provincial">Provincial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {newElection.type === 'Provincial' && (
                            <div className="space-y-2">
                                <Label>Province</Label>
                                <Select value={newElection.province} onValueChange={v => setNewElection({...newElection, province: v})}>
                                    <SelectTrigger><SelectValue placeholder="Select Province" /></SelectTrigger>
                                    <SelectContent>{Object.keys(locationData).map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Start Date</Label><Input type="date" value={newElection.startDate} onChange={e => setNewElection({...newElection, startDate: e.target.value})} required /></div>
                            <div className="space-y-2"><Label>End Date</Label><Input type="date" value={newElection.endDate} onChange={e => setNewElection({...newElection, endDate: e.target.value})} required /></div>
                        </div>
                        <Button type="submit" className="w-full">Create Election</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
        <Card>
            <Table>
                <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Type</TableHead><TableHead>Scope</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                    {elections.map((election) => (
                        <TableRow key={election.id}>
                            <TableCell>{election.title}</TableCell>
                            <TableCell><Badge variant="outline">{election.type}</Badge></TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                                {election.type === 'National' && "All"}
                                {election.type === 'Provincial' && election.province}
                            </TableCell>
                            <TableCell><Badge variant={election.status === "active" ? "default" : "secondary"}>{election.status}</Badge></TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteElection(election.id)}><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    </div>
  );

  const renderCandidates = () => (
    <div className="animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Candidates</h1>
            <Dialog open={isAddCandidateOpen} onOpenChange={setIsAddCandidateOpen}>
                <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Add Candidate</Button></DialogTrigger>
                <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
                    <DialogHeader><DialogTitle>Add New Candidate (Admin)</DialogTitle></DialogHeader>
                    <form onSubmit={handleAdminAddCandidate} className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                                {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover"/> : <Users />}
                            </div>
                            <Input type="file" accept="image/*" onChange={handleImageChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>Name</Label><Input value={candidateForm.name} onChange={e => setCandidateForm({...candidateForm, name: e.target.value})} required /></div>
                            <div className="space-y-2"><Label>CNIC</Label><Input value={candidateForm.cnic} onChange={e => setCandidateForm({...candidateForm, cnic: e.target.value})} required /></div>
                        </div>
                        <div className="space-y-2"><Label>Party Name</Label><Input value={candidateForm.party} onChange={e => setCandidateForm({...candidateForm, party: e.target.value})} placeholder="e.g. Democratic Party" required /></div>
                        
                        <div className="space-y-2"><Label>Province</Label>
                            <Select value={candidateForm.province} onValueChange={v => setCandidateForm({...candidateForm, province: v, city: "", area: ""})}>
                                <SelectTrigger><SelectValue placeholder="Select Province" /></SelectTrigger>
                                <SelectContent>{Object.keys(locationData).map(k => <SelectItem key={k} value={k}>{k}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label>City</Label>
                                <Select value={candidateForm.city} onValueChange={v => setCandidateForm({...candidateForm, city: v, area: ""})} disabled={!candidateForm.province}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>{getCandCities().map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2"><Label>Area</Label>
                                <Select value={candidateForm.area} onValueChange={v => setCandidateForm({...candidateForm, area: v})} disabled={!candidateForm.city}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>{getCandAreas().map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
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
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Party</TableHead><TableHead>Location</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                    {candidates.map(c => (
                        <TableRow key={c.id}>
                            <TableCell>{c.name}</TableCell>
                            <TableCell>{c.party || c.partyId}</TableCell>
                            <TableCell>{c.area}, {c.city}</TableCell>
                            <TableCell><Badge>{c.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    </div>
  );

  const renderVoters = () => (
    <div className="animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold mb-8">Registered Voters</h1>
        <Card>
            <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>NID</TableHead><TableHead>Location</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                    {voters.map((voter) => (
                        <TableRow key={voter.id}>
                            <TableCell>
                                <div className="font-medium">{voter.name}</div>
                                <div className="text-xs text-muted-foreground">{voter.email}</div>
                            </TableCell>
                            <TableCell>{voter.nid}</TableCell>
                            <TableCell>{voter.area}, {voter.city}</TableCell>
                            <TableCell className="text-right">
                                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteVoter(voter.id)}><Trash2 className="h-4 w-4" /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    </div>
  );

  const renderBulkUpload = () => (
      <div className="animate-in fade-in duration-500">
          <h1 className="text-3xl font-bold mb-8">Bulk Data Upload</h1>
          <Card className="max-w-xl">
              <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                      <Label>Data Type</Label>
                      <Select value={bulkType} onValueChange={setBulkType}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                              <SelectItem value="provinces">Provinces</SelectItem>
                              <SelectItem value="cities">Cities</SelectItem>
                              <SelectItem value="areas">Areas</SelectItem>
                              <SelectItem value="constituencies">Constituencies</SelectItem>
                              <SelectItem value="parties">Parties</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                  <div className="space-y-2">
                      <Label>Upload CSV</Label>
                      <Input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} />
                  </div>
                  <Button onClick={handleBulkUpload} className="w-full" disabled={!csvFile}>Process CSV</Button>
              </CardContent>
          </Card>
      </div>
  );

  return (
    <div className="flex min-h-screen bg-secondary/10">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="md:hidden mb-6 flex items-center justify-between">
             <span className="font-bold text-lg">Admin Dashboard</span>
             <Button variant="ghost" onClick={() => setMobileSidebarOpen(true)}><Menu /></Button>
        </div>
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "elections" && renderElections()}
        {activeTab === "candidates" && renderCandidates()}
        {activeTab === "voters" && renderVoters()}
        {activeTab === "bulk" && renderBulkUpload()}
      </main>
    </div>
  );
};

export default AdminDashboard;