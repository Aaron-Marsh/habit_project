import { default as LoginModalContent } from './'
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'

jest.spyOn(console, "error").mockImplementation(() => {})

jest.mock("axios")

describe('Test LoginModalContent', () => {
    beforeEach(() => {
        render(
            <LoginModalContent />
        )
    })
    test('Title exists', () => {
        let title = screen.getByText('Login')
        expect(title).toBeInTheDocument();
    })
    test('Login form exists', () => {
        let form = screen.getByRole('form')
        expect(form).toBeInTheDocument();
    })
    test('Sign in button exists', () => {
        let button = screen.getByRole('button', {name: 'Sign in'})
        expect(button).toBeInTheDocument()
    })
    test('Go to signup button exists', () => {
        let button = screen.getByRole('button', {name: "Don't have an account? Signup"})
        expect(button).toBeInTheDocument()
    })
    test('Login fails on no inputs', () => {
        let button = screen.getByRole('button', {name: 'Sign in'})
        fireEvent.click(button)
        let error = screen.getByText('Please enter username and password!')
        expect(error).toBeInTheDocument()

    })
    test('Login request on valid inputs', () => {
        let userInput = screen.getByLabelText('username input')
        let passInput = screen.getByLabelText('password input')
        let button = screen.getByRole('button', {name: 'Sign in'})
        
        userEvent.type(userInput, 'aaron')
        userEvent.type(passInput, '123')
        fireEvent.click(button)

        expect(axios.post).toHaveBeenCalled()

        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:3001/auth/login",
            JSON.stringify({
                username:'aaron',
                password:'123'}),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        
    })
})
