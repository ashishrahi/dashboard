import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Contact //////////////////

const fetchContact = async () => {
  try {
    const response = await api.get(`/contacts`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching contacts:', error);
    
  }

};
//////////////////////////////  Contact by Id  //////////////////////////////////////////////

const fetchContactById = async (id) => {
  try {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching Contact by ID:', error);
  }
};

 
///////////////////////////// add Contacts ////////////////////////////////


  const addContact = async (formData) => {
    console.log(formData)
    try {
       const response = await api.post(`/contacts/contact`,formData);
       return response.data;
    } 
    catch (error) {
      console.log('Error adding contact:', error);
      }};

//////////////////////// fetching of delete contacts /////////////////////////////////



  const deleteContact = async (id) => {
     try {
      const response = await api.delete(`/contacts/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting contact:', error);
      
    }
 
  };

/////////////////////// fetching of update of Contacts ///////////////////////////////


  const updateContact = async ({id,values}) => {
    try {
        const response = await api.put(`/contacts/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating Contact:', error);
       }};

  /////////////////////// fetching of Status of Contacts ///////////////////////////////


  const statusContact = async (id) => {
    try {
      const response = await api.put(`/contacts/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating Contact status:', error);
    }};


////////////////////////// fetching contacts mutations /////////////////////////////////////

 // 
 export const useContact = () => {
 return useQuery('contacts', fetchContact);
 };


///////////////////   Mutation to get Contact by ID //////////////////////////////////


export const useContactById = (id) => {
  return useQuery(['contacts', id], () => fetchContactById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 ///////////////////////////  Add contacts Mutations  //////////////////////////////////////////////////////////////////

 
 
 export const useAddContactMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addContact,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contacts');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding contact:', err);
        alert('Failed to add contact. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete contact Mutations /////////////////////////////////
  

  export const useDeleteMutationContact = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteContact,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('contacts');
      },},
      {
        onError:(err) => {
          console.error('Error deleting contact:', err);
          alert('Failed to delete contact. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update contact Mutations ///////////////////////////////
  

  
  export const useUpdateMutationContact = () => {
  const queryClient = useQueryClient();

  return useMutation(updateContact,{
      onSuccess: () => {
        queryClient.invalidateQueries('contacts');
       },
    
      }
    );};
  //////////////////////////////// update contacts Mutations ///////////////////////////////

      export const useStatusMutationContact= () => {
        const queryClient = useQueryClient();
        return useMutation(statusContact,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('contacts');
            },},{
              onError:(err) => {
                console.error('Error updating contacts:', err);
                alert('Failed to update contacts. Please try again later.');
              }
            });};