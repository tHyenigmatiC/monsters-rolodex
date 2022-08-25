import { screen, render } from "@testing-library/react";
import Card from './card.component';

// const defaultProps = {
//     monster: {
//         id: 1,
//         name: 'Monster',
//         email: 'something@monsters.com'
//     }
// }

describe('Card Component', () => {
     test('Rendering Card Component', () => {
        // const view = render(<Card {...defaultProps}/>);
        const view = render(<Card/>);
        expect(view).toMatchSnapshot();
     });
})