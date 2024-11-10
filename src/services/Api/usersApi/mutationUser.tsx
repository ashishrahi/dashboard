import { useQuery } from 'react-query';
import api from '../../../utilities/Api';

////////////////////////////fetch Users//////////////////

const fetchUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching users:', error);
  }
};

//------------- User by Id

const fetchUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } 
  catch (error) {
    console.log('Error fetching User by ID:', error);
  }
};

////////////////////////// fetching Users mutations /////////////////////////////////////

export const useUser = () => {
  return useQuery('users', fetchUsers, {
    refetchInterval: 2000, // Refetch every 5 seconds
  });
};

//--------------- Mutation to get Users by ID

export const useUserById = (id) => {
  return useQuery(['users', id], () => fetchUserById(id), {
    enabled: !!id,  // Ensure the query is only enabled if there's an id
    refetchInterval: 5000, // Refetch every 5 seconds
  });
};
