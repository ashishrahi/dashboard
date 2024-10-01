import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Countries//////////////////

const fetchCountries = async () => {
  try {
    const response = await api.get(`/countries`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching countries:', error);
    
  }

};
//------------- Country by Id

const fetchCountryById = async (id) => {
  try {
    const response = await api.get(`/countries/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching Country by ID:', error);
  }
};

 
///////////////////////////// add Countries ////////////////////////////////


  const addCountry = async (formData) => {
    try {
       const response = await api.post(`/countries/country`,formData);
       console.log(response.data)
       return response.data;
    } 
    catch (error) {
      console.log('Error adding country:', error);
      }};

//////////////////////// fetching of delete Countries /////////////////////////////////



  const deleteCountry = async (id) => {
     try {
      const response = await api.delete(`/countries/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting country:', error);
      
    }
 
  };

/////////////////////// fetching of update of Countries ///////////////////////////////


  const updateCountry = async ({id,values}) => {
    try {
        const response = await api.put(`/countries/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating Country:', error);
       }};

  /////////////////////// fetching of Status of Countries ///////////////////////////////


  const statusCountry = async (id) => {
    try {
      const response = await api.put(`/countries/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating Country status:', error);
    }};


////////////////////////// fetching countries mutations /////////////////////////////////////

 // 
 export const useCountry = () => {
 return useQuery('countries', fetchCountries);
 };


//--------------- Mutation to get Vender by ID


export const useCountryById = (id) => {
  return useQuery(['countries', id], () => fetchCountryById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 //--------------- Add Country Mutations

 
 
 export const useAddCountryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addCountry,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('countries');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding country:', err);
        alert('Failed to add country. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete country Mutations /////////////////////////////////
  

  export const useDeleteMutationCountry = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCountry,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('countries');
      },},
      {
        onError:(err) => {
          console.error('Error deleting country:', err);
          alert('Failed to delete country. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update Country Mutations ///////////////////////////////
  

  
  export const useUpdateMutationCountry = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCountry,{
      onSuccess: () => {
        queryClient.invalidateQueries('countries');
       },
    
      }
    );};

      export const useStatusMutationCountry = () => {
        const queryClient = useQueryClient();
        return useMutation(statusCountry,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('countries');
            },},{
              onError:(err) => {
                console.error('Error updating countries:', err);
                alert('Failed to update countries. Please try again later.');
              }
            });};