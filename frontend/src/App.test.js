import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import axios from './axios';

// Mocking axios module for test cases
jest.mock('./axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

// Define what the mock resolved value should be
const eventsMock = [
  { _id: '1', title: 'Test Event', type: 'Merger', startDate: '2024-01-01T00:00:00.000Z', endDate: '2024-01-02T00:00:00.000Z' }
];

// Before each test, set up the necessary axios mock implementation
beforeEach(() => {
  axios.get.mockResolvedValue({ data: eventsMock });
  axios.post.mockResolvedValue({ data: { ...eventsMock[0], _id: '2' } }); // Assume new event has _id '2'
  axios.put.mockResolvedValue({ data: { ...eventsMock[0], title: 'Edited Event' } });
  axios.delete.mockResolvedValue({});
});

describe('App Component Tests', () => {
  // ... existing tests

  test('allows the user to add an event', async () => {
    render(<App />);

    // Fill out the event form
    userEvent.type(screen.getByPlaceholderText(/title/i), 'New Event');
    userEvent.selectOptions(screen.getByLabelText(/type/i), ['Merger']);
    userEvent.type(screen.getByPlaceholderText(/start date/i), '2024-01-03');
    userEvent.type(screen.getByPlaceholderText(/end date/i), '2024-01-04');
    userEvent.click(screen.getByText(/save event/i));

    // Wait for the event to be added
    await waitFor(() => {
      expect(screen.getByText('New Event')).toBeInTheDocument();
    });
  });

  test('allows the user to edit an event', async () => {
    render(<App />);

    // Wait for events to load and then click edit
    await waitFor(() => {
      userEvent.click(screen.getByText(/edit/i));
    });

    // Change the title of the event
    userEvent.clear(screen.getByPlaceholderText(/title/i));
    userEvent.type(screen.getByPlaceholderText(/title/i), 'Edited Event');
    userEvent.click(screen.getByText(/save event/i));

    // Verify the event is updated
    await waitFor(() => {
      expect(screen.getByText('Edited Event')).toBeInTheDocument();
    });
  });

  test('allows the user to delete an event', async () => {
    render(<App />);

    // Wait for events to load and then click delete
    await waitFor(() => {
      userEvent.click(screen.getByText(/delete/i));
    });

    // Verify the event is deleted
    await waitFor(() => {
      expect(screen.queryByText('Test Event')).not.toBeInTheDocument();
    });
  });

  // ... other tests
});
