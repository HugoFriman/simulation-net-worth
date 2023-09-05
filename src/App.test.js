import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Modal from './components/Modal/Modal';
import Calculator from './components/Calculator/Calculator';
import MoreInformation from './components/MoreInformation/MoreInformation';
import CalculatorPage from './components/CalculatorPage/CalculatorPage';

// Mock data for the Modal component
const mockModalData = {
  modal1: {
    title: 'Modal 1 Title',
    content: ['Content paragraph 1', 'Content paragraph 2'],
  },
  modal2: {
    title: 'Modal 2 Title',
    content: ['Content paragraph 3', 'Content paragraph 4'],
  },
};

// Test suite for the Modal component
describe('Modal Component', () => {
  test('renders modal with correct title and content when open', () => {
    const modalId = 'modal1'; // Replace with the ID of the modal you want to test
    const onClose = jest.fn();

    render(
      <Modal modalId={modalId} isOpen={true} onClose={onClose} modalData={mockModalData} />
    );

    // Check if the modal is open
    const modal = screen.getByTestId('modal-modal1');
    expect(modal).toHaveClass('modal open');

    // Check if the title and content match the expected values
    const title = screen.getByText(mockModalData[modalId].title);
    expect(title).toBeInTheDocument();

    mockModalData[modalId].content.forEach((paragraph) => {
      const content = screen.getByText(paragraph);
      expect(content).toBeInTheDocument();
    });

    // Click the close button and ensure onClose is called
    const closeButton = screen.getByText('x');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // Add more test cases for the Modal component if needed
});

// Test suite for the Calculator component
describe('Calculator Component', () => {
  const testCases = [
    {
      netIncome: '50000',
      assets: '20000',
      annualCommitments: '15000',
      expectedNetWorth: 55000,
      expectedLossBearingCapacity: 5500,
    },
    {
      netIncome: '60000',
      assets: '30000',
      annualCommitments: '20000',
      expectedNetWorth: 70000,
      expectedLossBearingCapacity: 7000,
    },
    // Add more test cases as needed
  ];

  testCases.forEach((testCase, index) => {
    test(`Test Case ${index + 1}: updates net worth and loss bearing capacity correctly`, async () => {
      render(<Calculator />);
      const netIncomeInput = screen.getByLabelText(/Annual Net Income/i);
      const assetsInput = screen.getByLabelText(/Assets/i);
      const annualCommitmentsInput = screen.getByLabelText(/Annual Financial Commitments/i);
      const netWorthInput = screen.getByLabelText(/Net Worth/i);

      // Change input values
      fireEvent.change(netIncomeInput, { target: { value: testCase.netIncome } });
      fireEvent.change(assetsInput, { target: { value: testCase.assets } });
      fireEvent.change(annualCommitmentsInput, { target: { value: testCase.annualCommitments } });

      // Wait for updates
      await waitFor(() => {
        expect(netWorthInput).toHaveValue(testCase.expectedNetWorth);
        const lossBearingCapacity = screen.getByText(/Loss Bearing Capacity/i);

        // Check the text content of lossBearingCapacity
        expect(lossBearingCapacity).toHaveTextContent(`Loss Bearing Capacity (10% of net worth):`);
      });
    });
  });

  // Add more test cases for the Calculator component if needed
});

// Test suite for the MoreInformation component
describe('MoreInformation Component', () => {
  // Mock the openModal function
  const mockOpenModal = jest.fn();

  const moreInformationData = {
    sections: [
      {
        title: 'Section 1',
        text: 'This is section 1.',
        modalId: 'modal1',
      },
      {
        title: 'Section 2',
        text: 'This is section 2.',
      },
    ],
  };

  test('renders MoreInformation component correctly', () => {
    render(<MoreInformation openModal={mockOpenModal} />);
    
    // Verify that section titles and text are displayed
    expect(screen.getByText('Net annual income')).toBeInTheDocument();
    expect(screen.getByText('The net annual income referred to is calculated as the total annual income after the deduction of associated costs and charges, social contributions, and taxes.')).toBeInTheDocument();
    expect(screen.getByText('Total liquid assets')).toBeInTheDocument();
    expect(screen.getByText('The total liquid assets referred to shall be calculated as the sum of the total cash held by you on savings accounts and current accounts as well as the value of assets that can be easily and swiftly converted into cash.')).toBeInTheDocument();

    // Verify that "Read more" links are present for sections with modalId
    const readMoreLinks = screen.getAllByText('Read more →');
    expect(readMoreLinks).toHaveLength(3); // There should be one link with modalId

    // Simulate a click on the "Read more" link
    fireEvent.click(readMoreLinks[0]);
  });

  // Add more test cases for the MoreInformation component if needed
});

describe('CalculatorPage Component', () => {
  jest.mock('./data/modalData.json', () => ({
    modal1: {
      title: 'Test Modal 1',
      content: ['Test Content 1'],
    },
  }));
  
  describe('CalculatorPage Component', () => {
    it('renders CalculatorPage without errors', () => {
      render(<CalculatorPage />);
      const titleElement = screen.getByText(/Net Worth Calculator/);
      expect(titleElement).toBeInTheDocument();
    });
  
    it('opens and closes the modal when Read more is clicked', () => {
      render(<CalculatorPage />);
      
      // Open modal
      const readMoreButton = screen.getByText('Read more →');
      fireEvent.click(readMoreButton);
  
      const modalTitle = screen.getByText('Test Content 1');
      expect(modalTitle).toBeInTheDocument();
  
      // Close modal
      const closeButton = screen.getByText(/x/i);
      fireEvent.click(closeButton);
  
      // Ensure the modal is closed
      expect(modalTitle).not.toBeInTheDocument();
    });
  });
});