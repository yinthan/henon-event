import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';
import userEvent from '@testing-library/user-event';

// Test if the components render correctly
describe('App Component Tests', () => {
  test('renders event form', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
  });

  test('renders event list with no events', () => {
    render(<App />);
    expect(screen.getByText(/no events to display/i)).toBeInTheDocument();
  });

  test('renders event timeline placeholder', () => {
    render(<App />);
    expect(screen.getByText(/timeline placeholder/i)).toBeInTheDocument();
  });

  test('allows the user to add an event', async () => {
    render(<App />);

    // Assuming your EventForm component inputs and buttons are properly labeled or have placeholders
    userEvent.type(screen.getByPlaceholderText(/title/i), 'Test Event');
    userEvent.selectOptions(screen.getByLabelText(/type/i), 'Merger');
    userEvent.type(screen.getByPlaceholderText(/start date/i), '2022-01-01');
    userEvent.type(screen.getByPlaceholderText(/end date/i), '2022-01-02');
    userEvent.click(screen.getByRole('button', { name: /save event/i }));

    // Verify the event is added by checking if it appears in the EventList
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText(/merger/i)).toBeInTheDocument();
    expect(screen.getByText(/2022-01-01 to 2022-01-02/i)).toBeInTheDocument();
  });

  // Additional tests for editing and deleting an event would follow a similar pattern
  // You would first need to add an event as in the previous test, then interact with the UI to edit or delete that event
  test('allows the user to edit an event', async () => {
    render(<App />);

    // Add an event as before
    userEvent.type(screen.getByPlaceholderText(/title/i), 'Original Event');
    userEvent.selectOptions(screen.getByLabelText(/type/i), 'Merger');
    userEvent.type(screen.getByPlaceholderText(/start date/i), '2024-01-05');
    userEvent.type(screen.getByPlaceholderText(/end date/i), '2024-02-02');
    userEvent.click(screen.getByRole('button', { name: /save event/i }));

    // Simulate clicking the edit button for the newly added event
    userEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Now, modify the event details in the form
    userEvent.clear(screen.getByPlaceholderText(/title/i));
    userEvent.type(screen.getByPlaceholderText(/title/i), 'Edited Event');
    userEvent.click(screen.getByRole('button', { name: /update event/i }));

    // Verify the event has been updated by checking the modified details are displayed
    expect(screen.getByText('Edited Event')).toBeInTheDocument();
  });

  test('allows the user to delete an event', async () => {
    render(<App />);

    // Add an event as before
    userEvent.type(screen.getByPlaceholderText(/title/i), 'Event to Delete');
    userEvent.selectOptions(screen.getByLabelText(/type/i), 'Merger');
    userEvent.type(screen.getByPlaceholderText(/start date/i), '2022-01-01');
    userEvent.type(screen.getByPlaceholderText(/end date/i), '2022-01-02');
    userEvent.click(screen.getByRole('button', { name: /save event/i }));

    // Simulate clicking the delete button for the newly added event
    userEvent.click(screen.getByRole('button', { name: /delete/i }));

    // Verify the event has been removed from the list
    expect(screen.queryByText('Event to Delete')).not.toBeInTheDocument();
  });
});
