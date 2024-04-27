import { render, screen } from '@testing-library/react';
import Row from "../row";

describe('Row', ()=> {
    test('should render passed children', () => {
        render(<Row><div>test children</div></Row>)
        expect(screen.getByText('test children')).toBeDefined();
    });
    test('should contain classname row', () => {
        let {container} = render(<Row />)
        expect(container.getElementsByClassName('row').length).toBe(1);
    });
})
