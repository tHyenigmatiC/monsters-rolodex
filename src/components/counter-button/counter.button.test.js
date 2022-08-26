import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CounterButton from './counter-button.component';

describe('CounterButton Component', () => {
    test('Render counter button and snapshot', () => {
        const view = render(<CounterButton />);
        expect(view).toMatchSnapshot();
    });

    test('correctly increments the counter', async () => {
        expect.assertions(2)
        const user = userEvent.setup();
        render(<CounterButton />);
        
        // find the count button
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('Count: 0')

        // simulate click
        await user.dblClick(button);
        
        expect(button.textContent).toBe('Count: 2');

    })
})