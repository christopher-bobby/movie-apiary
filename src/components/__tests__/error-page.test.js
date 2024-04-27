import { render, screen } from '@testing-library/react';
import ErrorPage from "../error-page";


describe('ErrorPage', ()=> {
    test('should render passed message', () => {
        render(<ErrorPage message="error message" />)
        expect(screen.getByText('error message')).toBeDefined();
    });
    test('should have default error', () => {
        render(<ErrorPage />)
        expect(screen.getByText("Oh snap, there's an error on our end! We'll get back to you shortly")).toBeDefined();
    });
})