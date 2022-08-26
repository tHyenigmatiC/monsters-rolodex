import { screen, render } from "@testing-library/react";
import Card from './card.component';

const monster = {
   id: 1,
   name: 'Monster',
   email: 'something@monsters.com'
}

describe('Card Component', () => {
     test('take Snapshot', () => {
        const view = render(<Card {...monster}/>);
        expect(view).toMatchSnapshot();
     });

     test('It should render the card correctly according to monster data passed', () => {
      expect.assertions(2);
      render(<Card {...monster}/>);
      expect(screen.getByText('Monster')).toBeTruthy();
      expect(screen.getByText('something@monsters.com')).toBeTruthy();
   });
})