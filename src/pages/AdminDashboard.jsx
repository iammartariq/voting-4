import { useState, useEffect } from "react";
import { LayoutDashboard, CalendarCheck, Upload, ShieldCheck, AlertTriangle, CheckCircle, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import client from "@/api/client";
import { useElection } from "@/contexts/ElectionContext";

const AdminDashboard = () => {
  const { elections, createElection, endElection, verifyIntegrity, uploadBulkData } = useElection();
  const [stats, setStats] = useState({});
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [csvFile, setCsvFile] = useState(null);
  const [bulkType, setBulkType] = useState("provinces");
  const [newElection, setNewElection] = useState({ title: "", type: "National", startDate: "", endDate: "", province: "" });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const statsRes = await client.get('/admin/dashboard/stats');
        setStats(statsRes.data);
        const logsRes = await client.get('/admin/recent-activity');
        setLogs(logsRes.data);
      } catch (e) { console.error(e); }
    };
    fetchAdminData();
  }, [activeTab]);

  const handleCreateElection = (e) => {
    e.preventDefault();
    createElection(newElection);
  };

  const handleBulkUpload = () => {
    const reader = new FileReader();
    reader.onload = (e) => uploadBulkData(bulkType, e.target.result);
    reader.readAsText(csvFile);
  };

  const handleVerify = async (id) => {
    const result = await verifyIntegrity(id);
    if (result) {
      if (result.status === "Secure" || result.status === "Clean") {
        toast.success(result.message, { icon: <CheckCircle className="text-green-500"/> });
      } else {
        toast.error(result.message, { icon: <AlertTriangle className="text-red-500"/> });
      }
    }
  };

  // Render Functions... (Dashboard, Bulk Upload same as previous)
  const renderElections = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Elections</h2>
        <Dialog>
          <DialogTrigger asChild><Button>Create New</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Election</DialogTitle></DialogHeader>
            <form onSubmit={handleCreateElection} className="space-y-4">
              <div className="space-y-2"><Label>Title</Label><Input value={newElection.title} onChange={e => setNewElection({...newElection, title: e.target.value})} /></div>
              <div className="space-y-2"><Label>Type</Label>
                <Select onValueChange={v => setNewElection({...newElection, type: v})} defaultValue="National">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="National">National</SelectItem><SelectItem value="Provincial">Provincial</SelectItem></SelectContent>
                </Select>
              </div>
              {newElection.type === 'Provincial' && (
                <div className="space-y-2"><Label>Province</Label><Input value={newElection.province} onChange={e => setNewElection({...newElection, province: e.target.value})} /></div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2"><Label>Start</Label><Input type="date" onChange={e => setNewElection({...newElection, startDate: e.target.value})} /></div>
                <div className="space-y-2"><Label>End</Label><Input type="date" onChange={e => setNewElection({...newElection, endDate: e.target.value})} /></div>
              </div>
              <Button type="submit" className="w-full">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {elections.map(e => (
            <TableRow key={e.id}>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.seatType}</TableCell>
              <TableCell>{e.status}</TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleVerify(e.id)} title="Verify Integrity"><ShieldCheck className="h-4 w-4 text-blue-600"/></Button>
                {e.status === 'Active' && (
                  <Button variant="destructive" size="sm" onClick={() => endElection(e.id)} title="End Election"><StopCircle className="h-4 w-4" /></Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4 space-y-2">
        <h2 className="font-bold text-xl mb-6">Admin</h2>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("dashboard")}><LayoutDashboard className="mr-2 h-4 w-4"/> Dashboard</Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("elections")}><CalendarCheck className="mr-2 h-4 w-4"/> Elections</Button>
        <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("bulk")}><Upload className="mr-2 h-4 w-4"/> Bulk Upload</Button>
      </aside>
      <main className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card><CardHeader><CardTitle>Voters</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{stats.totalVoters || 0}</CardContent></Card>
              <Card><CardHeader><CardTitle>Elections</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{stats.activeElections || 0}</CardContent></Card>
              <Card><CardHeader><CardTitle>Parties</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{stats.totalParties || 0}</CardContent></Card>
              <Card><CardHeader><CardTitle>Candidates</CardTitle></CardHeader><CardContent className="text-3xl font-bold">{stats.totalCandidates || 0}</CardContent></Card>
            </div>
            <Card>
              <CardHeader><CardTitle>Logs</CardTitle></CardHeader>
              <CardContent>
                <Table><TableBody>{logs.map((l, i) => <TableRow key={i}><TableCell>{l.actor}</TableCell><TableCell>{l.message}</TableCell></TableRow>)}</TableBody></Table>
              </CardContent>
            </Card>
          </div>
        )}
        {activeTab === "elections" && renderElections()}
        {activeTab === "bulk" && (
          <Card className="max-w-md mx-auto mt-10">
            <CardHeader><CardTitle>Bulk Upload</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Select value={bulkType} onValueChange={setBulkType}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="provinces">Provinces</SelectItem><SelectItem value="cities">Cities</SelectItem><SelectItem value="areas">Areas</SelectItem><SelectItem value="constituencies">Constituencies</SelectItem><SelectItem value="parties">Parties</SelectItem></SelectContent></Select>
              <Input type="file" accept=".csv" onChange={e => setCsvFile(e.target.files[0])} />
              <Button onClick={handleBulkUpload} className="w-full">Upload</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;