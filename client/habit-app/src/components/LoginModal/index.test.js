import { default as LoginModal } from './'
import { screen, render, fireEvent } from '@testing-library/react';

describe('Test LoginModal', () => {
    beforeEach(() => {
        render(
            <LoginModal />
        )
    })
    test('Login / signup button exists', () => {
        let button = screen.getByRole('button', {name:'Login / Signup'})
        expect(button).toBeInTheDocument();
    })
    test('Login modal opens on button click', () => {
        let button = screen.getByRole('button', {name:'Login / Signup'})
        fireEvent.click(button)
        let loginButton = screen.getByRole('button', {name:'Sign in'})
        expect(loginButton).toBeInTheDocument()
    })
})
