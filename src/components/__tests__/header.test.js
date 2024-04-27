import { render, screen } from '@testing-library/react';
import Header from "../header";
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Header', ()=> {
    test('should render correct menu', () => {
        useRouter.mockReturnValue({
            route: '/mock-route',
            pathname: '/mock-pathname',
            query: { key: 'value' },
            asPath: '/mock-asPath',
        });

        render(
            <NextIntlClientProvider locale={"en"} timeZone="Asia/Jakarta" >
                <Header />
            </NextIntlClientProvider>
        )
        expect(screen.getByText(/^Movies$/)).toBeDefined();
        expect(screen.getByText(/^Favourite Movies$/)).toBeDefined();
    });

})
