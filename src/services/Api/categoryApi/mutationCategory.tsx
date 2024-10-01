import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Categories//////////////////

const fetchCategories = async () => {
  try {
    const response = await api.get(`/categories`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching categories:', error);
    
  }

};
//////////////////////////////  Category by Id  //////////////////////////////////////////////

const fetchCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching Category by ID:', error);
  }
};

 
///////////////////////////// add Categories ////////////////////////////////


  const addCategory = async (formData) => {
    console.log(formData)
    try {
       const response = await api.post(`/categories/create`,formData);
       return response.data;
    } 
    catch (error) {
      console.log('Error adding category:', error);
      }};

//////////////////////// fetching of delete categories /////////////////////////////////



  const deleteCategory = async (id) => {
     try {
      const response = await api.delete(`/categories/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting category:', error);
      
    }
 
  };

/////////////////////// fetching of update of Categories ///////////////////////////////


  const updateCategory = async ({id,values}) => {
    try {
        const response = await api.put(`/categories/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating Category:', error);
       }};

  /////////////////////// fetching of Status of Categories ///////////////////////////////


  const statusCategory = async (id) => {
    try {
      const response = await api.put(`/categories/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating Category status:', error);
    }};


////////////////////////// fetching categories mutations /////////////////////////////////////

 // 
 export const useCategory = () => {
 return useQuery('categories', fetchCategories);
 };


///////////////////   Mutation to get Category by ID //////////////////////////////////


export const useCategoryById = (id) => {
  return useQuery(['categories', id], () => fetchCategoryById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 ///////////////////////////  Add Country Mutations  //////////////////////////////////////////////////////////////////

 
 
 export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addCategory,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding category:', err);
        alert('Failed to add category. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete category Mutations /////////////////////////////////
  

  export const useDeleteMutationCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCategory,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('categories');
      },},
      {
        onError:(err) => {
          console.error('Error deleting category:', err);
          alert('Failed to delete category. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update category Mutations ///////////////////////////////
  

  
  export const useUpdateMutationCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCategory,{
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
       },
    
      }
    );};
  //////////////////////////////// update category Mutations ///////////////////////////////

      export const useStatusMutationCategory= () => {
        const queryClient = useQueryClient();
        return useMutation(statusCategory,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('categories');
            },},{
              onError:(err) => {
                console.error('Error updating categories:', err);
                alert('Failed to update categories. Please try again later.');
              }
            });};