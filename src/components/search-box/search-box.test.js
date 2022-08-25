import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from "./search-box.component";

const defaultProps = {
    placeholder: 'Search Monsters',
    handleChange: jest.fn()
}

// jest.setTimeout(30000);

const setup = (jsx) => {
    const user = userEvent.setup();
    const utils = render(<SearchBox { ...defaultProps }/>);
    const input = screen.getByPlaceholderText('Search Monsters');
    return {
        user,
        input,
        ...utils,
    }
}

describe('SearchBox Testing', () => {
    test('renders SearchBox Component', () => {
        const { input } = setup();
        expect(input.placeholder).toBe('Search Monsters');
    });

    test('take Snapshot', () => {
        const view = render(<SearchBox {...defaultProps} />);
        expect(view).toMatchSnapshot();
    })

    test('It should allow to input user queries', () => {        
        const { input } = setup();
        fireEvent.change(input, { target: { value: 'Ervin'}});
        expect(input.value).toBe('Ervin');
    });

    test('It should be able to update the input value on every character change', async () => {
        const { input, user } = setup();
        // input text as kapila
        await user.type(input, 'Kapila');

        // check the entered value
        expect(input.value).toBe('Kapila');
        
        // delete the last text using backspace
        await user.type(input, '{backspace}');

        // total times the values has changed
        expect(defaultProps.handleChange).toHaveBeenCalledTimes(7);

        // the final value of the input
        expect(input.value).toBe("Kapil");
    });
});