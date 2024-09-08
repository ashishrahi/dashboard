import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface Driver {
  id: number;
  name: string;
  email: string;
}

interface NewDriver {
  name: string;
  email: string;
}

// Fetch Drivers
const fetchDrivers = async (): Promise<Driver[]> => {
  try {
    const response = await api.get('/Drivers');
    return response.data;
  } catch (error) {
    console.log('Error fetching Drivers:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

// Fetch Driver profile by ID
const fetchDriverProfile = async (id: number): Promise<Driver> => {
  try {
    const response = await api.get(`/Drivers/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching Driver profile:', error);
    throw error; 
  }
};

// Add Driver
const addDriver = async (newDriver: NewDriver): Promise<Driver> => {
  try {
    const response = await api.post('/Drivers/Driver', newDriver);
    return response.data;
  } catch (error) {
    console.error('Error adding Driver:', error);
    throw error; 
  }
};

// Delete Driver
const deleteDriver = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Drivers/${id}`);
  } catch (error) {
    console.error('Error deleting Driver:', error);
    throw error; 
  }
};

// Update Driver
const updateDriver = async (DriverData: Partial<Driver>, id: number): Promise<Driver> => {
  try {
    const response = await api.patch(`/Drivers/${id}`, DriverData);
    return response.data;
  } catch (error) {
    console.error('Error updating Driver:', error);
    throw error; 
  }
};

// Update Driver status
const updateDriverStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/Drivers/${id}/status`);
  } catch (error) {
    console.error('Error updating Driver status:', error);
    throw error; 
  }
};

// Fetching Drivers query
export const useDriversQuery = () => {
  return useQuery<Driver[]>('Drivers', fetchDrivers);
};

// Driver profile mutation
export const useDriverProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchDriverProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('Drivers');
    },
    onError: (err: any) => {
      console.error('Error fetching Driver profile:', err);
      alert('Failed to fetch Driver profile. Please try again later.');
    }
  });
};

// Add Driver mutation
export const useAddDriverMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addDriver, {
    onSuccess: () => {
      queryClient.invalidateQueries('Drivers');
    },
    onError: (err: any) => {
      console.error('Error adding Driver:', err);
      alert('Failed to add Driver. Please try again later.');
    }
  });
};

// Delete Driver mutation
export const useDeleteDriverMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteDriver, {
    onSuccess: () => {
      queryClient.invalidateQueries('Drivers');
    },
    onError: (err: any) => {
      console.error('Error deleting Driver:', err);
      alert('Failed to delete Driver. Please try again later.');
    }
  });
};

// Update Driver mutation
export const useUpdateDriverMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDriver, {
    onSuccess: () => {
      queryClient.invalidateQueries('Drivers');
    },
    onError: (err: any) => {
      console.error('Error updating Driver:', err);
      alert('Failed to update Driver. Please try again later.');
    }
  });
};

// Update Driver status mutation
export const useUpdateDriverStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDriverStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('Drivers');
    },
    onError: (err: any) => {
      console.error('Error updating Driver status:', err);
      alert('Failed to update Driver status. Please try again later.');
    }
  });
};
