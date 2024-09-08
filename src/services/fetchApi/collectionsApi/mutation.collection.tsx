import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface collections {
  id: number;
  name: string;
  email: string;
}

interface Newcollections {
  name: string;
  email: string;
}

// Fetch Collections
const fetchCollections = async (): Promise<collections[]> => {
  try {
    const response = await api.get('/Collections');
    return response.data;
  } catch (error) {
    console.log('Error fetching Collections:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

// Fetch collections detail by ID
const fetchcollectionsDetails = async (id: number): Promise<collections> => {
  try {
    const response = await api.get(`/Collections/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching collections detail:', error);
    throw error; 
  }
};

// Add user
const addcollections = async (newcollections: Newcollections): Promise<collections> => {
  try {
    const response = await api.post('/Collections/create', newcollections);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; 
  }
};

// Delete collections
const deletecollections = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Collections/${id}`);
  } catch (error) {
    console.error('Error deleting collections:', error);
    throw error; 
  }
};

// Update Collections
const updatecollections = async (collectionsData: Partial<collections>, id: number): Promise<collections> => {
  try {
    const response = await api.patch(`/Collections/${id}`, collectionsData);
    return response.data;
  } catch (error) {
    console.error('Error updating collections:', error);
    throw error; 
  }
};

// Update collections status
const updatecollectionsStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/Collections/${id}/status`);
  } catch (error) {
    console.error('Error updating collections status:', error);
    throw error; 
  }
};

// Fetching Collections query
export const useCollectionsQuery = () => {
  return useQuery<collections[]>('Collections', fetchCollections);
};

// User profile mutation
export const usecollectionsDetailMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchcollectionsDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries('Collections');
    },
    onError: (err: any) => {
      console.error('Error fetching collections details:', err);
      alert('Failed to fetch collections detail. Please try again later.');
    }
  });
};

// Add user mutation
export const useAddcollectionsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addcollections, {
    onSuccess: () => {
      queryClient.invalidateQueries('Collections');
    },
    onError: (err: any) => {
      console.error('Error adding user:', err);
      alert('Failed to add user. Please try again later.');
    }
  });
};

// Delete collections mutation
export const useDeletecollectionsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deletecollections, {
    onSuccess: () => {
      queryClient.invalidateQueries('Collections');
    },
    onError: (err: any) => {
      console.error('Error deleting collections:', err);
      alert('Failed to delete collections. Please try again later.');
    }
  });
};

// Update collections mutation
export const useUpdatecollectionsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updatecollections, {
    onSuccess: () => {
      queryClient.invalidateQueries('Collections');
    },
    onError: (err: any) => {
      console.error('Error updating collections:', err);
      alert('Failed to update user. Please try again later.');
    }
  });
};

// Update collections status mutation
export const useUpdatecollectionsStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updatecollectionsStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('Collections');
    },
    onError: (err: any) => {
      console.error('Error updating user status:', err);
      alert('Failed to update user status. Please try again later.');
    }
  });
};
