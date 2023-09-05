import React, { useState, useEffect } from 'react';
import styles from './Calculator.module.css';

const currencies = ['SEK', 'EUR', 'USD', 'GBP', 'DKK'];

const Calculator = ({ openModal }) => {
  // Define the form data state
  const [formData, setFormData] = useState({
    currency: 'SEK',
    netIncome: '',
    assets: '',
    annualCommitments: '',
    netWorth: '',
    lossCapacity: 0,
  });

  // Destructure properties from the form data
  const {
    currency,
    netIncome,
    assets,
    annualCommitments,
    netWorth,
    lossCapacity,
  } = formData;

  // Calculate loss capacity when net worth changes
  useEffect(() => {
    calculateLossCapacity();
  }, [netWorth]);

  // Calculate net worth when input values change
  useEffect(() => {
    calculateNetWorth();
    calculateLossCapacity();
  }, [netIncome, assets, annualCommitments]);

  // Calculate the loss capacity based on net worth
  const calculateLossCapacity = () => {
    if (netWorth !== '') {
      const lossCapacityValue = Math.round(parseFloat(netWorth) * 0.1);
      setFormData((prevData) => ({ ...prevData, lossCapacity: lossCapacityValue }));
    } else {
      setFormData((prevData) => ({ ...prevData, lossCapacity: 0 }));
    }
  };

  // Calculate the net worth based on input values
  const calculateNetWorth = () => {
    const calculatedNetWorth =
      (parseFloat(netIncome) || 0) - (parseFloat(annualCommitments) || 0) + (parseFloat(assets) || 0);
    setFormData((prevData) => ({ ...prevData, netWorth: calculatedNetWorth.toString() }));
  };

  // Handle input change events
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.divContainer}>
        {/* Select Currency */}
        <label className={styles.calculatorBodyText} htmlFor="currency">
          Select Currency
        </label>
        <br />
        <select id="currency" className={styles.calculatorCurrency} onChange={handleInputChange} value={currency}>
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.divContainer}>
        {/* Annual Net Income */}
        <label className={styles.calculatorBodyText} onClick={() => openModal("income")}>
          + Annual Net Income ⓘ
        </label>
        <input
          className={styles.calculatorInputField}
          type="number"
          id="netIncome"
          placeholder="Net Income"
          value={netIncome}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.divContainer}>
        {/* Assets */}
        <label className={styles.calculatorBodyText} onClick={() => openModal("assets")}>
          + Assets ⓘ
        </label>
        <input
          className={styles.calculatorInputField}
          type="number"
          id="assets"
          placeholder="Assets"
          value={assets}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.divContainer}>
        {/* Annual Financial Commitments */}
        <label className={styles.calculatorBodyText} onClick={() => openModal("commitments")}>
          - Annual Financial Commitments ⓘ
        </label>
        <input
          className={styles.calculatorInputField}
          type="number"
          id="annualCommitments"
          placeholder="Annual Commitments"
          value={annualCommitments}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.dividerPopup}></div>

      <div className={styles.divContainer}>
        {/* Net Worth */}
        <label className={styles.calculatorBodyText}>
          = Net Worth
        </label>
        <input
          className={styles.calculatorInputField}
          type="number"
          id="netWorth"
          placeholder="Net Worth"
          value={netWorth}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.divContainer}>
        <div className={styles.lossClaculatorCapacityBox}>
          {/* Loss Bearing Capacity */}
          <p className={styles.lossCalculatorBearingTitle}>Loss Bearing Capacity (10% of net worth):</p>
          <span className={styles.calculatorLossBearingResult}>
            {currency} {formData.lossCapacity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
