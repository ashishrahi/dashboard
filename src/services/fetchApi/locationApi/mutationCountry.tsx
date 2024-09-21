import { useQuery, useQueryClient, useMutation } from 'react-query';
import api from '../../../utilities/Api';
import { useNavigate } from 'react-router-dom';

// Define types for your data
interface Country {
  id: string;
countryname:string;
}

interface AddCountryFormData {
  // Define properties required for adding a Country
}

////////////////////////////fetch Countries //////////////////

const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await api.get('/countries');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error; // Rethrow to ensure the query fails
  }
};

//------------- Country by Id

const fetchCountryById = async (id: string): Promise<Country> => {
  try {
    const response = await api.get(`/countries/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Countries by ID:', error);
    throw error; // Rethrow to ensure the query fails
  }
};

///////////////////////////// add Countries ////////////////////////////////

const addCountry = async (countryname: AddCountryFormData): Promise<Country> => {
  try {
    const response = await api.post('/countries/country', countryname);
    return response.data;
  } catch (error) {
    console.error('Error adding country:', error);
    throw error; // Rethrow to ensure the mutation fails
  }
};

//////////////////////// fetching of delete Countries /////////////////////////////////

const deleteCountry = async (id: string): Promise<void> => {
  try {
    await api.delete(`/countries/${id}`);
  } catch (error) {
    console.error('Error deleting country:', error);
    throw error; // Rethrow to ensure the mutation fails
  }
};

///////////////////////  update of Countries ///////////////////////////////

const updateCountry = async ({ id, values }: { id: string; countryname: AddCountryFormData }): Promise<Karigar> => {
  try {
    console.log(values);
    const response = await api.put(`/countries/${id}`, values);
    return response.data;
  } catch (error) {
    console.error('Error updating countries:', error);
    throw error; // Rethrow to ensure the mutation fails
  }
};

/////////////////////// fetching of Status of Countries ///////////////////////////////

const statusCountry = async (id: string): Promise<void> => {
  try {
    await api.put(`/countries/${id}/status`);
  } catch (error) {
    console.error('Error updating country status:', error);
    throw error; // Rethrow to ensure the mutation fails
  }
};

////////////////////////// fetching countries mutations /////////////////////////////////////

export const useCountry = () => {
  return useQuery<Country[], Error>('countries', fetchCountries);
};

//--------------- Mutation to get Country by ID

export const useCountryById = (id: string) => {
  return useQuery<Country, Error>(['countries', id], () => fetchCountryById(id), {
    enabled: !!id, // Ensure the query is only enabled if there's an id
  });
};

//--------------- Add country Mutations

export const useAddCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Country, Error, AddCountryFormData>(addCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('countries');
    },
    onError: (err) => {
      console.error('Error adding country:', err);
      alert('Failed to add country. Please try again later.');
    },
  });
};

/////////////////////////// delete country Mutations /////////////////////////////////

export const useDeleteMutationCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>(deleteCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('countries');
    },
    onError: (err) => {
      console.error('Error deleting country:', err);
      alert('Failed to delete country. Please try again later.');
    },
  });
};

////////////////////////////// update Country Mutations ///////////////////////////////

export const useUpdateMutationCountry = () => {
  const queryClient = useQueryClient();

  return useMutation<Country, Error, { id: string; formData: AddCountryFormData }>(updateCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('countries');
    },
  });
};

export const useStatusMutationCountry = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>(statusCountry, {
    onSuccess: () => {
      queryClient.invalidateQueries('countries');
    },
    onError: (err) => {
      console.error('Error updating country status:', err);
      alert('Failed to update country status. Please try again later.');
    },
  });
};
