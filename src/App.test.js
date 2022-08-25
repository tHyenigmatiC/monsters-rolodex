import { render, screen } from '@testing-library/react';
import App from './App';

describe('Main Component', () => {
  test('Renders monsters rolodex header', () => {
    const view = render(<App />);
    const textElement = screen.getByText(/Monsters Rolodex/i);
    expect(textElement).toBeInTheDocument();
    expect(view).toMatchSnapshot();
  });

  // test('Get users data from jsonplace holder', () => {

  // });
});
