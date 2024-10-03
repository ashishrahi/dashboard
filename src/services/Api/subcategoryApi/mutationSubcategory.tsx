import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch SubCategories//////////////////

const fetchSubCategories = async () => {
  try {
    const response = await api.get(`/subcategories`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching subcategories:', error);
    
  }

};
//////////////////////////////  SubCategory by Id  //////////////////////////////////////////////

const fetchSubCategoryById = async (id) => {
  try {
    const response = await api.get(`/subcategories/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching SubCategory by ID:', error);
  }
};

 
///////////////////////////// add SubCategories ////////////////////////////////


  const addSubCategory = async (formData) => {
    console.log(formData)
    try {
       const response = await api.post(`/subcategories/create`,formData);
       return response.data;
    } 
    catch (error) {
      console.log('Error adding subcategory:', error);
      }};

//////////////////////// fetching of delete subcategories /////////////////////////////////



  const deleteSubCategory = async (id) => {
     try {
      const response = await api.delete(`/subcategories/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting subcategory:', error);
      
    }
 
  };

/////////////////////// fetching of update of SubCategories ///////////////////////////////


  const updateSubCategory = async ({id,values}) => {
    try {
        const response = await api.put(`/subcategories/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating SubCategory:', error);
       }};

  /////////////////////// fetching of Status of SubCategories ///////////////////////////////


  const statusSubCategory = async (id) => {
    try {
      const response = await api.put(`/subcategories/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating SubCategory status:', error);
    }};


////////////////////////// fetching Subcategories mutations /////////////////////////////////////

 // 
 export const useSubCategory = () => {
 return useQuery('subcategories', fetchSubCategories);
 };


///////////////////   Mutation to get SubCategory by ID //////////////////////////////////


export const useSubCategoryById = (id) => {
  return useQuery(['subcategories', id], () => fetchSubCategoryById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 ///////////////////////////  Add SubCountry Mutations  //////////////////////////////////////////////////////////////////

 
 
 export const useAddSubCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addSubCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('subcategories');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding subcategory:', err);
        alert('Failed to add subcategory. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete subcategory Mutations /////////////////////////////////
  

  export const useDeleteMutationSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSubCategory,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('subcategories');
      },},
      {
        onError:(err) => {
          console.error('Error deleting subcategory:', err);
          alert('Failed to delete subcategory. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update subcategory Mutations ///////////////////////////////
  

  
  export const useUpdateMutationSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(updateSubCategory,{
      onSuccess: () => {
        queryClient.invalidateQueries('subcategories');
       },
    
      }
    );};
  //////////////////////////////// update subcategory Mutations ///////////////////////////////

      export const useStatusMutationSubCategory= () => {
        const queryClient = useQueryClient();
        return useMutation(statusSubCategory,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('subcategory');
            },},{
              onError:(err) => {
                console.error('Error updating subcategories:', err);
                alert('Failed to update subcategories. Please try again later.');
              }
            });};