import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node'

import App from './App';

// Using our own custom render function instead of RTL's render
import { renderWithProviders } from './utils/test-utils';

/* 
  We use msw to intercept the network request during the test, and return the response
  same as the https://jsonplaceholder.typicode.com/users API returns after 150ms 
  when receiving a get request to the `/users` endpoint
*/
export const handlers = [
  rest.get('/users', (req, res, ctx) => {
    const mockResponseBody = [
      {
        "id": 1,
        "name": "Leanne Graham",
        "email": "Sincere@april.biz",
      },
      {
        "id": 2,
        "name": "Ervin Howelle",
        "email": "Shanna@melissa.tv",
      },
      
    ];

    return res(
      ctx.delay(150),
      ctx.json(mockResponseBody)
    );
  }),
  rest.get('/err', (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({
        errorMessage: 'Network error',
      }),
    );
  })
]

const server = setupServer(...handlers);

// Enable API mocking before tests
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done
afterAll(() => server.close());

describe('Main Component', () => {

    test('take snapshot', () => {
      const view = renderWithProviders(<App/>);
      expect(view).toMatchSnapshot();
    })

    test('It should dispatch get monsters action on intial mounting and showing `Loading...` text on screen', () => {
        renderWithProviders(<App/>);
        expect(screen.getByText('Loading...')).toBeTruthy();
        expect(screen.queryByText('Error:')).toBeFalsy();
        expect(screen.getByPlaceholderText('Search Monsters')).toBeTruthy();
    });

    test('It should display all the monsters list in the screen correctly', async() => {

        const { store } = renderWithProviders(<App />);
        
        // at initial stage we have the loading text
        expect(screen.getByText('Loading...')).toBeTruthy();
        
        await waitFor(() => expect(store.getState().monsters.data.length).toBeGreaterThan(0));
        expect(screen.queryByText('Loading...')).toBeFalsy();
        expect(screen.queryByText('Error:')).toBeFalsy();

        // expect these elements to be shown in the browser
        expect(screen.getByText('Leanne Graham')).toBeTruthy();
        expect(screen.getByText('Shanna@melissa.tv')).toBeTruthy();
    });

    test('It should display error text on the screen', async() => {

        // passing err flag to backend server to explicitly throw error
        const { store } = renderWithProviders(<App err={true}/>);
        
        // wait for the api to send the data 
        await waitFor(() => expect(store.getState().monsters.error).not.toBeNull());
        expect(screen.queryByText('Loading...')).toBeFalsy();
        expect(screen.getByText('Error')).toBeTruthy();
    });
});


// Integration Testing
describe('Integration Testing', () => {
  test('It should filter the monsters by text entered in search input field', async () => {
    const userEvents = userEvent.setup()

    // mounts the app and also fires dispatch action to fetch data from server
    const { container, store } = renderWithProviders(<App aria-label='main-component'/>);
    // wait for the data to be fetched from server and stored in redux store
    await waitFor(() => expect(store.getState().monsters.data.length).toBeGreaterThan(0));

    // Find the searchbox input
    const searchBox = screen.getByRole('searchbox')
    expect(searchBox).toBeTruthy();

    // enter some text inside searchbox input
    await userEvents.type(searchBox, 'Lean');
    expect(searchBox.value).toEqual('Lean');

    // check from redux store how many matches do we have 
    // by our `Lean` query
    const searchResultsCount = store.getState().monsters.data.filter(
      monster => monster.name.toLowerCase().includes('lean')
    ).length;
    
    // asserting that the card-container is euqal to the amount of matches
    expect(container.getElementsByClassName('card-container').length).toBe(searchResultsCount);

  });



  test('Our search query matches more than one item', async () => {
    const userEvents = userEvent.setup()

    // mounts the app and also fires dispatch action to fetch data from server
    const { container, store } = renderWithProviders(<App aria-label='main-component'/>);
    // wait for the data to be fetched from server and stored in redux store
    await waitFor(() => expect(store.getState().monsters.data.length).toBeGreaterThan(0));

    // Find the searchbox input
    const searchBox = screen.getByRole('searchbox')
    expect(searchBox).toBeTruthy();

    // enter some text inside searchbox input
    await userEvents.type(searchBox, 'le');
    expect(searchBox.value).toEqual('le');

    // check from redux store how many matches do we have 
    // by our `Lean` query
    const searchResultsCount = store.getState().monsters.data.filter(
      monster => monster.name.toLowerCase().includes('le')
    ).length;
    
    // asserting that the card-container is euqal to the amount of matches
    expect(container.getElementsByClassName('card-container').length).toBe(searchResultsCount);

  });


  test(`Our search query doesn't match any items`, async () => {
    const userEvents = userEvent.setup()

    // mounts the app and also fires dispatch action to fetch data from server
    const { container, store } = renderWithProviders(<App aria-label='main-component'/>);
    // wait for the data to be fetched from server and stored in redux store
    await waitFor(() => expect(store.getState().monsters.data.length).toBeGreaterThan(0));

    // Find the searchbox input
    const searchBox = screen.getByRole('searchbox')
    expect(searchBox).toBeTruthy();

    // enter some text inside searchbox input
    await userEvents.type(searchBox, 'something');
    expect(searchBox.value).toEqual('something');

    // check from redux store how many matches do we have 
    // by our `Lean` query
    const searchResultsCount = store.getState().monsters.data.filter(
      monster => monster.name.toLowerCase().includes('something')
    ).length;
    
    // asserting that the card-container is euqal to the amount of matches
    expect(container.getElementsByClassName('card-container').length).toBe(searchResultsCount);
  })
});