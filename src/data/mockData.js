// Mock data for the voting system

export const elections = [
  {
    id: 1,
    title: "National Presidential Election 2024",
    type: "National",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    status: "active",
    description: "Election for the President of the country"
  },
  {
    id: 2,
    title: "Provincial Governor Election 2024",
    type: "Provincial",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    status: "active",
    description: "Election for Provincial Governor"
  },
  {
    id: 3,
    title: "National Parliamentary Election 2023",
    type: "National",
    startDate: "2023-11-01",
    endDate: "2023-11-15",
    status: "completed",
    description: "Election for National Parliament Members"
  }
];

export const candidates = [
  {
    id: 1,
    electionId: 1,
    name: "John Smith",
    party: "Democratic Alliance",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    age: 52,
    experience: "Former Senator, 15 years in politics",
    manifesto: "Focus on economic growth and education reform"
  },
  {
    id: 2,
    electionId: 1,
    name: "Sarah Johnson",
    party: "Progressive Party",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    age: 48,
    experience: "State Governor, 12 years in public service",
    manifesto: "Healthcare for all and environmental protection"
  },
  {
    id: 3,
    electionId: 1,
    name: "Michael Brown",
    party: "Independent Coalition",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    age: 55,
    experience: "Business leader and philanthropist",
    manifesto: "Economic stability and anti-corruption measures"
  },
  {
    id: 4,
    electionId: 2,
    name: "Emily Davis",
    party: "Regional Development Party",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    age: 45,
    experience: "City Mayor, 8 years in local government",
    manifesto: "Infrastructure development and job creation"
  },
  {
    id: 5,
    electionId: 2,
    name: "Robert Wilson",
    party: "Democratic Alliance",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    age: 50,
    experience: "Provincial council member, 10 years",
    manifesto: "Education and healthcare improvement"
  }
];

export const voters = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice@example.com",
    nid: "1234567890",
    dateOfBirth: "1990-05-15",
    address: "123 Main St, City",
    registrationDate: "2024-01-10"
  },
  {
    id: 2,
    name: "Bob Martin",
    email: "bob@example.com",
    nid: "2345678901",
    dateOfBirth: "1985-08-22",
    address: "456 Oak Ave, Town",
    registrationDate: "2024-01-12"
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    nid: "3456789012",
    dateOfBirth: "1992-03-30",
    address: "789 Pine Rd, Village",
    registrationDate: "2024-01-15"
  }
];

// Store votes - maps NID to election ID to prevent double voting
export let votesRecord = {
  "1234567890": [1], // Alice has voted in election 1
  "2345678901": [1, 2] // Bob has voted in both elections
};

export const myVotes = [
  {
    id: 1,
    electionId: 1,
    electionTitle: "National Presidential Election 2024",
    candidateId: 1,
    candidateName: "John Smith",
    candidateParty: "Democratic Alliance",
    votedAt: "2024-03-05 10:30 AM"
  }
];

export const results = [
  {
    electionId: 1,
    electionTitle: "National Presidential Election 2024",
    totalVotes: 15000,
    candidates: [
      { name: "John Smith", party: "Democratic Alliance", votes: 6500, percentage: 43.3 },
      { name: "Sarah Johnson", party: "Progressive Party", votes: 5200, percentage: 34.7 },
      { name: "Michael Brown", party: "Independent Coalition", votes: 3300, percentage: 22.0 }
    ]
  },
  {
    electionId: 2,
    electionTitle: "Provincial Governor Election 2024",
    totalVotes: 8500,
    candidates: [
      { name: "Emily Davis", party: "Regional Development Party", votes: 4800, percentage: 56.5 },
      { name: "Robert Wilson", party: "Democratic Alliance", votes: 3700, percentage: 43.5 }
    ]
  },
  {
    electionId: 3,
    electionTitle: "National Parliamentary Election 2023",
    totalVotes: 25000,
    candidates: [
      { name: "Various Candidates", party: "Democratic Alliance", votes: 10000, percentage: 40.0 },
      { name: "Various Candidates", party: "Progressive Party", votes: 8500, percentage: 34.0 },
      { name: "Various Candidates", party: "Other Parties", votes: 6500, percentage: 26.0 }
    ]
  }
];

// Function to check if voter has already voted in an election
export const hasVoted = (nid, electionId) => {
  return votesRecord[nid]?.includes(electionId) || false;
};

// Function to record a vote
export const recordVote = (nid, electionId) => {
  if (!votesRecord[nid]) {
    votesRecord[nid] = [];
  }
  if (!votesRecord[nid].includes(electionId)) {
    votesRecord[nid].push(electionId);
    return true;
  }
  return false;
};

// Mock admin credentials
export const adminCredentials = {
  email: "admin@voting.com",
  password: "admin123"
};

// Mock voter credentials (for demo - NID as password)
export const voterCredentials = voters.map(voter => ({
  email: voter.email,
  nid: voter.nid
}));
