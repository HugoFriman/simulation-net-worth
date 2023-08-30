import React, { useState, useEffect } from 'react';
import styles from './Calculator.module.css';

import Modal from './Modal';


const Calculator = () => {
  const [currency, setCurrency] = useState('SEK');
  const [netIncome, setNetIncome] = useState('');
  const [assets, setAssets] = useState('');
  const [annualCommitments, setAnnualCommitments] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [lossCapacity, setLossCapacity] = useState(0);

  const calculateLossCapacity = () => {
    if (netWorth !== '') {
      const lossCapacityValue = Math.round(parseFloat(netWorth) * 0.1);
      setLossCapacity(lossCapacityValue);
    } else {
      setLossCapacity(0);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === 'currency') {
      setCurrency(value);
    } else if (id === 'netIncome') {
      setNetIncome(value);
    } else if (id === 'assets') {
      setAssets(value);
    } else if (id === 'annualCommitments') {
      setAnnualCommitments(value);
    } else if (id === 'netWorth') {
      setNetWorth(value);
      calculateLossCapacity();
    }
  };

  useEffect(() => {
    const calculatedNetWorth =
      (netIncome !== '' ? parseFloat(netIncome) : 0) -
      (annualCommitments !== '' ? parseFloat(annualCommitments) : 0) +
      (assets !== '' ? parseFloat(assets) : 0);

    setNetWorth(calculatedNetWorth.toString());
    calculateLossCapacity();
  }, [netIncome, assets, annualCommitments]);

  return (
    <div className={styles.calculatorContainer}>
      <div>
        <label className={styles.popupText} htmlFor="currency">
          Select Currency
        </label>
        <select id="currency" className={styles.currency} onChange={handleInputChange} value={currency}>
          <option value="SEK">SEK</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="DKK">GBP</option>
          <option value="DKK">NOK</option>

          {/* Add more currency options as needed */}
        </select>
      </div>
      <br/>
      <br/>
      <br />

      <label className={styles.popupText} htmlFor="netIncome">
        + Annual Net Income
      </label>
      <input
        className={styles.inputField}
        type="number"
        id="netIncome"
        placeholder="Net Income"
        onChange={handleInputChange}
        value={netIncome}
      />
      <br />
      <br />
      <label className={styles.popupText} htmlFor="assets">
        + Assets
      </label>
      <input
        className={styles.inputField}
        type="number"
        id="assets"
        placeholder="Assets"
        onChange={handleInputChange}
        value={assets}
      />
      <br />
      <br />
      <label className={styles.popupText} htmlFor="annualCommitments">
        - Annual Financial Commitments
      </label>
      <input
        className={styles.inputField}
        type="number"
        id="annualCommitments"
        placeholder="Annual Commitments"
        onChange={handleInputChange}
        value={annualCommitments}
      />
      <div style={{ clear: 'both' }}></div>
      <div className={styles.divider}></div>
      <label className={styles.popupText} htmlFor="netWorth">
        = Net Worth
      </label>
      <input
        className={styles.inputField}
        type="number"
        id="netWorth"
        placeholder="Net Worth"
        value={netWorth}
        onChange={handleInputChange}
      />
      <br />
      <div className={styles.lossCapacityBox}>
        <p className={styles.lossBearingTitle}>Loss Bearing Capacity (10% of net worth):</p>
        <span className={styles.result}>
          {currency} {lossCapacity}
        </span>
      </div>
    </div>
  );
};

export default Calculator;
