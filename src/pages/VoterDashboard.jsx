import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useElection } from "@/contexts/ElectionContext";

const VoterDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { elections, voterHistory } = useElection();

  // Filter active elections
  const activeElections = elections.filter(e => e.status === 'Active');

  const hasVoted = (electionId) => {
    return voterHistory.some(vote => vote.electionid === electionId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/10">
      <Navbar />
      <div className="bg-background border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <div className="flex gap-2 mt-2 text-muted-foreground">
            <Badge variant="outline">CNIC: {user?.cnic}</Badge>
            <Badge variant="outline">Area ID: {user?.areaid}</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Live Elections</TabsTrigger>
            <TabsTrigger value="history">My Votes</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeElections.map(election => (
                <Card key={election.id} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{election.name}</CardTitle>
                      <Badge>{election.seatType}</Badge>
                    </div>
                    <CardDescription>
                      Ends: {new Date(election.end_date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      disabled={hasVoted(election.id)}
                      onClick={() => navigate(`/vote/${election.id}`)}
                    >
                      {hasVoted(election.id) ? "Voted" : "Vote Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
              {activeElections.length === 0 && <p className="text-muted-foreground">No active elections found.</p>}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              {voterHistory.map(vote => (
                <Card key={vote.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{vote.electionName}</h4>
                      <p className="text-sm text-muted-foreground">Voted for: {vote.candidateName} ({vote.partyName})</p>
                      <p className="text-xs text-muted-foreground mt-1">Hash: {vote.current_hash?.substring(0, 20)}...</p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" /> Confirmed
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default VoterDashboard;