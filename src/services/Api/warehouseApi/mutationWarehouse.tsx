import { useQuery,useQueryClient,useMutation} from 'react-query';
import api from '../../../utilities/Api'


////////////////////////////fetch Warehouses //////////////////

const fetchWarehouses = async () => {
  try {
    const response = await api.get(`/warehouses`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching warehouses:', error);
    
  }

};
//////////////////////////////  Warehouse by Id  //////////////////////////////////////////////

const fetchWarehouseById = async (id) => {
  try {
    const response = await api.get(`/warehouses/${id}`);
    return response.data;
     } 
  catch (error) {
    console.log('Error fetching Warehouse by ID:', error);
  }
};

 
///////////////////////////// add Warehouses ////////////////////////////////


  const addWarehouse = async (formData) => {
    console.log(formData)
    try {
       const response = await api.post(`/warehouses/create`,formData);
       return response.data;
    } 
    catch (error) {
      console.log('Error adding warehouse:', error);
      }};

//////////////////////// fetching of delete warehouses /////////////////////////////////



  const deleteWarehouse = async (id) => {
     try {
      const response = await api.delete(`/warehouses/${id}`);
      console.log(response.data)
      return response.data;
      } 
     catch (error) {
      console.log('Error deleting warehouse:', error);
      
    }
 
  };

/////////////////////// fetching of update of warehouses ///////////////////////////////


  const updateWarehouse = async ({id,values}) => {
    try {
        const response = await api.put(`/warehouses/${id}`,values); 
        console.log(response.data)
        return response.data;
       }
   catch (error) {
      console.log('Error updating Warehouse:', error);
       }};

  /////////////////////// fetching of Status of Warehouses ///////////////////////////////


  const statusWarehouse = async (id) => {
    try {
      const response = await api.put(`/warehouses/${id}/status`); 
    console.log(response.data)
    return response.data;
       } 
  catch (error) {
      console.log('Error updating Warehouse status:', error);
    }};


////////////////////////// fetching warehouses mutations /////////////////////////////////////

 // 
 export const useWarehouse = () => {
 return useQuery('warehouses', fetchWarehouses);
 };


///////////////////   Mutation to get Warehouse by ID //////////////////////////////////


export const useWarehouseById = (id) => {
  return useQuery(['warehouses', id], () => fetchWarehouseById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
  });
};


 ///////////////////////////  Add Warehouse Mutations  //////////////////////////////////////////////////////////////////

 
 
 export const useAddWarehouseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(addWarehouse,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('warehouses');
      },
    },
    {
      onError:(err) => {
        console.error('Error adding warehouse:', err);
        alert('Failed to add warehouse. Please try again later.');
      }
    }
    );};

 ///////////////////////////// delete warehouse Mutations /////////////////////////////////
  

  export const useDeleteMutationWarehouse = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteWarehouse,
    {
        onSuccess: () => {
        queryClient.invalidateQueries('warehouses');
      },},
      {
        onError:(err) => {
          console.error('Error deleting Warehouse:', err);
          alert('Failed to delete warehouse. Please try again later.');
        }
      }
    
    );};

  //////////////////////////////// update Warehouse Mutations ///////////////////////////////
  

  
  export const useUpdateMutationWarehouse = () => {
  const queryClient = useQueryClient();

  return useMutation(updateWarehouse,{
      onSuccess: () => {
        queryClient.invalidateQueries('warehouses');
       },
    
      }
    );};
  //////////////////////////////// update warehouse Mutations ///////////////////////////////

      export const useStatusMutationWarehouse= () => {
        const queryClient = useQueryClient();
        return useMutation(statusWarehouse,
          {
            onSuccess: () => {
              queryClient.invalidateQueries('warehouses');
            },},{
              onError:(err) => {
                console.error('Error updating warehouses:', err);
                alert('Failed to update warehouses. Please try again later.');
              }
            });};