import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { IoGridOutline } from "react-icons/io5";
import { FaFireFlameCurved, FaMoneyBill, FaUserCheck, FaCoins, FaArrowRight, FaMoneyBillTransfer, FaMoneyBills } from "react-icons/fa6"
import { SlGraph } from "react-icons/sl";
import LineChart from '../../components/LineChart';

// components
import NavBar from '../../components/navBar/NavBar';
import NavHeader from '../../components/navHeader/navHeader';
import Buy from '../../components/buy/Buy';
import Sell from '../../components/sell/Sell';

import useUserService, { UserData, AccountData } from '../../services/UserService';
import Transfer from '../../components/transfer/Transfer';
import Loading from '../../components/loading';
import { Link } from 'react-router-dom';

function Dashboard() {
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!userData || !accountData) {
    return (
      <div className="loading-wrapper">
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <div className="body-main">
        {/* <div className="code-embed">
          <svg width="1716" height="1716" viewBox="0 0 1716 1716" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_f_163_81)">
              <rect x="285" y="285" width="1146.7" height="1146.7" rx="573.35" fill="url(#paint0_radial_163_81)" fill-opacity="1" />
            </g>
            <defs>
              <filter id="filter0_f_163_81" x="0.694183" y="0.694183" width="1715.31" height="1715.31" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="142.153" result="effect1_foregroundBlur_163_81" />
              </filter>
              <radialGradient id="paint0_radial_163_81" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(858.35 858.35) rotate(90) scale(573.35)">
                <stop offset="0.204962" stop-color="#BDA5E5" />
                <stop offset="1" stop-color="#2F2D7C" />
              </radialGradient>
            </defs>
          </svg>
        </div> */}
        <NavHeader></NavHeader>
        <div className="body-container">
          <div className="body-container--left">
            <div className="profile-container">
              <div className="profile-sub-container">
                <div className="profile-name-container">
                  <div className="profile-image-container">
                    <img src="https://images.unsplash.com/photo-1707759642885-42994e023046?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="profile-image" />
                  </div>
                  <div className="profile-container-heading">
                    <div className="h1">{userData.username}</div>
                    <div className="h4">{userData.email}</div>
                  </div>
                </div>
                <div className="profile-content-container">
                  <div className="profile-content">
                    <div className="content">
                      <div className="h3">Current Level</div>
                      <div>
                        <FaFireFlameCurved className="svg" />
                      </div>
                    </div>
                    <div className="h3">Bronze (NB)</div>
                  </div>
                  <div className="profile-content">
                    <div className="content">
                      <div className="h3">Active</div>
                      <div>
                        <FaUserCheck className="svg" />
                      </div>
                    </div>
                    <div className="h3">{accountData.active ? 'True' : 'False'}</div>
                  </div>
                  <div className="profile-content">
                    <div className="content">
                      <div className="h3">Intrest Rate</div>
                      <div>
                        <SlGraph className="svg" />
                      </div>
                    </div>
                    <div className="h3">+2.3% (NB)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cta-container">
              <Buy />
              <Sell />
              <Transfer />
            </div>
            <div className="snippet-container">
              <div className="transactions-container dark-bg--gradient">
                <LineChart />
              </div>
              <div className="transactions-container dark-bg--gradient">
                <div className="transaction-heading">
                  <div className="h2">Exchange rates</div>
                  {/* <button className="h4 tertiary-btn">view all</button> */}
                </div>
                <div className="transaction-heading">
                  <div className="transaction-user-container">
                    <div>
                      <FaCoins className="svg" />
                    </div>
                    <div className="transaction-user-text-container">
                      <div className="h3">STRC</div>
                      <div className="h4">Star Chip</div>
                    </div>
                  </div>
                  <div className="h3 green">R250.00  +2.5%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-container--right">
            <div className="portfolio-heading-container">
              <div className="portfolio-heading-sub-container">
                <div className="portfolio-heading">Total Balance</div>
                <Link to="/wallet">
                  <button className="h4 tertiary-btn">view more</button>
                </Link>
              </div>
              <div className="line"></div>
              <div className="portfolio-sub-heading">
                {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(accountData.balance)}
              </div>
            </div>
            {/* Coin */}
            <Link to="/single-coin">
              <div className="portfolio-card-container shine-hover">
                <div className="coin-card dark-bg--gradient">
                  <div className='coin-card-shape shape1'></div>
                  <div className='coin-card-shape shape3'></div>
                  <div className='coin-card-shape shape2'></div>

                  <div className="h3">Star Coin</div>
                  <div className="coin-card--heading"> {accountData.coinBalance} <span className="coin-card--heading--small">STRP</span> </div>
                  <div className="h3 green">+2.3%</div>
                  <div className="blur-block"></div>
                </div>
              </div>
            </Link>
            <div className="transactions-container dark-bg--gradient">
              <div className="transactions-container-overlay"></div>
              <div className="transaction-heading">
                <div className="h2">Recent Transactions</div>
                <Link to="/wallet#transaction-section">
                  <button className="h4 tertiary-btn">view all</button>
                </Link>

              </div>
              <div className="transaction-heading">
                <div className="transaction-user-container">
                  <div className="transaction-profile-image-container">
                    <img src="https://images.unsplash.com/photo-1707928373566-6a8ac1308d9a?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="profile-image" />
                  </div>
                  <div className="transaction-user-text-container">
                    <div className="h3">Luca Breebaart</div>
                    <div className="h4">31 july, 8pm</div>
                  </div>
                </div>
                <div className="h3 green">Star Coin</div>
              </div>
              {/*  */}
              <div className="line"></div>
              {/*  */}
              <div className="transaction-heading">
                <div className="transaction-user-container">
                  <div className="transaction-profile-image-container">
                    <img src="https://images.unsplash.com/photo-1707928373566-6a8ac1308d9a?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="profile-image" />
                  </div>
                  <div className="transaction-user-text-container">
                    <div className="h3">Luca Breebaart</div>
                    <div className="h4">31 july, 8pm</div>
                  </div>
                </div>
                <div className="h3 green">Star Coin</div>
              </div>
              {/*  */}
              <div className="line"></div>
              {/*  */}
              <div className="transaction-heading">
                <div className="transaction-user-container">
                  <div className="transaction-profile-image-container">
                    <img src="https://images.unsplash.com/photo-1707928373566-6a8ac1308d9a?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile" className="profile-image" />
                  </div>
                  <div className="transaction-user-text-container">
                    <div className="h3">Luca Breebaart</div>
                    <div className="h4">31 july, 8pm</div>
                  </div>
                </div>
                <div className="h3 green">Star Coin</div>
              </div>
              <NavBar></NavBar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
