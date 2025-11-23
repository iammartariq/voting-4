import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Trophy,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Menu,
  MapPin,
  CheckCircle,
  XCircle,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock data - replace with actual API calls
const mockPartyInfo = {
  id: "party_001",
  name: "Democratic Progressive Party",
  registrationNumber: "REG-12345",
  email: "contact@dpp.com",
  logo: "/placeholder.svg"
};

const mockCandidates = [
  {
    id: "cand_001",
    name: "John Smith",
    email: "john@example.com",
    constituency: "District 1",
    constituencyId: "dist_001",
    status: "active",
    registeredDate: "2024-01-15"
  },
  {
    id: "cand_002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    constituency: "District 2",
    constituencyId: "dist_002",
    status: "active",
    registeredDate: "2024-01-20"
  }
];

const mockElections = [
  {
    id: "elec_001",
    title: "National Presidential Election 2024",
    type: "National",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2024-03-15"
  },
  {
    id: "elec_002",
    title: "Local Elections 2024",
    type: "Local",
    status: "upcoming",
    startDate: "2024-06-01",
    endDate: "2024-06-10"
  }
];

const mockConstituencies = [
  { id: "dist_001", name: "District 1", seats: 5 },
  { id: "dist_002", name: "District 2", seats: 3 },
  { id: "dist_003", name: "District 3", seats: 4 },
  { id: "dist_004", name: "District 4", seats: 6 }
];

const mockAllocations = [
  {
    id: "alloc_001",
    candidateName: "John Smith",
    electionTitle: "National Presidential Election 2024",
    constituency: "District 1",
    seatNumber: 1,
    allocatedDate: "2024-02-01"
  }
];

const mockWonSeats = [
  {
    id: "won_001",
    candidateName: "Jane Doe",
    electionTitle: "Previous Election 2023",
    constituency: "District 1",
    votes: 15420,
    percentage: 45.2
  }
];

const PartyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [candidates, setCandidates] = useState(mockCandidates);
  const [selectedElection, setSelectedElection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog states
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);
  const [isAllocateSeatOpen, setIsAllocateSeatOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Form data
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    email: "",
    cnic: "",
    constituency: ""
  });

  const [seatAllocationForm, setSeatAllocationForm] = useState({
    candidateId: "",
    electionId: "",
    constituencyId: "",
    seatNumber: ""
  });

  useEffect(() => {
    // Check if party is logged in
    const isLoggedIn = sessionStorage.getItem("partyLoggedIn");
    if (!isLoggedIn) {
      navigate("/party-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("partyLoggedIn");
    sessionStorage.removeItem("partyEmail");
    sessionStorage.removeItem("partyId");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!candidateForm.name || !candidateForm.email || !candidateForm.cnic || !candidateForm.constituency) {
      toast.error("All fields are required");
      return;
    }

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/party/candidates', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(candidateForm)
      // });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCandidate = {
        id: `cand_${Date.now()}`,
        name: candidateForm.name,
        email: candidateForm.email,
        constituency: mockConstituencies.find(c => c.id === candidateForm.constituency)?.name,
        constituencyId: candidateForm.constituency,
        status: "active",
        registeredDate: new Date().toISOString().split('T')[0]
      };
      
      setCandidates([...candidates, newCandidate]);
      setIsAddCandidateOpen(false);
      setCandidateForm({ name: "", email: "", cnic: "", constituency: "" });
      toast.success("Candidate added successfully");
    } catch (error) {
      toast.error("Failed to add candidate");
    }
  };

  const handleRemoveCandidate = async (candidateId) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/party/candidates/${candidateId}`, { method: 'DELETE' });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCandidates(candidates.filter(c => c.id !== candidateId));
      toast.success("Candidate removed successfully");
    } catch (error) {
      toast.error("Failed to remove candidate");
    }
  };

  const handleAllocateSeat = async (e) => {
    e.preventDefault();
    
    if (!seatAllocationForm.candidateId || !seatAllocationForm.electionId || 
        !seatAllocationForm.constituencyId || !seatAllocationForm.seatNumber) {
      toast.error("All fields are required");
      return;
    }

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Seat allocated successfully");
      setIsAllocateSeatOpen(false);
      setSeatAllocationForm({
        candidateId: "",
        electionId: "",
        constituencyId: "",
        seatNumber: ""
      });
    } catch (error) {
      toast.error("Failed to allocate seat");
    }
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.constituency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "candidates", label: "Candidates", icon: Users },
    { id: "allocations", label: "Seat Allocations", icon: MapPin },
    { id: "results", label: "Won Seats", icon: Trophy },
  ];

  const Sidebar = () => (
    <aside className={`
      fixed md:relative z-40 w-64 bg-card border-r border-border h-screen transition-transform duration-300
      ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}>
      <div className="p-6 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={mockPartyInfo.logo} alt="Logo" className="w-8 h-8 rounded-full" />
          <h2 className="text-lg font-bold text-primary">Party Panel</h2>
        </div>
        <button onClick={() => setMobileSidebarOpen(false)} className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-border bg-card">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );

  const renderDashboard = () => (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Dashboard Overview</h1>
      
      {/* Party Info Card */}
      <Card className="mb-8 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-4">
            <img src={mockPartyInfo.logo} alt="Party Logo" className="w-16 h-16 rounded-full border-2 border-primary" />
            <div>
              <CardTitle className="text-2xl">{mockPartyInfo.name}</CardTitle>
              <CardDescription>Reg. No: {mockPartyInfo.registrationNumber}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{candidates.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Elections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">
              {mockElections.filter(e => e.status === "active").length}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Allocated Seats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">{mockAllocations.length}</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Won Seats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{mockWonSeats.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">New candidate registered</p>
                <p className="text-sm text-muted-foreground">Sarah Johnson added to District 2</p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Seat allocated</p>
                <p className="text-sm text-muted-foreground">John Smith - District 1, Seat 1</p>
              </div>
              <span className="ml-auto text-xs text-muted-foreground">5 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCandidates = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Candidates</h1>
        <Dialog open={isAddCandidateOpen} onOpenChange={setIsAddCandidateOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-md">
              <Plus className="mr-2 h-4 w-4" /> Add Candidate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Candidate</DialogTitle>
              <DialogDescription>Register a new candidate for your party</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={candidateForm.name}
                  onChange={(e) => setCandidateForm({...candidateForm, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={candidateForm.email}
                  onChange={(e) => setCandidateForm({...candidateForm, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC</Label>
                <Input
                  id="cnic"
                  value={candidateForm.cnic}
                  onChange={(e) => setCandidateForm({...candidateForm, cnic: e.target.value})}
                  placeholder="12345-1234567-1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="constituency">Constituency</Label>
                <Select 
                  value={candidateForm.constituency}
                  onValueChange={(value) => setCandidateForm({...candidateForm, constituency: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select constituency" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockConstituencies.map((const_) => (
                      <SelectItem key={const_.id} value={const_.id}>
                        {const_.name} ({const_.seats} seats)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Add Candidate</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name or constituency..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Constituency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{candidate.constituency}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={candidate.status === "active" ? "default" : "secondary"}>
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {candidate.registeredDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-destructive"
                      onClick={() => handleRemoveCandidate(candidate.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No candidates found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderAllocations = () => (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Seat Allocations</h1>
        <Dialog open={isAllocateSeatOpen} onOpenChange={setIsAllocateSeatOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-md">
              <Plus className="mr-2 h-4 w-4" /> Allocate Seat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Allocate Constituency Seat</DialogTitle>
              <DialogDescription>
                Assign a candidate to a specific constituency seat for an election
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAllocateSeat} className="space-y-4">
              <div className="space-y-2">
                <Label>Election</Label>
                <Select 
                  value={seatAllocationForm.electionId}
                  onValueChange={(value) => setSeatAllocationForm({...seatAllocationForm, electionId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select election" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockElections.map((election) => (
                      <SelectItem key={election.id} value={election.id}>
                        {election.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Candidate</Label>
                <Select 
                  value={seatAllocationForm.candidateId}
                  onValueChange={(value) => setSeatAllocationForm({...seatAllocationForm, candidateId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.constituency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Constituency</Label>
                <Select 
                  value={seatAllocationForm.constituencyId}
                  onValueChange={(value) => setSeatAllocationForm({...seatAllocationForm, constituencyId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select constituency" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockConstituencies.map((const_) => (
                      <SelectItem key={const_.id} value={const_.id}>
                        {const_.name} ({const_.seats} seats available)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Seat Number</Label>
                <Input
                  type="number"
                  min="1"
                  value={seatAllocationForm.seatNumber}
                  onChange={(e) => setSeatAllocationForm({...seatAllocationForm, seatNumber: e.target.value})}
                  placeholder="Enter seat number"
                />
              </div>
              <Button type="submit" className="w-full">Allocate Seat</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter by Election */}
      <div className="mb-6">
        <Label>Filter by Election</Label>
        <Select value={selectedElection} onValueChange={setSelectedElection}>
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder="All elections" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Elections</SelectItem>
            {mockElections.map((election) => (
              <SelectItem key={election.id} value={election.id}>
                {election.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Election</TableHead>
              <TableHead>Constituency</TableHead>
              <TableHead>Seat Number</TableHead>
              <TableHead>Allocated Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAllocations.length > 0 ? (
              mockAllocations.map((allocation) => (
                <TableRow key={allocation.id}>
                  <TableCell className="font-medium">{allocation.candidateName}</TableCell>
                  <TableCell>{allocation.electionTitle}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{allocation.constituency}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{allocation.seatNumber}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {allocation.allocatedDate}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No seat allocations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const renderResults = () => (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Won Seats & Results</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {mockWonSeats.length > 0 ? (
          mockWonSeats.map((seat) => (
            <Card key={seat.id} className="shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{seat.candidateName}</CardTitle>
                    <CardDescription>{seat.electionTitle}</CardDescription>
                  </div>
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Trophy className="mr-1 h-3 w-3" /> Won
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Constituency</p>
                    <p className="font-semibold">{seat.constituency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Votes</p>
                    <p className="font-semibold text-primary">{seat.votes.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vote Share</p>
                    <p className="font-semibold text-green-600">{seat.percentage}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="shadow-sm">
            <CardContent className="py-12 text-center">
              <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No won seats yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-secondary/10">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        {/* Mobile Header */}
        <div className="md:hidden mb-6 flex items-center justify-between">
          <span className="font-bold text-lg">Party Dashboard</span>
          <Button variant="ghost" onClick={() => setMobileSidebarOpen(true)}>
            <Menu />
          </Button>
        </div>

        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "candidates" && renderCandidates()}
        {activeTab === "allocations" && renderAllocations()}
        {activeTab === "results" && renderResults()}
      </main>
    </div>
  );
};

export default PartyDashboard;