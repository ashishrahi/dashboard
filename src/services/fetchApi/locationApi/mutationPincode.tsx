import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface Country {
  id: number;
  name: string;
  email: string;
}

interface NewCountry {
  name: string;
  email: string;
}

// Fetch Countrys
const fetchCountrys = async (): Promise<Country[]> => {
  try {
    const response = await api.get('/Countrys');
    return response.data;
  } catch (error) {
    console.log('Error fetching Countrys:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

// Fetch Country profile by ID
const fetchCountryProfile = async (id: number): Promise<Country> => {
  try {
    const response = await api.get(`/Countrys/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching Country profile:', error);
    throw error; 
  }
};

// Add Country
const addCountry = async (newCountry: NewCountry): Promise<Country> => {
  try {
    const response = await api.post('/Countrys/Country', newCountry);
    return response.data;
  } catch (error) {
    console.error('Error adding Country:', error);
    throw error; 
  }
};

// Delete Country
const deleteCountry = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Countrys/${id}`);
  } catch (error) {
    console.error('Error deleting Country:', error);
    throw error; 
  }
};

// Update Country
const updateCountry = async (CountryData: Partial<Country>, id: number): Promise<Country> => {
  try {
    const response = await api.patch(`/Countrys/${id}`, CountryData);
    return response.data;
  } catch (error) {
    console.error('Error updating Country:', error);
    throw error; 
  }
};

// Update Country status
const updateCountryStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/Countrys/${id}/status`);
  } catch (error) {
    console.error('Error updating Country status:', error);
    throw error; 
  }
};

// Fetching Countrys query
export const useCountrysQuery = () => {
  return useQuery<Country[]>('Countrys', fetchCountrys);
};

// Country profile mutation
export const useCountryProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchCountryProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('Countrys');
    },
    onError: (err: any) => {
      console.error('Error fetching Country profile:', err);
      alert('Failed to fetch Country profile. Please try again later.');
    }
  });
};

// Add Country mutation
export const useAddCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('Countrys');
    },
    onError: (err: any) => {
      console.error('Error adding Country:', err);
      alert('Failed to add Country. Please try again later.');
    }
  });
};

// Delete Country mutation
export const useDeleteCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('Countrys');
    },
    onError: (err: any) => {
      console.error('Error deleting Country:', err);
      alert('Failed to delete Country. Please try again later.');
    }
  });
};

// Update Country mutation
export const useUpdateCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('Countrys');
    },
    onError: (err: any) => {
      console.error('Error updating Country:', err);
      alert('Failed to update Country. Please try again later.');
    }
  });
};

// Update Country status mutation
export const useUpdateCountryStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCountryStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('Countrys');
    },
    onError: (err: any) => {
      console.error('Error updating Country status:', err);
      alert('Failed to update Country status. Please try again later.');
    }
  });
};
