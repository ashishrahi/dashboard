import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';

interface Country {
  id: number;
  countryname: string;
  }

interface NewCountry {
  countryname: string;
}

///////////////////////////////  Fetch Countries ///////////////////////////////////////////////////////////

const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await api.get(`/countries`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('Error fetching Countries:', error);
    throw error; // Rethrow the error for react-query to handle
  }
};

////////////////////////////////// Fetch Country by ID //////////////////////////////////////////////////////////////////

const fetchCountryById= async (id: number): Promise<Country> => {
  try {
    console.log(id)
    const response = await api.get(`/countries/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching Country profile:', error);
    throw error; 
  }
};

///////////////////////////////////// Add Country //////////////////////////////////////////////////////////

const addCountry = async (countryname: NewCountry): Promise<Country> => {
  try {
    const response = await api.post('/countries/country', countryname);
    return response.data;
  } catch (error) {
    console.error('Error adding Country:', error);
    throw error; 
  }
};

//////////////////////////////////  Delete Country  //////////////////////////////////////////////////////////////////

const deleteCountry = async (id: number): Promise<void> => {
  try {
    await api.delete(`/countries/${id}`);
  } catch (error) {
    console.error('Error deleting Country:', error);
    throw error; 
  }
};

///////////////////////////////////  Update Country //////////////////////////////////////////////////////////////////

const updateCountry = async (countryname: Partial<Country>, id: number): Promise<Country> => {
  try {
    
    const response = await api.put(`/countries/${id}`, countryname);
    return response.data;
  } catch (error) {
    console.error('Error updating Country:', error);
    throw error; 
  }
};

///////////////////////////////// Update Country status ////////////////////////////////////////////////////////////////

const updateCountryStatus = async (id: number): Promise<void> => {
  try {
    await api.put(`/countries/${id}/status`);
  } catch (error) {
    console.error('Error updating Country status:', error);
    throw error; 
  }
};

/////////////////////////////  Mutation Countries  //////////////////////////////////////////////////////////

export const useCountriesQuery = () => {
  return useQuery<Country[]>('countries', fetchCountries);
};

/////////////////////////////////  Country Id mutation //////////////////////////////////////////////////

export const useCountryByIdMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchCountryById, {
    onSuccess: () => {
      queryClient.invalidateQueries('countries');
    },
    onError: (err: any) => {
      console.error('Error fetching Country profile:', err);
      alert('Failed to fetch Country profile. Please try again later.');
    }
  });
};

////////////////////////////////// Add Country mutation //////////////////////////////////////////////////////////////////

export const useAddCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('countries');
    },
    onError: (err: any) => {
      console.error('Error adding Country:', err);
      alert('Failed to add Country. Please try again later.');
    }
  });
};

//////////////////////////////////  Delete Country mutation //////////////////////////////////////////////////////////////////

export const useDeleteCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('countries');
    },
    onError: (err: any) => {
      console.error('Error deleting Country:', err);
      alert('Failed to delete Country. Please try again later.');
    }
  });
};

///////////////////////////////////  Update Country mutation //////////////////////////////////////////////////////////////////

export const useUpdateCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('countries');
    },
    onError: (err: any) => {
      console.error('Error updating Country:', err);
      alert('Failed to update Country. Please try again later.');
    }
  });
};

////////////////////////////////  Update Country status mutation //////////////////////////////////////////////////////////////////

export const useUpdateCountryStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCountryStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries('countries');
    },
    onError: (err: any) => {
      console.error('Error updating Country status:', err);
      alert('Failed to update Country status. Please try again later.');
    }
  });
};
