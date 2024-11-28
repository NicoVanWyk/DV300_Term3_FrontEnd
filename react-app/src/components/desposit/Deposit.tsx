import React, { useEffect, useState } from 'react';
import styles from './Deposit.module.css';
import { FaArrowRight, FaMoneyBills } from 'react-icons/fa6';
import axios from 'axios';

const Deposit = () => {
  const [showModal, setShowModal] = useState(false);
  const [cashAmount, setCashAmount] = useState(200); //Cost before totalcost

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
  }, [userId, accountBalance]);

  const handleTopup = async () => {
    try {
      // Disable the button
      setIsButtonDisabled(true);

      console.log(userId);
      console.log(cashAmount);

      const response = await axios.post('http://localhost:5234/api/Transaction/AccountTopup', null, {
        params: {
          fromAccountId: userId, // The user ID
          amount: cashAmount // The amount of money to top up
        }
      });

      if (response.status === 201) {
        alert('Account top-up successful!');
        handleClose(); // Close the modal
        window.location.reload(); // Reload the page to get the latest data
      }

    } catch (error) {
      console.error('Error topping up account:', error);
      alert('There was an error processing your top-up.');
    } finally {
      // Re-enable the button
      setIsButtonDisabled(false);
    }
  };

  const handleChangeTopup = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <div className="h2">Deposit</div>
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
              <h5 className={styles.modalTitle}>Top-up (Deposit)</h5>

              <button className={styles.closeButton} onClick={handleClose}>&times;</button>
            </div>

            <div className={styles.modalBody}>

              <div className='transactions-container dark-bg--gradient'>

                <p className={styles.titles}> Top-Up Amount (In Rands):</p>
                <input
                  type="number"
                  name="input2"
                  value={cashAmount}
                  onChange={handleChangeTopup}
                  className={styles.input}
                  min={200}
                />

                <p className={styles.titles}>Card Number:</p>
                <input
                  type="text"
                  name="input3"
                  placeholder='0000 0000 0000 0000'
                  className={styles.input}
                  required
                />

                <p className={styles.titles}>CVV Number:</p>
                <input
                  type="text"
                  name="input4"
                  placeholder='0000'
                  className={styles.input}
                  required
                />

                <hr style={{ width: '100%', margin: '0px' }}></hr>

                <p className={styles.titles} style={{ marginTop: '-10px' }}>
                  Current Balance: {accountBalance !== null ?
                    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(accountBalance) :
                    'Loading...'}
                </p>

              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={`${styles.closeButton} tertiary-btn`} onClick={handleClose} disabled={isButtonDisabled}>
                Close
              </button>

              <button className={`${styles.continueButton} btn-main `} onClick={handleTopup} disabled={isButtonDisabled}>
                Submit
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Deposit;