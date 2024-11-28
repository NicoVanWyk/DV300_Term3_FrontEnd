import axios from 'axios';

export interface UserData {
  userId: number;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface AccountData {
  accountId: number;
  userId: number;
  statusId: number;
  balance: number;
  coinBalance: number;
  active: boolean;
}

const API_BASE_URL = 'http://localhost:5234/api';

export const useUserService = () => {
  const getCurrentUser = async (): Promise<UserData> => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('No userId found');
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/User/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const getAccountData = async (userId: number): Promise<AccountData> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/User/account/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching account data:', error);
      throw error;
    }
  };

  return {
    getCurrentUser,
    getAccountData,
  };
};

export default useUserService;