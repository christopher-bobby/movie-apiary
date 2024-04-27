import { render, screen } from '@testing-library/react';
import MainContainer from "../main-container";

describe('Row', ()=> {
    test('should render passed children', () => {
        render(<MainContainer><div>test children</div></MainContainer>)
        expect(screen.getByText('test children')).toBeDefined();
    });
    test('should contain classname main-container', () => {
        let {container} = render(<MainContainer />)
        expect(container.getElementsByClassName('main-page-container').length).toBe(1);
    });
})
