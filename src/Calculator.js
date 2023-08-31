import React, { useState, useEffect } from 'react';
import styles from './Calculator.module.css';



const Calculator = () => {
  const [currency, setCurrency] = useState('SEK');
  const [netIncome, setNetIncome] = useState('');
  const [assets, setAssets] = useState('');
  const [annualCommitments, setAnnualCommitments] = useState('');
  const [netWorth, setNetWorth] = useState('');
  const [lossCapacity, setLossCapacity] = useState(0);


  useEffect(() => {
    calculateLossCapacity();
  }, [netWorth]);


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

    // Use functional updates to ensure synchronous state updates
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
    }
  };


  useEffect(() => {
    const calculatedNetWorth =
      (parseFloat(netIncome) || 0) - (parseFloat(annualCommitments) || 0) + (parseFloat(assets) || 0);
    
    setNetWorth(calculatedNetWorth.toString());
    calculateLossCapacity();
  }, [netIncome, assets, annualCommitments]);



  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.divContainer}>
        <label className={styles.popupText} htmlFor="currency">
          Select Currency
        </label>
        <br></br>
        <select id="currency" className={styles.currency} onChange={handleInputChange} value={currency}>
          <option value="SEK">SEK</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="DKK">DKK</option>


          {/* Add more currency options as needed */}
        </select>
      </div>
      

      <div className={styles.divContainer}>
        <label className={styles.popupText} htmlFor="netIncome">
        + Annual Net Income
      </label>
      <input
        className={styles.inputField}
        type="number"
        id="netIncome"
        placeholder="Net Income"
        value={netIncome}
        onChange={handleInputChange}
      />
      </div>
      <div className={styles.divContainer}>
      <label className={styles.popupText} htmlFor="assets">
        + Assets
      </label>
      <input
        className={styles.inputField}
        type="number"
        id="assets"
        placeholder="Assets"
        value={assets}
        onChange={handleInputChange}
      />
      </div>
      <div className={styles.divContainer}>
      <label className={styles.popupText} htmlFor="annualCommitments">
        - Annual Financial Commitments
      </label>
      <input
        className={styles.inputField}
        type="number"
        id="annualCommitments"
        placeholder="Annual Commitments"
        value={annualCommitments}
        onChange={handleInputChange}
      />
      </div>
      
      <div className={styles.divContainer}>
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
      </div>
      <div className={styles.divContainer}>
      <div className={styles.lossCapacityBox}>
        <p className={styles.lossBearingTitle}>Loss Bearing Capacity (10% of net worth):</p>
        <span className={styles.result}>
          {currency} {lossCapacity}
        </span>
      </div>
      </div>
    </div>
  );
};

export default Calculator;
