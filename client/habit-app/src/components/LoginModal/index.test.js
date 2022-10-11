import { default as LoginModal } from './'
import { screen, render } from '@testing-library/react';

describe('Test LoginModal', () => {
    beforeEach(() => {
        render(
            <LoginModal />
        )
    })
    test('Title exists', () => {
        let title = screen.getByRole('title')
        expect(title).toBeInTheDocument();
    })
})
