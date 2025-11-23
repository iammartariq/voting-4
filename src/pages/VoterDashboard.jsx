import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Vote, LogOut, CheckCircle, Clock, MapPin, 
  Flag, Building, User, Activity, AlertCircle, Calendar 
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useElection } from "@/contexts/ElectionContext";

const VoterDashboard = () => {
  const navigate = useNavigate();
  // CHANGED: Added 'elections' to destructuring to look up titles for history
  const { getElectionsForLocation, getVoterHistory, candidates, elections } = useElection();
  
  const [userLocation, setUserLocation] = useState(null);
  const [relevantElections, setRelevantElections] = useState([]);
  const [history, setHistory] = useState([]);
  const [voterName, setVoterName] = useState("Voter");

  useEffect(() => {
    const storedNid = sessionStorage.getItem("voterNid");
    const storedEmail = sessionStorage.getItem("voterEmail");
    if (!storedNid) navigate("/");
    
    if(storedEmail) setVoterName(storedEmail.split('@')[0]);

    // Get location
    const locStr = sessionStorage.getItem("tempVoterLocation");
    if (locStr) {
        const loc = JSON.parse(locStr);
        setUserLocation(loc);
        const filtered = getElectionsForLocation(loc.province, loc.city, loc.area);
        setRelevantElections(filtered);
    }

    // Load History
    const votes = getVoterHistory(storedNid);
    setHistory(votes);
  }, [elections, candidates]); // Re-run if data updates

  const handleLogout = () => {
    sessionStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleVoteNow = (electionId) => {
    navigate(`/vote/${electionId}`);
  };

  const hasVotedInElection = (electionId) => {
    return history.some(h => h.electionId === electionId);
  };

  const getElectionResults = (electionId) => {
    return candidates
        .filter(c => c.electionId === electionId)
        .sort((a, b) => (b.votes || 0) - (a.votes || 0));
  };

  // --- FILTERING LOGIC ---
  const nationalElections = relevantElections.filter(e => e.type === "National" && e.status === "active");
  const provincialElections = relevantElections.filter(e => e.type === "Provincial" && e.status === "active");
  const resultElections = relevantElections.filter(e => e.status !== "upcoming");

  // --- UI COMPONENTS ---

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card className="shadow-sm border-border/50">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </CardContent>
    </Card>
  );

  const ElectionCard = ({ election, icon: Icon, colorClass }) => {
    const alreadyVoted = hasVotedInElection(election.id);
    
    return (
      <Card className={`group hover:shadow-md transition-all duration-300 border-l-4 ${colorClass}`}>
        <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
                <div className="flex gap-3">
                    <div className={`mt-1 p-2 rounded-lg bg-secondary/30 text-foreground`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <div>
                        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                            {election.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1.5">
                           <Clock className="h-3.5 w-3.5" /> 
                           Ends: {new Date(election.endDate).toLocaleDateString()}
                        </CardDescription>
                    </div>
                </div>
                <Badge className="bg-green-600 hover:bg-green-700">
                    Active
                </Badge>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between gap-4 mt-2">
                <div className="text-sm text-muted-foreground">
                    Scope: <span className="font-medium text-foreground">{election.type}</span>
                </div>
                <Button 
                    onClick={() => handleVoteNow(election.id)} 
                    size="sm"
                    className={`min-w-[120px] transition-all ${alreadyVoted ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : ""}`}
                    disabled={alreadyVoted}
                    variant={alreadyVoted ? "secondary" : "default"}
                >
                    {alreadyVoted ? (
                        <><CheckCircle className="mr-2 h-4 w-4" /> Voted</>
                    ) : (
                        <><Vote className="mr-2 h-4 w-4" /> Vote Now</>
                    )}
                </Button>
            </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background/50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-background border-b border-border/50 pb-8 pt-10">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, <span className="text-primary capitalize">{voterName}</span></h1>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                        <span className="flex items-center gap-1 bg-secondary/50 px-3 py-1 rounded-full border border-border">
                            <MapPin className="h-3.5 w-3.5" /> {userLocation ? `${userLocation.city}, ${userLocation.province}` : 'Location Unknown'}
                        </span>
                        <span className="flex items-center gap-1 bg-secondary/50 px-3 py-1 rounded-full border border-border">
                            <CheckCircle className="h-3.5 w-3.5 text-green-500" /> Verified Voter
                        </span>
                    </div>
                </div>
                <Button variant="outline" onClick={handleLogout} className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50">
                    <LogOut className="h-4 w-4" /> Sign Out
                </Button>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1 space-y-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                title="Active Elections" 
                value={relevantElections.filter(e => e.status === 'active').length} 
                icon={Activity} 
                color="bg-blue-600" 
            />
            <StatCard 
                title="Votes Cast" 
                value={history.length} 
                icon={CheckCircle} 
                color="bg-green-600" 
            />
            <StatCard 
                title="Total Eligible" 
                value={relevantElections.length} 
                icon={Flag} 
                color="bg-purple-500" 
            />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="elections" className="space-y-6">
          <TabsList className="bg-secondary/50 p-1 border border-border/50">
            <TabsTrigger value="elections" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Live Elections</TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Live Results</TabsTrigger>
            <TabsTrigger value="votes" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">Voting History</TabsTrigger>
          </TabsList>

          {/* --- TAB 1: LIVE ELECTIONS --- */}
          <TabsContent value="elections" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            
            {/* National Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Flag className="h-5 w-5 text-blue-600" /> National Elections
                    </h3>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Active
                    </Badge>
                </div>
                {nationalElections.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {nationalElections.map(election => (
                            <ElectionCard 
                                key={election.id} 
                                election={election} 
                                icon={Flag}
                                colorClass="border-l-blue-600"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 bg-secondary/20 rounded-lg border border-dashed border-border">
                        <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No active national elections at this moment.</p>
                    </div>
                )}
            </div>

            {/* Provincial Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border/50 pb-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Building className="h-5 w-5 text-purple-600" /> Provincial Elections
                    </h3>
                    {userLocation && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            {userLocation.province} Only
                        </Badge>
                    )}
                </div>
                {provincialElections.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {provincialElections.map(election => (
                            <ElectionCard 
                                key={election.id} 
                                election={election} 
                                icon={Building}
                                colorClass="border-l-purple-600"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 bg-secondary/20 rounded-lg border border-dashed border-border">
                        <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">No active provincial elections for your region.</p>
                    </div>
                )}
            </div>
          </TabsContent>

          {/* --- TAB 2: LIVE RESULTS --- */}
          <TabsContent value="results" className="space-y-6">
            {resultElections.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {resultElections.map((election) => {
                    const results = getElectionResults(election.id);
                    const totalVotes = results.reduce((sum, c) => sum + (c.votes || 0), 0);
                    
                    return (
                        <Card key={election.id} className="shadow-sm border-border/50">
                            <CardHeader className="pb-2 border-b border-border/30 bg-secondary/10">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base">{election.title}</CardTitle>
                                        <CardDescription className="text-xs">
                                            {election.status === 'active' ? 'Live Vote Count' : 'Final Results'}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={election.status === 'active' ? 'default' : 'secondary'}>{election.status}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-5">
                                    {results.length > 0 ? results.map((candidate, idx) => {
                                        const percentage = totalVotes > 0 ? Math.round(((candidate.votes || 0) / totalVotes) * 100) : 0;
                                        return (
                                            <div key={candidate.id} className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-medium flex items-center gap-2">
                                                        <User className="h-3 w-3 text-muted-foreground" />
                                                        {candidate.name} <span className="text-muted-foreground font-normal text-xs">({candidate.party})</span>
                                                    </span>
                                                    <span className="font-bold">{percentage}%</span>
                                                </div>
                                                <Progress value={percentage} className="h-2" />
                                                <p className="text-xs text-right text-muted-foreground">{candidate.votes || 0} votes</p>
                                            </div>
                                        );
                                    }) : (
                                        <div className="text-center py-4 text-sm text-muted-foreground">
                                            No candidates registered yet.
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6 pt-4 border-t border-border/30 text-center">
                                    <p className="text-xs text-muted-foreground">Total Votes Cast: <span className="font-medium text-foreground">{totalVotes}</span></p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No election data available to display.</p>
                </div>
            )}
          </TabsContent>

          {/* --- TAB 3: VOTING HISTORY (DETAILED) --- */}
          <TabsContent value="votes" className="space-y-4">
            {history.length > 0 ? (
                <div className="space-y-4">
                    {history.map((vote) => {
                        // LOOKUP ELECTION AND CANDIDATE DETAILS
                        const votedElection = elections.find(e => e.id === vote.electionId);
                        const votedCandidate = candidates.find(c => c.id === vote.candidateId);
                        
                        return (
                            <Card key={vote.id} className="shadow-sm border-border/50 hover:shadow-md transition-shadow">
                                <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    
                                    {/* Candidate Image/Icon */}
                                    <div className="flex-shrink-0">
                                        {votedCandidate?.image ? (
                                            <img src={votedCandidate.image} alt={votedCandidate.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center border-2 border-border">
                                                <User className="h-6 w-6 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-bold text-lg text-foreground">
                                            {votedElection ? votedElection.title : "Unknown Election"}
                                        </h4>
                                        <div className="flex flex-wrap gap-2 text-sm">
                                            <span className="text-muted-foreground">Voted For:</span>
                                            <span className="font-medium text-primary">
                                                {votedCandidate ? votedCandidate.name : "Unknown Candidate"}
                                            </span>
                                            {votedCandidate?.party && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {votedCandidate.party}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Timestamp & Status */}
                                    <div className="text-left sm:text-right mt-2 sm:mt-0 w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end border-t sm:border-t-0 border-border/50 pt-3 sm:pt-0">
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1 mb-0 sm:mb-1">
                                            <CheckCircle className="h-3 w-3" /> Confirmed
                                        </Badge>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {vote.votedAt}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Card>
                    <CardContent className="py-16 text-center">
                        <div className="bg-secondary/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No Voting History</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto mt-2">
                            You haven't participated in any elections yet. Active elections will appear in the "Live Elections" tab.
                        </p>
                    </CardContent>
                </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default VoterDashboard;