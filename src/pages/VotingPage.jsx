import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import client from "@/api/client";
import { useElection } from "@/contexts/ElectionContext";

const VotingPage = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { recordVote } = useElection();
  const [candidates, setCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    // Fetch candidates specific to User's Area and this Election
    client.get(`/users/view/Candidates/${electionId}`)
      .then(res => setCandidates(res.data))
      .catch(() => toast.error("Could not load candidates"));
  }, [electionId]);

  const handleConfirm = async () => {
    // candidateParticipatingId is the key from candidateConstituency table
    const result = await recordVote(electionId, selected.candidateparticipatingid);
    if (result) {
      setConfirmOpen(false);
      navigate("/voter-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Cast Your Vote</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {candidates.map(c => (
            <Card key={c.id} className={`cursor-pointer transition-all ${selected?.id === c.id ? 'ring-2 ring-primary' : ''}`} onClick={() => setSelected(c)}>
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto bg-secondary rounded-full mb-3 overflow-hidden">
                  {c.imageurl ? <img src={c.imageurl} className="w-full h-full object-cover"/> : null}
                </div>
                <CardTitle>{c.name}</CardTitle>
                <CardDescription>{c.partyname}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant={selected?.id === c.id ? "default" : "outline"}>
                  {selected?.id === c.id ? "Selected" : "Select"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t flex justify-end">
          <Button size="lg" disabled={!selected} onClick={() => setConfirmOpen(true)}>Proceed to Vote</Button>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Confirm Vote</DialogTitle></DialogHeader>
          <p>You are about to vote for <strong>{selected?.name}</strong> of <strong>{selected?.partyname}</strong>.</p>
          <p className="text-sm text-destructive font-medium">This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm & Cast</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default VotingPage;