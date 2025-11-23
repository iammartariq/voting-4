import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, ArrowLeft, Users } from "lucide-react";
import { toast } from "sonner";
// CHANGE: Use Context instead of mockData
import { useElection } from "@/contexts/ElectionContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VotingPage = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  // CHANGE: Deconstruct from context
  const { elections, candidates, recordVote } = useElection();
  
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [voteRecorded, setVoteRecorded] = useState(false);

  const voterNid = sessionStorage.getItem("voterNid");
  
  // Find election in live context state
  const election = elections.find((e) => e.id === electionId || e.id === parseInt(electionId));
  
  // Find candidates for this election
  const electionCandidates = candidates.filter((c) => c.electionId === electionId || c.electionId === parseInt(electionId));

  if (!election) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="pt-6 text-center">
              <p>Election not found or invalid ID.</p>
              <Button onClick={() => navigate("/voter-dashboard")} className="mt-4">
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const handleVoteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setShowConfirmDialog(true);
  };

  const handleConfirmVote = async () => {
    // CHANGE: Updated recordVote signature to match Context (electionId, candidateId, voterId)
    const success = await recordVote(election.id, selectedCandidate.id, voterNid);
    
    if (success) {
      setShowConfirmDialog(false);
      setVoteRecorded(true);
    } else {
        setShowConfirmDialog(false);
    }
  };

  if (voteRecorded) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md shadow-card text-center">
            <CardContent className="pt-12 pb-12">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Vote Recorded!</h2>
              <p className="text-muted-foreground mb-2">
                Your vote for <span className="font-semibold text-foreground">{selectedCandidate.name}</span> has been successfully recorded.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Thank you for participating in the democratic process.
              </p>
              <Button onClick={() => navigate("/voter-dashboard")} className="w-full">
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/voter-dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold">{election.title}</h1>
            <Badge variant={election.type === "National" ? "default" : "secondary"}>
              {election.type}
            </Badge>
          </div>
          <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
            <span>Start: {election.startDate}</span>
            <span>End: {election.endDate}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Your Candidate</h2>
          <p className="text-muted-foreground text-sm">
            Review the candidates carefully and click "Vote" to cast your vote.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electionCandidates.length > 0 ? electionCandidates.map((candidate) => (
            <Card key={candidate.id} className="shadow-card hover:shadow-hover transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                    {candidate.image ? (
                         <img
                         src={candidate.image}
                         alt={candidate.name}
                         className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                       />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center border-4 border-primary/20">
                            <Users className="h-12 w-12 text-muted-foreground" />
                        </div>
                    )}
                </div>
                <CardTitle className="text-center">{candidate.name}</CardTitle>
                <CardDescription className="text-center">{candidate.party}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => handleVoteClick(candidate)} 
                  className="w-full"
                >
                  Vote for {candidate.name.split(' ')[0]}
                </Button>
              </CardContent>
            </Card>
          )) : (
            <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No candidates registered for this election yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Vote</DialogTitle>
            <DialogDescription>
              Are you sure you want to vote for the following candidate?
            </DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <div className="py-4">
              <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                {selectedCandidate.image ? (
                     <img
                     src={selectedCandidate.image}
                     alt={selectedCandidate.name}
                     className="w-16 h-16 rounded-full object-cover"
                   />
                ) : (
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                        <Users className="h-6 w-6" />
                    </div>
                )}
                <div>
                  <p className="font-semibold text-lg">{selectedCandidate.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedCandidate.party}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                <strong>Note:</strong> Once confirmed, your vote cannot be changed. You can only vote once per election.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmVote}>
              Confirm Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default VotingPage;