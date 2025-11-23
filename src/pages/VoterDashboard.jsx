import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Vote, LogOut, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { elections, candidates, myVotes, results, hasVoted } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VoterDashboard = () => {
  const navigate = useNavigate();
  const voterNid = sessionStorage.getItem("voterNid");

  const handleLogout = () => {
    sessionStorage.removeItem("voterNid");
    sessionStorage.removeItem("voterEmail");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleVoteNow = (electionId) => {
    const alreadyVoted = hasVoted(voterNid, electionId);
    if (alreadyVoted) {
      toast.error("You have already voted in this election");
    } else {
      navigate(`/vote/${electionId}`);
    }
  };

  const COLORS = ['#2563eb', '#16a34a', '#ea580c', '#8b5cf6', '#ec4899'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Voter Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Manage your voting activities here.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="elections" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="elections">Available Elections</TabsTrigger>
            <TabsTrigger value="votes">My Votes</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          {/* Available Elections Tab */}
          <TabsContent value="elections" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {elections
                .filter((e) => e.status === "active")
                .map((election) => {
                  const alreadyVoted = hasVoted(voterNid, election.id);
                  const electionCandidates = candidates.filter(c => c.electionId === election.id);
                  
                  return (
                    <Card key={election.id} className="shadow-card">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{election.title}</CardTitle>
                            <CardDescription>{election.description}</CardDescription>
                          </div>
                          <Badge variant={election.type === "National" ? "default" : "secondary"}>
                            {election.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Start Date</p>
                              <p className="font-medium">{election.startDate}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">End Date</p>
                              <p className="font-medium">{election.endDate}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Candidates: {electionCandidates.length}
                            </p>
                          </div>
                          {alreadyVoted ? (
                            <Button disabled className="w-full">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Already Voted
                            </Button>
                          ) : (
                            <Button onClick={() => handleVoteNow(election.id)} className="w-full">
                              <Vote className="mr-2 h-4 w-4" />
                              Vote Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>

          {/* My Votes Tab */}
          <TabsContent value="votes" className="space-y-4">
            {myVotes.length > 0 ? (
              myVotes.map((vote) => (
                <Card key={vote.id} className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{vote.electionTitle}</CardTitle>
                    <CardDescription>Voted on {vote.votedAt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-8 w-8 text-success" />
                      <div>
                        <p className="font-semibold">{vote.candidateName}</p>
                        <p className="text-sm text-muted-foreground">{vote.candidateParty}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="shadow-card">
                <CardContent className="py-12 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No votes cast yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            {results.map((result) => (
              <Card key={result.electionId} className="shadow-card">
                <CardHeader>
                  <CardTitle>{result.electionTitle}</CardTitle>
                  <CardDescription>Total Votes: {result.totalVotes.toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Bar Chart */}
                  <div className="mb-8">
                    <h4 className="font-semibold mb-4">Vote Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={result.candidates}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="votes" fill="hsl(217 91% 35%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie Chart */}
                  <div>
                    <h4 className="font-semibold mb-4">Percentage Share</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={result.candidates}
                          dataKey="percentage"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={(entry) => `${entry.name}: ${entry.percentage}%`}
                        >
                          {result.candidates.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Table */}
                  <div className="mt-8">
                    <h4 className="font-semibold mb-4">Detailed Results</h4>
                    <div className="space-y-2">
                      {result.candidates.map((candidate, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg">
                          <div>
                            <p className="font-medium">{candidate.name}</p>
                            <p className="text-sm text-muted-foreground">{candidate.party}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{candidate.votes.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{candidate.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default VoterDashboard;
