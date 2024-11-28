import React, { useEffect, useState } from 'react';
import styles from './sell.module.css';
import { FaArrowRight, FaMoneyBill } from 'react-icons/fa6';
import axios from 'axios';

const Sell = () => {
  const [showModal, setShowModal] = useState(false);
  const [amountEnteredToSell, setAmountEnteredToSell] = useState(1); //Starcoin Amount To Sell
  const [transFee, setTransFee] = useState(50); //Transaction fee
  const [transFeePerc, setTransFeePerc] = useState(0.2); //Transaction fee %
  const [totalGain, setTotalGain] = useState(200); //Total Cost

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // User Info
  const [userId, setUserId] = useState('');
  const [accountCoins, setAccountCoins] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);

  // The default value of a StarCoin in Rands
  const starCoinValue = 250;

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchAccountData = async () => {

      if (userId) {
        try {

          const response = await axios.get(`http://localhost:5234/api/Account/${userId}`);
          setAccountCoins(response.data.coinBalance);
          setAccountBalance(response.data.balance);

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

  // Recalculate the transaction fee and total gain whenever transFeePerc or amountEnteredToSell changes
  useEffect(() => {
    const preCost = amountEnteredToSell * starCoinValue;
    const fee = preCost * transFeePerc;
    setTransFee(fee);
    setTotalGain(preCost - fee);
  }, [transFeePerc, amountEnteredToSell]);

  // Sell a StarCoin
  const handleSell = async () => {
    if (amountEnteredToSell > accountCoins) {

      // Don't purchase if the user has insufficient StarCoins
      alert('You do not have enough funds to complete this purchase.');
      return;

    } else {
      // Disable the button
      setIsButtonDisabled(true);

      try {

        const response = await axios.post('http://localhost:5234/api/Transaction/StarCoinPurchase', null, {
          params: {
            fromAccountId: userId, // The user ID
            starCoins: -amountEnteredToSell, // The amount of StarCoins the user wants to sell
            amount: totalGain // The total cost in currency to be added
          }
        });

        if (response.status === 201) {
          alert('StarCoin(s) successfully sold!');
          handleClose(); // Close the modal
          window.location.reload(); // Reload the page to get the latest data
        }

      } catch (error) {
        console.error('Error selling StarCoins:', error);
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
      setAmountEnteredToSell(minValue);

      // Calculate the new transaction fee
      const preCost = minValue * starCoinValue;
      const fee = preCost * transFeePerc;
      setTransFee(fee);

      // Calculate the new total cost
      setTotalGain(preCost - fee);
    } else {
      setAmountEnteredToSell(value);

      // Calculate the new transaction fee
      const preCost = value * starCoinValue;
      const fee = preCost * transFeePerc;
      setTransFee(fee);

      // Calculate the new total cost
      setTotalGain(preCost - fee);
    }
  };

  return (
    <div className={styles.bodyButtonContainer}>

      <div className={styles.buttonContainer}>
        <div className="btn-main dark-bg--gradient shine-hover" onClick={handleShow}>
          <FaMoneyBill className='money-svg-bg' />
          <div>
            <FaMoneyBill className='money-svg' />
          </div>
          <div className="btn-main-container">
            <div className="h2">SELL</div>
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
              <h5 className={styles.modalTitle}>SELL (R{starCoinValue} per StarCoin)</h5>

              <button className={styles.closeButton} onClick={handleClose}>&times;</button>
            </div>

            <div className={styles.modalBody}>
              <div className='transactions-container dark-bg--gradient'>

                <p className={styles.titles}>
                  StarCoin Amount To Sell ({accountCoins} Available coins):
                </p>
                <input
                  type="number"
                  name="input1"
                  value={amountEnteredToSell}
                  onChange={handleChange}
                  className={styles.input}
                  min={1}
                />

                <p className={styles.titles}>Transaction Fee (In Rands):</p>
                <div className={styles.input} id='transFee'>
                  {transFee}
                </div>

                <hr style={{ width: '100%', margin: '0px' }}></hr>

                <p className={styles.titles}>Total Gain (In Rands):</p>
                <div className={styles.input}>
                  {totalGain}
                </div>

              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={`${styles.closeButton} tertiary-btn`} onClick={handleClose} disabled={isButtonDisabled}>
                Close
              </button>
              <button className={`${styles.continueButton} btn-main `} onClick={handleSell} disabled={isButtonDisabled}>
                Submit
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Sell;