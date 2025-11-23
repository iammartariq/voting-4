import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { toast } from "sonner";
import { elections as mockElections, candidates as mockCandidates } from "@/data/mockData";

const ElectionContext = createContext();

const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : undefined;

let firebaseApp;
let db;
let auth;
if (Object.keys(firebaseConfig).length > 0 && firebaseConfig.apiKey) {
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
  auth = getAuth(firebaseApp);
}

export const useElection = () => useContext(ElectionContext);

export const ElectionProvider = ({ children }) => {
  const [elections, setElections] = useState(mockElections);
  const [candidates, setCandidates] = useState(mockCandidates);
  
  const [voters, setVoters] = useState([
    { id: 1, name: "Alice Smith", email: "alice@example.com", nid: "1234567890", city: "City A1", area: "Area 1", province: "Province A" },
    { id: 2, name: "Bob Jones", email: "bob@example.com", nid: "0987654321", city: "City B1", area: "Area 5", province: "Province B" }
  ]);

  const [parties, setParties] = useState([
    { id: "p1", name: "Democratic Party", code: "DEM" },
    { id: "p2", name: "Republican Alliance", code: "REP" },
    { id: "p3", name: "Green Future", code: "GRN" },
    { id: "p4", name: "Progressive Front", code: "PRF" }
  ]);
  
  const [voterHistory, setVoterHistory] = useState([]);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!auth || !db) {
        setIsAuthReady(true);
        return;
    }
    const initAuth = async () => {
      try {
        if (initialAuthToken) await signInWithCustomToken(auth, initialAuthToken);
        else await signInAnonymously(auth);
      } catch (error) {
        console.error("Auth Error:", error);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
      setIsAuthReady(true);
    });
    initAuth();
    return () => unsubscribe();
  }, []);

  // --- ADMIN FUNCTIONS ---
  const createElection = async (newElectionData) => {
    const newId = `elec_${Date.now()}`;
    const election = {
      id: newId,
      ...newElectionData,
      status: 'upcoming', 
      createdAt: new Date().toISOString()
    };
    setElections(prev => [...prev, election]);
    toast.success(`Election "${newElectionData.title}" created!`);
    return newId;
  };

  const updateElectionStatus = async (electionId, status) => {
    setElections(prev => prev.map(e => e.id === electionId ? { ...e, status } : e));
    toast.success(`Election status updated to ${status}`);
  };

  const deleteElection = async (electionId) => {
    setElections(prev => prev.filter(e => e.id !== electionId));
    toast.success("Election deleted successfully");
  };

  const deleteVoter = async (voterId) => {
    setVoters(prev => prev.filter(v => v.id !== voterId));
    toast.success("Voter removed from registry");
  };

  const uploadBulkData = async (type, csvContent) => {
    try {
      const rows = csvContent.trim().split('\n').map(row => row.split(','));
      const headers = rows[0];
      const data = rows.slice(1).map(row => {
        const obj = {};
        headers.forEach((header, index) => obj[header.trim()] = row[index]?.trim());
        return obj;
      });
      if (type === 'parties') {
        const newParties = data.map((d, i) => ({ id: `new_party_${i}`, ...d }));
        setParties(prev => [...prev, ...newParties]);
      }
      toast.success(`Successfully processed ${data.length} records for ${type}`);
      return true;
    } catch (error) {
      console.error("CSV Parse Error", error);
      toast.error("Failed to parse CSV file");
      return false;
    }
  };

  // --- CANDIDATE FUNCTIONS ---
  const addCandidate = async (candidateData) => {
    const newId = `cand_${Date.now()}`;
    const newCandidate = {
      id: newId,
      ...candidateData,
      status: 'pending',
      votes: 0
    };
    setCandidates(prev => [...prev, newCandidate]);
    toast.success("Candidate added successfully");
    return newId;
  };

  // --- VOTER FUNCTIONS ---

  const getElectionsForLocation = (province, city, area) => {
    return elections.filter(election => {
      // 1. National: Visible to EVERYONE
      if (election.type === 'National') return true;
      
      // 2. Provincial: Visible only if PROVINCE matches
      if (election.type === 'Provincial') {
        return election.province === province;
      }
      
      // Removed Local Check
      return false;
    });
  };

  const recordVote = async (electionId, candidateId, voterId) => {
    const hasVoted = voterHistory.some(v => v.electionId === electionId && v.voterId === voterId);
    if (hasVoted) {
        toast.error("You have already voted in this election.");
        return false;
    }

    const voteRecord = {
        id: `vote_${Date.now()}`,
        electionId,
        candidateId,
        voterId,
        votedAt: new Date().toLocaleString()
    };

    setVoterHistory(prev => [...prev, voteRecord]);
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, votes: (c.votes || 0) + 1 } : c));
    toast.success("Vote cast successfully!");
    return true;
  };

  const getVoterHistory = (voterId) => {
    return voterHistory.filter(v => v.voterId === voterId);
  };

  const value = {
    elections,
    candidates,
    voters,
    parties,
    isAuthReady,
    userId,
    createElection,
    updateElectionStatus,
    deleteElection,
    deleteVoter,
    uploadBulkData,
    addCandidate,
    recordVote,
    getElectionsForLocation,
    getVoterHistory
  };

  return (
    <ElectionContext.Provider value={value}>
      {isAuthReady ? children : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-muted-foreground">Loading Election System...</p>
        </div>
      )}
    </ElectionContext.Provider>
  );
};

export default ElectionProvider;