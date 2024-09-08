import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface Order {
  id: number;
  name: string;
  email: string;
}

interface NewOrder {
  name: string;
  email: string;
}

// Fetch Orders
const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get('/Orders');
    return response.data;
  } catch (error) {
    console.log('Error fetching Orders:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

// Fetch Order profile by ID
const fetchOrderProfile = async (id: number): Promise<Order> => {
  try {
    const response = await api.get(`/Orders/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching Order profile:', error);
    throw error; 
  }
};

// Add Order
const addOrder = async (newOrder: NewOrder): Promise<Order> => {
  try {
    const response = await api.post('/Orders/Order', newOrder);
    return response.data;
  } catch (error) {
    console.error('Error adding Order:', error);
    throw error; 
  }
};

// Delete Order
const deleteOrder = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Orders/${id}`);
  } catch (error) {
    console.error('Error deleting Order:', error);
    throw error; 
  }
};

// Update Order
const updateOrder = async (OrderData: Partial<Order>, id: number): Promise<Order> => {
  try {
    const response = await api.patch(`/Orders/${id}`, OrderData);
    return response.data;
  } catch (error) {
    console.error('Error updating Order:', error);
    throw error; 
  }
};

// Update Order status
const updateOrderStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/Orders/${id}/status`);
  } catch (error) {
    console.error('Error updating Order status:', error);
    throw error; 
  }
};

// Fetching Orders query
export const useOrdersQuery = () => {
  return useQuery<Order[]>('Orders', fetchOrders);
};

// Order profile mutation
export const useOrderProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchOrderProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('Orders');
    },
    onError: (err: any) => {
      console.error('Error fetching Order profile:', err);
      alert('Failed to fetch Order profile. Please try again later.');
    }
  });
};

// Add Order mutation
export const useAddOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('Orders');
    },
    onError: (err: any) => {
      console.error('Error adding Order:', err);
      alert('Failed to add Order. Please try again later.');
    }
  });
};

// Delete Order mutation
export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('Orders');
    },
    onError: (err: any) => {
      console.error('Error deleting Order:', err);
      alert('Failed to delete Order. Please try again later.');
    }
  });
};

// Update Order mutation
export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('Orders');
    },
    onError: (err: any) => {
      console.error('Error updating Order:', err);
      alert('Failed to update Order. Please try again later.');
    }
  });
};

// Update Order status mutation
export const useUpdateOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrderStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('Orders');
    },
    onError: (err: any) => {
      console.error('Error updating Order status:', err);
      alert('Failed to update Order status. Please try again later.');
    }
  });
};
