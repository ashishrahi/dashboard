import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Pincodes //////////////////

const fetchPincodes = async () => {
  try {
    const response = await api.get(`/pincodes`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching pincodes:', error);
    
  }};


//------------- Pincode by Id

const fetchPincodeById = async (id) => {
  try {
    const response = await api.get(`/pincodes/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching Pincode by ID:', error);
  }
};

 
///////////////////////////// add Pincodes ////////////////////////////////


  const addPincode = async (values) => {
    try {
       const response = await api.post(`/pincodes/pincode`,values);
       console.log(response.data)
       return response.data;
    } 
    catch (error) {
      console.log('Error adding pincode:', error);
      }};

//////////////////////// fetching of delete Pincode /////////////////////////////////



  const deletePincode = async (id) => {
     try {
      const response = await api.delete(`/pincodes/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting pincode:', error);
      
    }
 
  };

/////////////////////// fetching of update of Pincodes ///////////////////////////////


  const updatePincode = async ({id,values}) => {
    try {
        const response = await api.put(`/pincodes/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating Pincode:', error);
       }};

  /////////////////////// fetching of Status of Pincodes ///////////////////////////////


  const statusPincode = async (id) => {
    try {
      const response = await api.put(`/pincodes/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating Pincode status:', error);
    }};


////////////////////////// fetching Pincode mutations /////////////////////////////////////

 // 
 export const usePincodes = () => {
 return useQuery('pincodes', fetchPincodes);
 };



//--------------- Mutation to get Pincode by ID


export const usePincodeById = (id) => {
  return useQuery(['pincodes', id], () => fetchPincodeById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 //--------------- Add Pincode Mutations

 
 
 export const useAddPincodeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addPincode,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('pincodes');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding pincode:', err);
        alert('Failed to add pincode. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete pincode Mutations /////////////////////////////////
  

  export const useDeleteMutationPincode = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePincode,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('pincodes');
      },},
      {
        onError:(err) => {
          console.error('Error deleting Pincode:', err);
          alert('Failed to delete pincode. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update Pincode Mutations ///////////////////////////////
  

  
  export const useUpdateMutationPincode = () => {
  const queryClient = useQueryClient();

  return useMutation(updatePincode,{
      onSuccess: () => {
        queryClient.invalidateQueries('pincodes');
       },
    
      }
    );};

      export const useStatusMutationPincode = () => {
        const queryClient = useQueryClient();
        return useMutation(statusPincode,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('pincodes');
            },},{
              onError:(err) => {
                console.error('Error updating pincodes:', err);
                alert('Failed to update pincodes. Please try again later.');
              }
            });};