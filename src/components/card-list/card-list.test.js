import { render } from '@testing-library/react';
import CardList from './card-list.component';

const mockRobots = [
    {
        id: 1,
        name: 'Kapil Bastola',
        username: 'inLoveWithReact',
        email: 'kapil@gmail.com'
    }
]

describe('CardList Component', () => {
    test('rendering cardlist component', () => {
        const view = render(<CardList monsters={mockRobots}/>);
        expect(view).toMatchSnapshot();
    });
})