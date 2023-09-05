import React, { useState } from 'react';
import Title from '../Title/Title';
import MainPart from '../MainPart/MainPart';
import MoreInformation from '../MoreInformation/MoreInformation';
import Modal from '../Modal/Modal';
import modalData from '../../data/modalData.json';
import  '../Calculator.module.css';

function CalculatorPage() {
  // Define state variables to manage modal state
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState(null);

  // Function to open a specific modal
  const openModal = (modalID) => {
    setIsOpen(true);
    setModalId(modalID);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Title />
      <MainPart openModal={openModal} />
      <MoreInformation openModal={openModal} />
      {modalId && (
        <Modal modalId={modalId} isOpen={isOpen} onClose={closeModal} modalData={modalData} />
      )}
    </div>
  );
}

export default CalculatorPage;
