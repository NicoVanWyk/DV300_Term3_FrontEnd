import React, { useEffect, useState } from 'react';
import styles from './transfer.module.css';

import { FaArrowRight, FaMoneyBills, FaMoneyBillTransfer } from 'react-icons/fa6';
import axios from 'axios';

const Transfer = () => {

    const [showModal, setShowModal] = useState(false);
    const [cashAmount, setCashAmount] = useState(200); //Cost before totalcost

    // User Info
    const [userId, setUserId] = useState('');
    const [accountBalance, setAccountBalance] = useState(0);
    const [accountCoins, setAccountCoins] = useState(0);

    const [receiverID, setReceiverID] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

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
                    setAccountBalance(response.data.balance);
                    setAccountBalance(response.data.balance);

                } catch (error) {
                    console.error('Error fetching account data:', error);
                }
            }

        };

        fetchAccountData();
    }, [userId]);

    const handleTransfer = async () => {
        try {
            // Fetch the receiver's user ID based on the email
            const receiverResponse = await axios.get(`http://localhost:5234/api/User/GetUserIdByEmail`, {
                params: { email: receiverEmail }
            });

            const receiverID = receiverResponse.data;

            const response = await axios.post('http://localhost:5234/api/Transaction/AccountTransfer', null, {
                params: {
                    fromAccountId: userId, // The user ID
                    toAccountId: receiverID, //the receiver's ID
                    amount: cashAmount // The amount of money to transfer
                }
            });

            if (response.status === 201) {
                alert('Transfer successful!');
                setAccountBalance(accountBalance - cashAmount); // Update the local balance
                handleClose(); // Close the modal
            }

        } catch (error) {
            console.error('Error transferring funds:', error);
            alert('There was an error processing your transfer.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'input1') {
            // Update cash amount
            setCashAmount(parseFloat(value));
        } else if (name === 'input2') {
            // Update receiver email
            setReceiverEmail(value);
        }
    };

    return (
        <div className={styles.bodyButtonContainer}>
            <div className={styles.buttonContainer}>
                <div className="btn-main dark-bg--gradient shine-hover" onClick={handleShow}>
                    <FaMoneyBillTransfer className='money-svg-bg' />
                    <div>
                        <FaMoneyBillTransfer className='money-svg' />
                    </div>
                    <div className="btn-main-container">
                        <div className="h2">Transfer</div>
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
                            <h5 className={styles.modalTitle}>Transfer</h5>

                            <button className={styles.closeButton} onClick={handleClose}>&times;</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className='transactions-container dark-bg--gradient'>
                                <p className={styles.titles}> Top-Up Amount (In Rands):</p>
                                <input
                                    type="number"
                                    name="input1"
                                    value={cashAmount}
                                    onChange={handleChange}
                                    className={styles.input}
                                    min={200}
                                />

                                <hr style={{ width: '100%', margin: '0px' }}></hr>

                                <p className={styles.titles}>Receiver Email:</p>
                                <input
                                    type="text"
                                    name="input2"
                                    value={receiverEmail}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={`${styles.closeButton} tertiary-btn`} onClick={handleClose}>
                                Close
                            </button>

                            <button className={`${styles.continueButton} btn-main `} onClick={handleTransfer}>
                                Submit
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Transfer;