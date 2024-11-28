import axios from 'axios';

export interface AdminUser {
  userId: number; // This is the unique ID for each user
  username: string; // The user's name
  email: string; // User's email address
  isAdmin: boolean; // Is this user an admin? Yes or no
}

const API_BASE_URL = 'http://localhost:5234/api'; // Just the base URL for our API

export const useAdminService = () => {
  const getAllUsers = async (): Promise<AdminUser[]> => { // Changed User[] to AdminUser[]
    try {
      const response = await axios.get(`${API_BASE_URL}/User`);
      const users = response.data.$values;
      
      return users; // Return the user data we got
    } catch (error) {
      console.error('Error fetching users:', error); // Oops, log any errors
      throw error; // Pass the error up for handling later
    }
  };

  const getTradingAndSellingInfo = async (userId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Account/${userId}/trading-info`); // Get trading info for a specific user
      return response.data; // Return that trading info
    } catch (error) {
      console.error('Error fetching trading info:', error); // Log any errors that pop up
      throw error; // Rethrow the error for later handling
    }
  };

  const freezeAccount = async (accountId: number) => {
    try {
      console.log({ accountId })
      const response = await axios.put(`${API_BASE_URL}/Account/${accountId}/freeze`); // Freeze the account, like hitting pause
      console.log('Freeze response:', response.data); // Log what we got back
      return response.data; // Return the response data
    } catch (error: any) {
      console.error('Error freezing account:', error.response ? error.response.data : error.message);
      throw error; // Rethrow the error for handling elsewhere
    }
  };

  const unfreezeAccount = async (accountId: number) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/Account/${accountId}/unfreeze`); // Unfreeze the account, let’s get it back in action
      console.log('Unfreeze response:', response.data); // Log the response
      return response.data; // Return the response data
    } catch (error) {
      console.error('Error unfreezing account:', error); // Log any errors
      throw error; // Rethrow the error for handling later
    }
  };

  return {
    getAllUsers, // Function to get all users
    getTradingAndSellingInfo, // Function to get trading info
    freezeAccount, // Function to freeze an account
    unfreezeAccount, // Function to unfreeze an account
  };
};

export default useAdminService; // Export this service so we can use it in other parts of the app