import React, { useEffect, useState } from 'react';
import styles from './Withdraw.module.css';
import { FaArrowRight, FaMoneyBills } from 'react-icons/fa6';
import axios from 'axios';

const Withdraw = () => {
  const [showModal, setShowModal] = useState(false);
  const [cashAmount, setCashAmount] = useState(200); // Amount to withdraw

  // User Info
  const [userId, setUserId] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Collect the user's id
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Collect relevant user data
  useEffect(() => {
    const fetchAccountData = async () => {
      if (userId) {
        try {

          // --Local Rand account balance
          const response = await axios.get(`http://localhost:5234/api/Account/${userId}`);
          setAccountBalance(response.data.balance);

        } catch (error) {
          console.error('Error fetching account data:', error);
        }
      }

    };

    fetchAccountData();
  }, [userId]);

  const handleWithdraw = async () => {
    if (cashAmount > accountBalance) {
      alert('You do not have enough funds to complete this withdrawal.');
      return;
    }

    // Disable the button
    setIsButtonDisabled(true);

    try {
      console.log(userId);
      console.log(cashAmount);

      const response = await axios.post('http://localhost:5234/api/Transaction/AccountWithdraw', null, {
        params: {
          fromAccountId: userId, // The user ID
          amount: cashAmount // The amount of money to withdraw
        }
      });

      if (response.status === 201) {
        alert('Account withdrawal successful!');
        handleClose(); // Close the modal
        window.location.reload(); // Reload the page to get the latest data
      }

    } catch (error) {
      console.error('Error processing withdrawal:', error);
      alert('There was an error processing your withdrawal.');
    } finally {
      // Re-enable the button
      setIsButtonDisabled(false);
    }
  };

  const handleChangeWithdraw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);

    setCashAmount(value);
  };

  return (
    <div className={styles.bodyButtonContainer}>
      <div className={styles.buttonContainer}>
        <div className="btn-main dark-bg--gradient shine-hover" onClick={handleShow}>
          <FaMoneyBills className='money-svg-bg' />
          <div>
            <FaMoneyBills className='money-svg' />
          </div>
          <div className="btn-main-container">
            <div className="h2">Withdraw</div>
            <div>
              <FaArrowRight className="svg" />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className={styles.modalOverlay} onClick={handleClose}></div>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h5 className={styles.modalTitle}>Withdraw</h5>

              <button className={styles.closeButton} onClick={handleClose}>&times;</button>
            </div>

            <div className={styles.modalBody}>

              <div className='transactions-container dark-bg--gradient'>

                <p className={styles.titles}>Withdraw Amount (In Rands):</p>
                <input
                  type="number"
                  name="input2"
                  value={cashAmount}
                  onChange={handleChangeWithdraw}
                  className={styles.input}
                  min={200}
                />

                <hr style={{ width: '100%', margin: '0px' }}></hr>

                <p className={styles.titles}>
                  Current Balance: {accountBalance !== 0 ?
                    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(accountBalance) :
                    'Loading...'}
                </p>

              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={`${styles.closeButton} tertiary-btn`} onClick={handleClose} disabled={isButtonDisabled}>
                Close
              </button>

              <button className={`${styles.continueButton} btn-main `} onClick={handleWithdraw} disabled={isButtonDisabled}>
                Submit
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Withdraw;