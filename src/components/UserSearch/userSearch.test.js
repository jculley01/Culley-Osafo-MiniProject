import React from 'react';
import { render } from '@testing-library/react';
import UserSearch from './UserSearch';

test('renders the user search input and search button', () => {
    const { getByPlaceholderText, getByText } = render(<UserSearch />);
    const searchInput = getByPlaceholderText('Search by name');
    const searchButton = getByText('Search');
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
});
