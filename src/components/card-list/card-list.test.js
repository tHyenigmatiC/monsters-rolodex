import { render, screen } from '@testing-library/react';
import CardList from './card-list.component';

const mockRobots = [
    {
        id: 1,
        name: 'Kapil Bastola',
        email: 'kapil@gmail.com'
    },
    {
        id: 2,
        name: 'Chandra Bastola',
        email: 'chandra@gmail.com'
    },
]

describe('CardList Component', () => {

    test('It should take snapshot', () => {
        const view = render(<CardList monsters={mockRobots}/>);
        expect(view).toMatchSnapshot();
    });

    test('It should render the card list correctly with provided data', () => {
        expect.assertions(4);
        render(<CardList monsters={mockRobots}/>);
        expect(screen.getByText('kapil@gmail.com')).toBeTruthy();
        expect(screen.getByText('chandra@gmail.com')).toBeTruthy();
        expect(screen.getAllByRole('heading').length).toEqual(2);
        expect(screen.getAllByRole('img').length).toEqual(2);
    });

    test('It should show nothing if empty data provided', () => {
        expect.assertions(2);
        render(<CardList monsters={[]}/>);
        expect(screen.queryAllByRole('heading').length).toEqual(0);
        expect(screen.queryAllByRole('img').length).toEqual(0);
    });
})