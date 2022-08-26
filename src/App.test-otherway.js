import { render, screen } from '@testing-library/react';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';


// creating our mock redux store
const middlewares = [thunk]
const mockStore = createMockStore(middlewares);

describe('Main Component', () => {

  test('It should dispatch get monsters initial action', () => {
    
    // The initial state on calling the api server
    const state = {
      monsters: {
        data: [],
        isLoading: false,
        error: null
      },
      search: {
        searchField: ''
      }
    };

    const store = mockStore(state);

    // wrap our component with store before rendering
    render( <App /> , {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    // we are only firing single dispatch function on mount
    expect(store.getActions().length).toEqual(1);
    // the initial action dispatched by createAsynThunk function
    expect(store.getActions()[0].type).toEqual('monstes/fetchMonsters/pending');
  });

  test('it should show Loading... text on screen', () => {
    
    // The state during data fetching
    const state = {
      monsters: {
        data: [],
        isLoading: true,
        error: false
      },
      search: {
        searchField: ''
      }
    }

    const store = mockStore(state);

    render( <App />, {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    // the `Loading...` text should be shown on the screen
    expect(screen.getByText('Loading...')).toBeTruthy();
  })
});
