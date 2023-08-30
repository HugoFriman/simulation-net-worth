import React, { useState } from 'react';
import styles from './App.module.css'; // Import your main CSS file

import Calculator from './Calculator';
import Modal from './Modal'; // Import your Modal component

function App() {
  const [modals, setModals] = useState({
    income: false,
    liquid: false,
    commitments: false,
  });

  const openModal = (modalId) => {
    setModals({ ...modals, [modalId]: true });
  };
  
  const closeModal = (modalId) => {
    setModals({ ...modals, [modalId]: false });
  };

  
  return (
    
    <div className={styles.App}>
      <div className={styles.containerNetWorth}>
        <div className={styles.text}>
          <h1 className={styles.h1Style}>Find out your ability to bear losses</h1>
          <h1 className={styles.h1StyleBlue}>With just a few clicks</h1>
        </div>
      </div>

      <div className={styles.containerNetWorth}>
        <div className={styles.text}>
          <p>
            Any investment carries risk and the possibility of losing your
            invested capital. Unlisted companies are often particularly
            volatile investments. Therefore it is recommended that you maintain
            a diversified portfolio of investments and only invest capital you
            can afford to lose.
          </p>
          <p>
            <i>We will not store any information from this quiz.</i>.
          </p>
          <h2 className={styles.h2Style}>Calculation of Net Worth</h2>
          <p>
            Use the calculator to determine your net worth. We use a formula
            recommended by the <i> European Securities and Markets Authority</i>
            . While it may not be fully reflective of a financial situation, it
            can give you an indication of your financial situation.
          </p>
          <h2 className={styles.h2Style}>Calculation of Loss Bearing Capacity</h2>
          <p>
            It is recommended that non-sophisticated investors do not invest
            more than 10% of their net worth in assets regulated by EU
            Regulation 2020/1503.
          </p>
        </div>

        <Calculator /> {/* Calculator component */}
      </div>

      <div className={styles.containerNetWorth}>
        <div className={styles.text}>
          <div className={styles.divider}></div>
          <h1 className={styles.h1StyleBlue}>More information</h1>
        </div>
      </div>

      <div className={styles.containerNetWorth}>
        <div className={styles.text}>
          <h2 className={styles.h2Style}>Net annual income</h2>
          <p>
            The net annual income referred to is calculated as the total annual
            income after the deduction of associated costs and charges, social
            contributions, and taxes.
          </p>
          <p>
            <label className={styles.popupText}onClick={() => openModal('income')}>
            <b>Read more →</b>
        </label>
          </p>
        </div>

        <div className={styles.text}>
          <h2 className={styles.h2Style}>Total liquid assets</h2>
          <p>
            The total liquid assets referred to shall be calculated as the sum
            of the total cash held by you on savings accounts and current
            accounts as well as the value of assets that can be easily and
            swiftly converted into cash.
          </p>
            <label className={styles.popupText}onClick={() => openModal('commitments')}>
            <b>Read more →</b>
          </label>
        </div>
      </div>

      <div className={styles.containerNetWorth}>
        <div className={styles.text}>
          <h2 className={styles.h2Style}>Annual financial commitments</h2>
          <p>
          The annual financial commitments referred to shall include all the expenditures for which you have undertaken a commitment in relation to in this calendar year
          </p>
            <label className={styles.popupText}onClick={() => openModal('liquid')}>
            <b>Read more →</b>
          </label>
        </div>

        <div className={styles.text}>
          <h2 className={styles.h2Style}>Net Worth</h2>
          <p>
          The mentioned net worth is calculated as <i>(net annual income) + (total of liquid assets) - (annual financial
commitments).</i>
          </p>
          <p>
This simulations gives you an indication of your ability to bear losses.</p>

        </div>

      </div>

      <Modal id="income" isOpen={modals.income} onClose={() => closeModal('income')}>
      <h2>Net annual income</h2>
        	<p><b>The net annual income referred to is calculated as the total annual income after the deduction of associated costs and charges, social contributions, and taxes</b>.</p>

<p>The total annual income shall result from the sum of any  <i>labour income, any interests on bank deposits or other debt instruments, any dividend payments or any real estate income, whereby </i></p>

<p>‘Labour income’ shall include wages, unemployment benefits and pension payments
received by the you but shall exclude exceptional payments.</p>

<p>‘Interests on bank deposits or other debt instruments shall include payments on bank
deposits or other debt instruments received by you during the preceding calendar year but shall exclude those which are exceptional by nature;</p>

<p>‘Dividend payments’ shall include payments received by you by virtue of holding shares or units of a collective investment scheme or other equity instruments, but shall exclude any capital gain realized by selling all or part of such holding;</p>

<p>‘Real estate income’ shall include any payment received in relation to the renting of
real estate properties but shall exclude any capital gain realized by selling all or part
of such real estate properties.</p>  

      </Modal>

      <Modal id="liquid" isOpen={modals.liquid} onClose={() => closeModal('liquid')}>
      <h2>Total liquid assets</h2>
  <p><b>The total liquid assets referred to shall be calculated as the sum of the total cash held by you on savings accounts and current accounts as well as the value of assets that can be easily and swiftly converted into cash.</b></p> <p>For example; saving products that can be turned into cash within a maximum of 30 calendar days, financial instruments negotiated on a regulated market within the meaning, shares, and units of collective investment schemes offering redemption rights at least on a weekly basis.</p>

 <p>Examples of things that shall not be considered liquid assets are, real estate properties, amounts paid to a pension scheme for occupational retirement purposes, and company shares that are not freely redeemable or transferable, including previous crowdfunding investments.
.</p>  

      </Modal>

      <Modal id="commitments" isOpen={modals.commitments} onClose={() => closeModal('commitments')}>
      <h2>Annual financial commitments</h2>
  <p><b>The annual financial commitments referred to shall include all the expenditures for which you have undertaken a commitment in relation to in this calendar year, including but not limited to:</b></p>

<p>Alimony and child support payments, rent and mortgage payments, repayments of loans, payments of insurance premiums, utilities expenses payments, including those made to cover electricity, heating and water expenses, service subscription payments, income tax and property taxes.
</p>

      </Modal>

      

      
    </div>
  );
}

export default App; 