import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface Finance {
  id: number;
  name: string;
  email: string;
}

interface NewFinance {
  name: string;
  email: string;
}

// Fetch Finances
const fetchFinances = async (): Promise<Finance[]> => {
  try {
    const response = await api.get('/Finances');
    return response.data;
  } catch (error) {
    console.log('Error fetching Finances:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

// Fetch Finance profile by ID
const fetchFinanceProfile = async (id: number): Promise<Finance> => {
  try {
    const response = await api.get(`/Finances/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching Finance profile:', error);
    throw error; 
  }
};

// Add Finance
const addFinance = async (newFinance: NewFinance): Promise<Finance> => {
  try {
    const response = await api.post('/Finances/Finance', newFinance);
    return response.data;
  } catch (error) {
    console.error('Error adding Finance:', error);
    throw error; 
  }
};

// Delete Finance
const deleteFinance = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Finances/${id}`);
  } catch (error) {
    console.error('Error deleting Finance:', error);
    throw error; 
  }
};

// Update Finance
const updateFinance = async (FinanceData: Partial<Finance>, id: number): Promise<Finance> => {
  try {
    const response = await api.patch(`/Finances/${id}`, FinanceData);
    return response.data;
  } catch (error) {
    console.error('Error updating Finance:', error);
    throw error; 
  }
};

// Update Finance status
const updateFinanceStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/Finances/${id}/status`);
  } catch (error) {
    console.error('Error updating Finance status:', error);
    throw error; 
  }
};

// Fetching Finances query
export const useFinancesQuery = () => {
  return useQuery<Finance[]>('Finances', fetchFinances);
};

// Finance profile mutation
export const useFinanceProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchFinanceProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('Finances');
    },
    onError: (err: any) => {
      console.error('Error fetching Finance profile:', err);
      alert('Failed to fetch Finance profile. Please try again later.');
    }
  });
};

// Add Finance mutation
export const useAddFinanceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addFinance, {
    onSuccess: () => {
      queryClient.invalidateQueries('Finances');
    },
    onError: (err: any) => {
      console.error('Error adding Finance:', err);
      alert('Failed to add Finance. Please try again later.');
    }
  });
};

// Delete Finance mutation
export const useDeleteFinanceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFinance, {
    onSuccess: () => {
      queryClient.invalidateQueries('Finances');
    },
    onError: (err: any) => {
      console.error('Error deleting Finance:', err);
      alert('Failed to delete Finance. Please try again later.');
    }
  });
};

// Update Finance mutation
export const useUpdateFinanceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateFinance, {
    onSuccess: () => {
      queryClient.invalidateQueries('Finances');
    },
    onError: (err: any) => {
      console.error('Error updating Finance:', err);
      alert('Failed to update Finance. Please try again later.');
    }
  });
};

// Update Finance status mutation
export const useUpdateFinanceStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateFinanceStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('Finances');
    },
    onError: (err: any) => {
      console.error('Error updating Finance status:', err);
      alert('Failed to update Finance status. Please try again later.');
    }
  });
};
