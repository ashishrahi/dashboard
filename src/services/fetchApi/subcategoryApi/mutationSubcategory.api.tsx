import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface Subcategory {
  id: number;
  name: string;
  email: string;
}

interface NewSubcategory {
  name: string;
  email: string;
}

// Fetch Subcategorys
const fetchSubcategorys = async (): Promise<Subcategory[]> => {
  try {
    const response = await api.get('/Subcategorys');
    return response.data;
  } catch (error) {
    console.log('Error fetching Subcategorys:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

// Fetch Subcategory profile by ID
const fetchSubcategoryProfile = async (id: number): Promise<Subcategory> => {
  try {
    const response = await api.get(`/Subcategorys/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching Subcategory profile:', error);
    throw error; 
  }
};

// Add Subcategory
const addSubcategory = async (newSubcategory: NewSubcategory): Promise<Subcategory> => {
  try {
    const response = await api.post('/Subcategorys/Subcategory', newSubcategory);
    return response.data;
  } catch (error) {
    console.error('Error adding Subcategory:', error);
    throw error; 
  }
};

// Delete Subcategory
const deleteSubcategory = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Subcategorys/${id}`);
  } catch (error) {
    console.error('Error deleting Subcategory:', error);
    throw error; 
  }
};

// Update Subcategory
const updateSubcategory = async (SubcategoryData: Partial<Subcategory>, id: number): Promise<Subcategory> => {
  try {
    const response = await api.patch(`/Subcategorys/${id}`, SubcategoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating Subcategory:', error);
    throw error; 
  }
};

// Update Subcategory status
const updateSubcategoryStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/Subcategorys/${id}/status`);
  } catch (error) {
    console.error('Error updating Subcategory status:', error);
    throw error; 
  }
};

// Fetching Subcategorys query
export const useSubcategorysQuery = () => {
  return useQuery<Subcategory[]>('Subcategorys', fetchSubcategorys);
};

// Subcategory profile mutation
export const useSubcategoryProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchSubcategoryProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('Subcategorys');
    },
    onError: (err: any) => {
      console.error('Error fetching Subcategory profile:', err);
      alert('Failed to fetch Subcategory profile. Please try again later.');
    }
  });
};

// Add Subcategory mutation
export const useAddSubcategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addSubcategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('Subcategorys');
    },
    onError: (err: any) => {
      console.error('Error adding Subcategory:', err);
      alert('Failed to add Subcategory. Please try again later.');
    }
  });
};

// Delete Subcategory mutation
export const useDeleteSubcategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSubcategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('Subcategorys');
    },
    onError: (err: any) => {
      console.error('Error deleting Subcategory:', err);
      alert('Failed to delete Subcategory. Please try again later.');
    }
  });
};

// Update Subcategory mutation
export const useUpdateSubcategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSubcategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('Subcategorys');
    },
    onError: (err: any) => {
      console.error('Error updating Subcategory:', err);
      alert('Failed to update Subcategory. Please try again later.');
    }
  });
};

// Update Subcategory status mutation
export const useUpdateSubcategoryStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSubcategoryStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('Subcategorys');
    },
    onError: (err: any) => {
      console.error('Error updating Subcategory status:', err);
      alert('Failed to update Subcategory status. Please try again later.');
    }
  });
};
