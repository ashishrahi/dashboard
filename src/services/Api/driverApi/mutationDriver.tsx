import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Drivers //////////////////

const fetchDrivers = async () => {
  try {
    const response = await api.get(`/drivers`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching drivers:', error);
    
  }

};
//////////////////////////////  Driver by Id  //////////////////////////////////////////////

const fetchDriverById = async (id) => {
  try {
    const response = await api.get(`/Drivers/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching Drivers by ID:', error);
  }
};

 
///////////////////////////// add Drivers ////////////////////////////////


  const addDriver = async (formData) => {
    console.log(formData)
    try {
       const response = await api.post(`/drivers/driver`,formData);
       return response.data;
    } 
    catch (error) {
      console.log('Error adding Drivers:', error);
      }};

//////////////////////// fetching of delete drivers /////////////////////////////////



  const deleteDriver = async (id) => {
     try {
      const response = await api.delete(`/drivers/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting drivers:', error);
      
    }
 
  };

/////////////////////// fetching of update of Drivers ///////////////////////////////


  const updateDriver = async ({id,values}) => {
    try {
        const response = await api.put(`/drivers/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating Drivers:', error);
       }};

  /////////////////////// fetching of Status of Drivers ///////////////////////////////


  const statusDriver = async (id) => {
    try {
      const response = await api.put(`/drivers/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating Drivers status:', error);
    }};


////////////////////////// fetching drivers mutations /////////////////////////////////////

 // 
 export const useDriver = () => {
 return useQuery('drivers', fetchDrivers);
 };


///////////////////   Mutation to get Driver by ID //////////////////////////////////


export const useDriverById = (id) => {
  return useQuery(['drivers', id], () => fetchDriverById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 ///////////////////////////  Add Drivers Mutations  //////////////////////////////////////////////////////////////////

 
 
 export const useAddDriverMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addDriver,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('drivers');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding driver:', err);
        alert('Failed to add driver. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete driver Mutations /////////////////////////////////
  

  export const useDeleteMutationDriver = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteDriver,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('drivers');
      },},
      {
        onError:(err) => {
          console.error('Error deleting driver:', err);
          alert('Failed to delete driver. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update driver Mutations ///////////////////////////////
  

  
  export const useUpdateMutationDriver = () => {
  const queryClient = useQueryClient();

  return useMutation(updateDriver,{
      onSuccess: () => {
        queryClient.invalidateQueries('drivers');
       },
    
      }
    );};
  //////////////////////////////// update driver Mutations ///////////////////////////////

      export const useStatusMutationDriver= () => {
        const queryClient = useQueryClient();
        return useMutation(statusDriver,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('drivers');
            },},{
              onError:(err) => {
                console.error('Error updating drivers:', err);
                alert('Failed to update drivers. Please try again later.');
              }
            });};