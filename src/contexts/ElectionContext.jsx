import { createContext, useContext, useState, useEffect } from 'react';
import client from '@/api/client';
import { toast } from "sonner";
import { useAuth } from './AuthContext';

const ElectionContext = createContext();

export const useElection = () => useContext(ElectionContext);

export const ElectionProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [elections, setElections] = useState([]);
  const [voterHistory, setVoterHistory] = useState([]);
  
  const refreshData = async () => {
    try {
      const res = await client.get('/public/elections');
      setElections(res.data || []);
    } catch (error) {
      console.error("Data fetch error:", error);
    }
  };

  useEffect(() => { refreshData(); }, []);

  // Admin: Create Election
  const createElection = async (data) => {
    try {
      await client.post('/admin/elections/addSession', {
        name: data.title,
        startDate: data.startDate,
        endDate: data.endDate,
        seatType: data.type,
        Province: data.province
      });
      toast.success("Election created successfully");
      refreshData();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create election");
    }
  };

  // Admin: End Election
  const endElection = async (electionId) => {
    try {
      await client.post(`/admin/end-election/${electionId}`);
      toast.success("Election ended and results processed!");
      refreshData();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to end election");
    }
  };

  // Admin: Verify Integrity
  const verifyIntegrity = async (electionId) => {
    try {
      const res = await client.get(`/admin/verify/integrity/${electionId}`);
      return res.data; 
    } catch (error) {
      toast.error("Verification check failed");
      return null;
    }
  };

  // Admin: Bulk Upload
  const uploadBulkData = async (type, csvContent) => {
    try {
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const formData = new FormData();
      formData.append('file', blob, 'upload.csv');

      const endpoints = {
        'provinces': '/admin/province/upload-csv',
        'cities': '/admin/cities/upload-csv',
        'areas': '/admin/area/upload-csv',
        'constituencies': '/admin/constituencies/upload-csv',
        'parties': '/admin/party/upload-csv'
      };

      if (!endpoints[type]) return;

      await client.post(endpoints[type], formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success(`${type} uploaded successfully`);
    } catch (error) {
      toast.error(error.response?.data?.error || "Upload failed");
    }
  };

  // Party: Add Candidate
  const addCandidate = async (formData) => {
    try {
      const data = new FormData();
      // Complex nested JSON required by candidateC.js
      const userData = {
        name: formData.name,
        email: formData.email,
        cnic: formData.cnic,
        password: "defaultCandidatePass", // Placeholder
        province: formData.province,
        city: formData.city,
        area: formData.area
      };
      const candidateData = {
        partyId: user.id,
        manifesto: "Committed to service"
      };

      data.append('UserData', JSON.stringify(userData));
      data.append('Candidate', JSON.stringify(candidateData));
      if (formData.imageFile) data.append('image', formData.imageFile);

      await client.post('/parties/create/candidate', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Candidate added successfully");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add candidate");
    }
  };

  // Voter: Record Vote
  const recordVote = async (electionId, candidateParticipatingId) => {
    try {
      await client.post('/users/cast/vote', {
        electionId: parseInt(electionId),
        candidateParticipatingId: parseInt(candidateParticipatingId)
      });
      toast.success("Vote cast successfully!");
      // Update local history manually or refetch
      const res = await client.get('/users/voting/history');
      setVoterHistory(res.data);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to cast vote");
      return false;
    }
  };

  return (
    <ElectionContext.Provider value={{
      elections,
      voterHistory,
      createElection,
      endElection,
      verifyIntegrity,
      uploadBulkData,
      addCandidate,
      recordVote,
      refreshData
    }}>
      {children}
    </ElectionContext.Provider>
  );
};

export default ElectionProvider;