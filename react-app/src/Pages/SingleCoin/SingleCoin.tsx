import styles from './SingleCoin.module.css';
import NavBar from '../../components/navBar/NavBar';
import NavHeader from '../../components/navHeader/navHeader';
import { FaArrowRight, FaMoneyBillTransfer } from 'react-icons/fa6';
import Buy from '../../components/buy/Buy';
import Sell from '../../components/sell/Sell';
import Coin from '../../assets/coin.png';
import LineChart from '../../components/LineChart';
import Transfer from '../../components/transfer/Transfer';

const SingleCoin = () => {

  return (
    <div className="body-main">
      <NavHeader />
      <div className="body-container">
        <div className="body-container--left">

          {/* CS Work */}

          <div className='btn-main'>
            <div>
              <div>
                <p style={{ fontSize: '23.75px' }}>Star Coin</p>
                <p style={{ fontSize: '63px' }}>15,2%</p>
                <p style={{ fontSize: '23px', color: 'green' }}>+2.3%</p>
              </div>
              <div className={styles.chartContainer}>
                <LineChart />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div className='btn-main'>
              <div className="spinning-coin" style={{ display: 'flex', alignItems: 'center' }}>
                <img style={{ width: '200px' }} src={Coin} alt="Spinning Coin" />
                <p style={{ marginLeft: '10px' }}>StarCoin is a fast, decentralized cryptocurrency designed for low-cost transactions and smart contracts, aiming to power global digital exchanges and innovative DeFi projects.</p>
              </div>
            </div>

            <div className='btn-main'>
              <ul style={{ lineHeight: '2' }}>
                <li>Market Cap Rank: #25 (hypothetical)</li>
                <li>Current Price: $0.75 (hypothetical)</li>
                <li>Market Capitalization: $1.5 billion (hypothetical)</li>
                <li>Circulating Supply: 2 billion STC</li>
                <li>Total Supply: 5 billion STC</li>
              </ul>
            </div>
          </div>

          <div className='btn-main' style={{ width: '100%', padding: '20px' }}>
            <p>Trading Advantages:</p>
            <ul style={{ lineHeight: '2' }}>
              <li>Offers significantly lower fees compared to major cryptocurrencies like Bitcoin and Ethereum.</li>
              <li>Processes transactions in under 2 seconds, ensuring quick payments and confirmations.</li>
              <li>Built on a scalable blockchain platform, accommodating increasing transaction volumes without compromising performance.</li>
            </ul>
          </div>

        </div>

        <div className={`${styles.gap} body-container--right`}>

          <div className={styles.buttonContainer}>
            <Buy />
            <Sell />
          </div>

          <div className='line'></div>
          <div className={styles.buttonContainer}>
            <Transfer />
          </div>

        </div>
      </div>

      <NavBar />

    </div>
  );
};

export default SingleCoin;