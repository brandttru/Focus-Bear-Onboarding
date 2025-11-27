import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Message from './message.tsx';

describe('Message Component', () => {
  it('renders the message text', () => {
    render(<Message text="Hello World" sender="John" />);
    
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders the sender name', () => {
    render(<Message text="Test message" sender="Alice" />);
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('displays sender initial in avatar', () => {
    render(<Message text="Test" sender="Bob" />);
    
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders with default timestamp when not provided', () => {
    render(<Message text="Test" sender="Charlie" />);
    
    // Check that a timestamp is displayed (format: HH:MM)
    const timeRegex = /\d{1,2}:\d{2}/;
    const timeElement = screen.getByText(timeRegex);
    expect(timeElement).toBeInTheDocument();
  });

  it('renders with custom timestamp', () => {
    const customDate = new Date('2024-01-15T14:30:00');
    render(<Message text="Test" sender="Dave" timestamp={customDate} />);
    
    // Should display "2:30 PM" or "14:30" depending on locale
    expect(screen.getByText(/2:30|14:30/)).toBeInTheDocument();
  });

  it('handles long sender names correctly', () => {
    render(<Message text="Test" sender="Christopher" />);
    
    expect(screen.getByText('Christopher')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('handles empty text gracefully', () => {
    render(<Message text="" sender="Emily" />);
    
    expect(screen.getByText('Emily')).toBeInTheDocument();
  });
});