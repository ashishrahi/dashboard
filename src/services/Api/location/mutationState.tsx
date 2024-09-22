import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch States//////////////////

const fetchStates = async () => {
  try {
    const response = await api.get(`/states`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching states:', error);
    
  }};

////////////////////////////   CountryList //////////////////

const fetchCountryList = async () => {
  try {
    const response = await api.get(`/countries/country/list`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching countrylist:', error);
    
  }};





//------------- State by Id

const fetchStateById = async (id) => {
  try {
    const response = await api.get(`/states/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching State by ID:', error);
  }
};

 
///////////////////////////// add States ////////////////////////////////


  const addState = async (statename) => {
    try {
       const response = await api.post(`/states/state`,statename);
       console.log(response.data)
       return response.data;
    } 
    catch (error) {
      console.log('Error adding state:', error);
      }};

//////////////////////// fetching of delete States /////////////////////////////////



  const deleteState = async (id) => {
     try {
      const response = await api.delete(`/states/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting state:', error);
      
    }
 
  };

/////////////////////// fetching of update of States ///////////////////////////////


  const updateState = async ({id,values}) => {
    try {
        const response = await api.put(`/states/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating State:', error);
       }};

  /////////////////////// fetching of Status of States ///////////////////////////////


  const statusState = async (id) => {
    try {
      const response = await api.put(`/states/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating Country status:', error);
    }};


////////////////////////// fetching states mutations /////////////////////////////////////

 // 
 export const useStates = () => {
 return useQuery('states', fetchStates);
 };

////////////////////////// fetching countrylist mutations /////////////////////////////////////

 // 
 export const useCountriesList = () => {
  return useQuery('countries', fetchCountryList);
  };





//--------------- Mutation to get State by ID


export const useStateById = (id) => {
  return useQuery(['states', id], () => fetchStateById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 //--------------- Add State Mutations

 
 
 export const useAddStateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addState,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('states');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding state:', err);
        alert('Failed to add state. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete state Mutations /////////////////////////////////
  

  export const useDeleteMutationState = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteState,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('states');
      },},
      {
        onError:(err) => {
          console.error('Error deleting state:', err);
          alert('Failed to delete state. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update State Mutations ///////////////////////////////
  

  
  export const useUpdateMutationState = () => {
  const queryClient = useQueryClient();

  return useMutation(updateState,{
      onSuccess: () => {
        queryClient.invalidateQueries('states');
       },
    
      }
    );};

      export const useStatusMutationState = () => {
        const queryClient = useQueryClient();
        return useMutation(statusState,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('states');
            },},{
              onError:(err) => {
                console.error('Error updating states:', err);
                alert('Failed to update states. Please try again later.');
              }
            });};