import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';



// Importing our slice reducers for basic setup of store
import { setupStore } from '../redux/store';

export const renderWithProviders = (
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store= setupStore(preloadedState, true),
        ...renderOptions
    } = {}
)  => {
    const Wrapper = ({ children })  => {
        return <Provider store={store}>{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions})}
}
