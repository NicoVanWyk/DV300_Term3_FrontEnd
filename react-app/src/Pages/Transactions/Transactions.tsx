import React, { useState, useEffect } from 'react';
import './Transactions.css';

import NavBar from '../../components/navBar/NavBar';
import NavHeader from '../../components/navHeader/navHeader';
import useTransactionService, { Transaction } from '../../services/TransactionService';
import Deposit from '../../components/desposit/Deposit';
import Withdraw from '../../components/withdraw/Withdraw';
import Loading from '../../components/loading';

import useUserService, { UserData, AccountData } from '../../services/UserService';

function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const transactionService = useTransactionService();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const userService = useUserService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userService.getCurrentUser();
        setUserData(user);

        const account = await userService.getAccountData(user.userId);
        setAccountData(account);
        // 
        // const user = await userService.getCurrentUser();
        const userTransactions = await transactionService.getTransactionsForUser(user.userId);
        setTransactions(userTransactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatAmount = (amount: number, transactionType: string) => {
    const prefix = transactionType === 'AccountTopup' ? '+' : '';
    return `${prefix}${new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount)}`;
  };

  if (loading || !userData || !accountData) {
    return (
      <div className="loading-wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="body-main">
        <NavHeader />
        <div className="transaction-body-container">
          <div className="transaction-header-container">
            <div className='transaction-container'>
              <div className='transaction-container-text'>
                <div className="h3"> Total Balance </div>
                <div className="coin-card--heading">
                  {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(accountData.balance)}
                </div>
                <div className="h3 green">+2.3%</div>
              </div>
              <div>
                <div className="buttonContainer">
                  <Deposit />
                  <Withdraw />
                </div>
              </div>
            </div>
            <div className='line'></div>
            <div className="portfolio-card-container">
              <div className="coin-card dark-bg--gradient shine-hover">
                <div className='coin-card-shape shape1'></div>
                <div className='coin-card-shape shape3'></div>
                <div className='coin-card-shape shape2'></div>

                <div className="h3">Star Coin</div>
                <div className="coin-card--heading"> {accountData.coinBalance} <span className="coin-card--heading--small">STRP</span> </div>
                <div className="h3 green">+2.3%</div>
                <div className="blur-block"></div>
              </div>
            </div>
          </div>
          <>
            <h1>Transactions</h1>
          </>
          <div className="trasnaction-table-container dark-bg--gradient">
            <div className="trasnaction-table-header">
              <div className="trasnaction-table-heading">
                <h1 className="h3">Type</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">Date</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">Amount</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">From</h1>
              </div>
              <div className="trasnaction-table-heading">
                <h1 className="h3">To</h1>
              </div>
            </div>
            <div className="line"></div>
            {transactions.map((transaction) => (

              <section id="transaction-section" key={transaction.transactionId} className="trasnaction-table-header">
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{transaction.transactionType}</h1>
                </div>
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{formatDate(transaction.timestamp)}</h1>
                </div>
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{formatAmount(transaction.amount, transaction.transactionType)}</h1>
                </div>
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{transaction.fromUsername || transaction.fromAccountId}</h1>
                </div>
                <div className="trasnaction-table-heading">
                  <h1 className="h3">{transaction.toUsername || transaction.toAccountId}</h1>
                </div>
              </section>

            ))}
          </div>
        </div>
        <NavBar />
      </div>
    </div>
  );
}

export default Transactions;