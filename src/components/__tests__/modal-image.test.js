import { render } from '@testing-library/react';
import ModalImage from "../modal-image";


describe('ModalImage', ()=> {
    test('should render one image', () => {
        let { container } = render(
            <ModalImage 
                isOpen={true}
                imageLargeUrl={"/imageUrl"} 
                closeModal={jest.fn()}
            />)
        expect(container.getElementsByTagName('img').length).toBe(1)
    });
})
