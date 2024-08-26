import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface NewUser {
  name: string;
  email: string;
}

// Fetch users
const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.log('Error fetching users:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

// Fetch user profile by ID
const fetchUserProfile = async (id: number): Promise<User> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching user profile:', error);
    throw error; 
  }
};

// Add user
const addUser = async (newUser: NewUser): Promise<User> => {
  try {
    const response = await api.post('/users/user', newUser);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error; 
  }
};

// Delete user
const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; 
  }
};

// Update user
const updateUser = async (userData: Partial<User>, id: number): Promise<User> => {
  try {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
};

// Update user status
const updateUserStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/users/${id}/status`);
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error; 
  }
};

// Fetching users query
export const useUsersQuery = () => {
  return useQuery<User[]>('users', fetchUsers);
};

// User profile mutation
export const useUserProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
    onError: (err: any) => {
      console.error('Error fetching user profile:', err);
      alert('Failed to fetch user profile. Please try again later.');
    }
  });
};

// Add user mutation
export const useAddUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
    onError: (err: any) => {
      console.error('Error adding user:', err);
      alert('Failed to add user. Please try again later.');
    }
  });
};

// Delete user mutation
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
    onError: (err: any) => {
      console.error('Error deleting user:', err);
      alert('Failed to delete user. Please try again later.');
    }
  });
};

// Update user mutation
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
    onError: (err: any) => {
      console.error('Error updating user:', err);
      alert('Failed to update user. Please try again later.');
    }
  });
};

// Update user status mutation
export const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
    onError: (err: any) => {
      console.error('Error updating user status:', err);
      alert('Failed to update user status. Please try again later.');
    }
  });
};
