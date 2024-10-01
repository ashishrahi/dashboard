import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Cities //////////////////

const fetchCities = async () => {
  try {
    const response = await api.get(`/cities`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching cities:', error);
    
  }};


//------------- City by Id

const fetchCityById = async (id) => {
  try {
    const response = await api.get(`/cities/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching City by ID:', error);
  }
};

 
///////////////////////////// add Cities ////////////////////////////////


  const addCity = async (cityname) => {
    try {
       const response = await api.post(`/cities/city`,cityname);
       console.log(response.data)
       return response.data;
    } 
    catch (error) {
      console.log('Error adding city:', error);
      }};

//////////////////////// fetching of delete Cities /////////////////////////////////



  const deleteCity = async (id) => {
     try {
      const response = await api.delete(`/cities/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting city:', error);
      
    }
 
  };

/////////////////////// fetching of update of Cities ///////////////////////////////


  const updateCity = async ({id,values}) => {
    try {
        const response = await api.put(`/cities/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating State:', error);
       }};

  /////////////////////// fetching of Status of Cities ///////////////////////////////


  const statusCity = async (id) => {
    try {
      const response = await api.put(`/cities/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating City status:', error);
    }};


////////////////////////// fetching City mutations /////////////////////////////////////

 // 
 export const useCities = () => {
 return useQuery('cities', fetchCities);
 };



//--------------- Mutation to get City by ID


export const useCityById = (id) => {
  return useQuery(['cities', id], () => fetchCityById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 //--------------- Add City Mutations

 
 
 export const useAddCityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addCity,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cities');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding city:', err);
        alert('Failed to add city. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete city Mutations /////////////////////////////////
  

  export const useDeleteMutationCity = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCity,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('cities');
      },},
      {
        onError:(err) => {
          console.error('Error deleting city:', err);
          alert('Failed to delete city. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update City Mutations ///////////////////////////////
  

  
  export const useUpdateMutationCity = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCity,{
      onSuccess: () => {
        queryClient.invalidateQueries('cities');
       },
    
      }
    );};

      export const useStatusMutationCity = () => {
        const queryClient = useQueryClient();
        return useMutation(statusCity,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('cities');
            },},{
              onError:(err) => {
                console.error('Error updating cities:', err);
                alert('Failed to update cities. Please try again later.');
              }
            });};