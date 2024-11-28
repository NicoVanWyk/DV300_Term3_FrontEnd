import axios from 'axios';

const API_BASE_URL = 'http://localhost:5234/api';

export interface Transaction {
  transactionId: number;
  transactionType: string;
  fromAccountId: number;
  toAccountId: number;
  amount: number;
  timestamp: string;
  fromUsername?: string;
  toUsername?: string;
}

interface ApiResponse {
  $id: string;
  $values: Transaction[];
}

export const useTransactionService = () => {
  const getTransactionsForUser = async (userId: number): Promise<Transaction[]> => {
    try {
      const response = await axios.get<ApiResponse>(`${API_BASE_URL}/Transaction`);
      const transactions: Transaction[] = response.data.$values;

      // Filter transactions for the current user
      const userTransactions = transactions.filter(
        t => t.fromAccountId === userId || t.toAccountId === userId
      );

      // Fetch usernames for involved accounts
      const uniqueUserIds = new Set([
        ...userTransactions.map(t => t.fromAccountId),
        ...userTransactions.map(t => t.toAccountId)
      ]);

      const userPromises = Array.from(uniqueUserIds).map(id =>
        axios.get(`${API_BASE_URL}/User/${id}`)
      );

      const users = await Promise.all(userPromises);
      const userMap = new Map(users.map(u => [u.data.userId, u.data.username]));

      // Add usernames to transactions
      return userTransactions
      .map(t => ({
        ...t,
        fromUsername: userMap.get(t.fromAccountId),
        toUsername: userMap.get(t.toAccountId)
      }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  };

  return {
    getTransactionsForUser,
  };
};

export default useTransactionService;