import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface Warehouse {
  id: number;
  name: string;
  email: string;
}

interface NewWarehouse {
  name: string;
  email: string;
}

// Fetch Warehouses
const fetchWarehouses = async (): Promise<Warehouse[]> => {
  try {
    const response = await api.get('/Warehouses');
    return response.data;
  } catch (error) {
    console.log('Error fetching Warehouses:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

// Fetch Warehouse profile by ID
const fetchWarehouseProfile = async (id: number): Promise<Warehouse> => {
  try {
    const response = await api.get(`/Warehouses/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching Warehouse profile:', error);
    throw error; 
  }
};

// Add Warehouse
const addWarehouse = async (newWarehouse: NewWarehouse): Promise<Warehouse> => {
  try {
    const response = await api.post('/Warehouses/Warehouse', newWarehouse);
    return response.data;
  } catch (error) {
    console.error('Error adding Warehouse:', error);
    throw error; 
  }
};

// Delete Warehouse
const deleteWarehouse = async (id: number): Promise<void> => {
  try {
    await api.delete(`/Warehouses/${id}`);
  } catch (error) {
    console.error('Error deleting Warehouse:', error);
    throw error; 
  }
};

// Update Warehouse
const updateWarehouse = async (WarehouseData: Partial<Warehouse>, id: number): Promise<Warehouse> => {
  try {
    const response = await api.patch(`/Warehouses/${id}`, WarehouseData);
    return response.data;
  } catch (error) {
    console.error('Error updating Warehouse:', error);
    throw error; 
  }
};

// Update Warehouse status
const updateWarehouseStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/Warehouses/${id}/status`);
  } catch (error) {
    console.error('Error updating Warehouse status:', error);
    throw error; 
  }
};

// Fetching Warehouses query
export const useWarehousesQuery = () => {
  return useQuery<Warehouse[]>('Warehouses', fetchWarehouses);
};

// Warehouse profile mutation
export const useWarehouseProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchWarehouseProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('Warehouses');
    },
    onError: (err: any) => {
      console.error('Error fetching Warehouse profile:', err);
      alert('Failed to fetch Warehouse profile. Please try again later.');
    }
  });
};

// Add Warehouse mutation
export const useAddWarehouseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addWarehouse, {
    onSuccess: () => {
      queryClient.invalidateQueries('Warehouses');
    },
    onError: (err: any) => {
      console.error('Error adding Warehouse:', err);
      alert('Failed to add Warehouse. Please try again later.');
    }
  });
};

// Delete Warehouse mutation
export const useDeleteWarehouseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteWarehouse, {
    onSuccess: () => {
      queryClient.invalidateQueries('Warehouses');
    },
    onError: (err: any) => {
      console.error('Error deleting Warehouse:', err);
      alert('Failed to delete Warehouse. Please try again later.');
    }
  });
};

// Update Warehouse mutation
export const useUpdateWarehouseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWarehouse, {
    onSuccess: () => {
      queryClient.invalidateQueries('Warehouses');
    },
    onError: (err: any) => {
      console.error('Error updating Warehouse:', err);
      alert('Failed to update Warehouse. Please try again later.');
    }
  });
};

// Update Warehouse status mutation
export const useUpdateWarehouseStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWarehouseStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('Warehouses');
    },
    onError: (err: any) => {
      console.error('Error updating Warehouse status:', err);
      alert('Failed to update Warehouse status. Please try again later.');
    }
  });
};
