import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CountryList from '../pages/CountryList/CountryList';
import CountryDetailPage from '../pages/CountryDetailPage/CountryDetailPage';
import CooperationPage from '../pages/CooperationPage/CooperationPage';

jest.mock('../pages/CountryList/CountryList', () => () => <div>Country List Page</div>);
jest.mock('../pages/CountryDetailPage/CountryDetailPage', () => () => <div>Country Detail Page</div>);
jest.mock('../pages/CooperationPage/CooperationPage', () => () => <div>Cooperation Page</div>);

describe('App Routing', () => {
  
  test('renders the CountryList page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CountryList />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Country List Page')).toBeInTheDocument();
  });

  test('navigates to CountryDetailPage when visiting /country/:id', async () => {
    render(
      <MemoryRouter initialEntries={['/country/1']}>
        <CountryDetailPage />
      </MemoryRouter>
    );
    
    await waitFor(() => expect(screen.getByText('Country Detail Page')).toBeInTheDocument());
  });

  test('navigates to CooperationPage when visiting /cooperation', async () => {
    render(
      <MemoryRouter initialEntries={['/cooperation']}>
        <CooperationPage />
      </MemoryRouter>
    );
    
    await waitFor(() => expect(screen.getByText('Cooperation Page')).toBeInTheDocument());
  });
});