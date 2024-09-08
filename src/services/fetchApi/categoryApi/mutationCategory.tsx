import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface category {
  id: number;
  name: string;
  email: string;
}

interface Newcategory {
  name: string;
  email: string;
}

// Fetch Categories
const fetchCategories = async (): Promise<category[]> => {
  try {
    const response = await api.get('/Categories');
    return response.data;
  } catch (error) {
    console.log('Error fetching categories:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

// Fetch category detail by ID
const fetchCategoryDetails = async (id: number): Promise<category> => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching category detail:', error);
    throw error; 
  }
};

// Add user
const addCategory = async (newCategory: Newcategory): Promise<category> => {
  try {
    const response = await api.post('/categories/create', newCategory);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; 
  }
};

// Delete Category
const deleteCategory = async (id: number): Promise<void> => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error; 
  }
};

// Update categories
const updateCategory = async (categoryData: Partial<category>, id: number): Promise<category> => {
  try {
    const response = await api.patch(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error updating Category:', error);
    throw error; 
  }
};

// Update Category status
const updateCategoryStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/categories/${id}/status`);
  } catch (error) {
    console.error('Error updating category status:', error);
    throw error; 
  }
};

// Fetching Categories query
export const useCategoriesQuery = () => {
  return useQuery<category[]>('categories', fetchCategories);
};

// User profile mutation
export const useCategoryDetailMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchCategoryDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
    onError: (err: any) => {
      console.error('Error fetching category details:', err);
      alert('Failed to fetch category detail. Please try again later.');
    }
  });
};

// Add user mutation
export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
    onError: (err: any) => {
      console.error('Error adding user:', err);
      alert('Failed to add user. Please try again later.');
    }
  });
};

// Delete category mutation
export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
    onError: (err: any) => {
      console.error('Error deleting category:', err);
      alert('Failed to delete category. Please try again later.');
    }
  });
};

// Update category mutation
export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
    onError: (err: any) => {
      console.error('Error updating category:', err);
      alert('Failed to update user. Please try again later.');
    }
  });
};

// Update Category status mutation
export const useUpdateCategoryStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCategoryStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
    onError: (err: any) => {
      console.error('Error updating user status:', err);
      alert('Failed to update user status. Please try again later.');
    }
  });
};
