import React, { useEffect, useState } from 'react';
import styles from './buy.module.css';
import { FaArrowRight, FaMoneyBills } from 'react-icons/fa6';
import axios from 'axios';

const Buy = () => {
  const [showModal, setShowModal] = useState(false);
  const [amountEntered, setAmountEntered] = useState(1); //Starcoin Amount
  const [transFee, setTransFee] = useState(50); //Transaction fee
  const [transFeePerc, setTransFeePerc] = useState(2); //Transaction fee %
  const [totalCost, setTotalCost] = useState(300); //Total Cost

  // User Info
  const [userId, setUserId] = useState('');
  const [accountBalance, setAccountBalance] = useState(0);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // The default value of a StarCoin in Rands
  const starCoinValue = 250;

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

          // --Collect the user's status to find their transaction fee percentage
          const accountStatus = response.data.statusId;
          const responseStatus = await axios.get(`http://localhost:5234/api/Status/${accountStatus}`)
          const statusTransFee = responseStatus.data.transactionFee;

          setTransFeePerc(statusTransFee);

        } catch (error) {
          console.error('Error fetching account data:', error);
        }
      }

    };

    fetchAccountData();
  }, [userId]);

  // Recalculate the transaction fee and total cost whenever transFeePerc or amountEntered changes
  useEffect(() => {
    const preCost = amountEntered * starCoinValue;
    const fee = preCost * transFeePerc;
    setTransFee(fee);
    setTotalCost(preCost + fee);
  }, [transFeePerc, amountEntered]);

  // Purchase a StarCoin
  const handlePurchase = async () => {
    if (totalCost > accountBalance) {

      // Don't purchase if the user has insufficient funds
      alert('You do not have enough funds to complete this purchase.');
      return;

    } else {
      // Disable the button
      setIsButtonDisabled(true);

      try {
        const response = await axios.post('http://localhost:5234/api/Transaction/StarCoinPurchase', null, {
          params: {
            fromAccountId: userId, // The user ID
            starCoins: amountEntered, // The amount of StarCoins the user wants to purchase
            amount: -totalCost // The total cost in currency to be deducted
          }
        });

        if (response.status === 201) {
          alert('StarCoin purchase successful!');
          handleClose(); // Close the modal
          window.location.reload(); // Reload the page to get the latest data
        }

      } catch (error) {
        console.error('Error purchasing StarCoins:', error);
        alert('There was an error processing your purchase.');
      } finally {
        // Re-enable the button
        setIsButtonDisabled(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const minValue = 1;

    // Test to enforce minimum value
    if (value < minValue) {
      setAmountEntered(minValue);

      // Calculate the new transaction fee
      const preCost = minValue * starCoinValue;
      const fee = preCost * transFeePerc;
      setTransFee(fee)

      // Calculate the new total cost
      setTotalCost(preCost + fee)
    } else {
      setAmountEntered(value);

      // Calculate the new transaction fee
      const preCost = value * starCoinValue;
      const fee = preCost * transFeePerc;
      setTransFee(fee)

      // Calculate the new total cost
      setTotalCost(preCost + fee)
    }
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
            <div className="h2">BUY</div>
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
              <h5 className={styles.modalTitle}>BUY (R{starCoinValue} per StarCoin)</h5>

              <button className={styles.closeButton} onClick={handleClose}>&times;</button>
            </div>

            <div className={styles.modalBody}>
              <div className='transactions-container dark-bg--gradient'>

                <p className={styles.titles}>StarCoin Amount:</p>
                <input
                  type="number"
                  name="input1"
                  value={amountEntered}
                  onChange={handleChange}
                  className={styles.input}
                  min={1}
                />

                <p className={styles.titles}>Transaction Fee (In Rands):</p>
                <div className={styles.input} id='transFee'>
                  {transFee}
                </div>

                <hr style={{ width: '100%', margin: '0px' }}></hr>

                <p className={styles.titles}>Total Cost (In Rands):</p>
                <div className={styles.input}>
                  {totalCost}
                </div>

              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={`${styles.closeButton} tertiary-btn`} onClick={handleClose} disabled={isButtonDisabled}>
                Close
              </button>
              <button className={`${styles.continueButton} btn-main `} onClick={handlePurchase} disabled={isButtonDisabled}>
                Submit
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Buy;