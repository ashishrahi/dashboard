import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Financedepart //////////////////

const fetchFinancedepart = async () => {
  try {
    const response = await api.get(`/financedeparts`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching financedeparts:', error);
    
  }

};
//////////////////////////////  Financedepart by Id  //////////////////////////////////////////////

const fetchFinancedepartById = async (id) => {
  try {
    const response = await api.get(`/financedeparts/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching Finance Depart by ID:', error);
  }
};

 
///////////////////////////// add Finance Depart ////////////////////////////////


  const addFinancedepart = async (formData) => {
    console.log(formData)
    try {
       const response = await api.post(`/financedeparts/create`,formData);
       return response.data;
    } 
    catch (error) {
      console.log('Error adding financedepart:', error);
      }};

//////////////////////// fetching of delete financedeparts /////////////////////////////////



  const deleteFinancedepart = async (id) => {
     try {
      const response = await api.delete(`/financedeparts/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting financedepart:', error);
      
    }
 
  };

/////////////////////// fetching of update of Finance depart ///////////////////////////////


  const updateFinancedepart = async ({id,values}) => {
    try {
        const response = await api.put(`/financedeparts/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating Finance Depart:', error);
       }};

  /////////////////////// fetching of Status of Finance Depart ///////////////////////////////


  const statusFinancedepart = async (id) => {
    try {
      const response = await api.put(`/financedeparts/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating Finance Depart status:', error);
    }};


////////////////////////// fetching finance depart mutations /////////////////////////////////////

 // 
 export const useFinancedepart = () => {
 return useQuery('financedeparts', fetchFinancedepart);
 };


///////////////////   Mutation to get Finance Depart by ID //////////////////////////////////


export const useFinancedepartById = (id) => {
  return useQuery(['financedeparts', id], () => fetchFinancedepartById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 ///////////////////////////  Add Finance Depart Mutations  //////////////////////////////////////////////////////////////////

 
 
 export const useAddFinancedepartMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addFinancedepart,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('financedeparts');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding financedepart:', err);
        alert('Failed to add financedepart. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete finance depart Mutations /////////////////////////////////
  

  export const useDeleteMutationFinancedepart = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteFinancedepart,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('financedeparts');
      },},
      {
        onError:(err) => {
          console.error('Error deleting financedepart:', err);
          alert('Failed to delete finance depart. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update finance depart Mutations ///////////////////////////////
  

  
  export const useUpdateMutationFinancedepart = () => {
  const queryClient = useQueryClient();

  return useMutation(updateFinancedepart,{
      onSuccess: () => {
        queryClient.invalidateQueries('financedeparts');
       },
    
      }
    );};
  //////////////////////////////// update finance depart Mutations ///////////////////////////////

      export const useStatusMutationFinancedepart= () => {
        const queryClient = useQueryClient();
        return useMutation(statusFinancedepart,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('financedeparts');
            },},{
              onError:(err) => {
                console.error('Error updating finance depart:', err);
                alert('Failed to update departs. Please try again later.');
              }
            });};