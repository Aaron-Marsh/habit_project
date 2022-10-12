import { default as SignupModalContent } from './'
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios'

jest.spyOn(console, "error").mockImplementation(() => {})

jest.mock("axios")

// jest.mock("axios", () => ({
//     ...jest.requireActual("axios"),
//     post: jest.fn()
// }))

describe('Test SignupModalContent', () => {
    beforeEach(() => {
        render(
            <SignupModalContent />
        )
    })
    test('Title exists', () => {
        let title = screen.getByText('Signup')
        expect(title).toBeInTheDocument();
    })
    test('Signup form exists', () => {
        let form = screen.getByRole('form')
        expect(form).toBeInTheDocument();
    })
    test('Register button exists', () => {
        let button = screen.getByRole('button', {name: 'Register'})
        expect(button).toBeInTheDocument()
    })
    test('Go to login button exists', () => {
        let button = screen.getByRole('button', {name: 'Already have an account? Login'})
        expect(button).toBeInTheDocument()
    })
    test('Register fails on no inputs', () => {
        let button = screen.getByRole('button', {name: 'Register'})
        fireEvent.click(button)
        let error = screen.getByText('Please complete all fields!')
        expect(error).toBeInTheDocument()

    })
    test('Register fails on passwords not match', () => {
        let userInput = screen.getByLabelText('username input')
        let passInput = screen.getByLabelText('password input')
        let passInput2 = screen.getByLabelText('confirm password input')
        let button = screen.getByRole('button', {name: 'Register'})

        userEvent.type(userInput, 'aaron')
        userEvent.type(passInput, '123')
        userEvent.type(passInput2, '321')
        fireEvent.click(button)
   

        let error = screen.getByText('Passwords do not match!')
        expect(error).toBeInTheDocument()
    })
    test('Register request on valid inputs', () => {
        let userInput = screen.getByLabelText('username input')
        let passInput = screen.getByLabelText('password input')
        let passInput2 = screen.getByLabelText('confirm password input')
        let button = screen.getByRole('button', {name: 'Register'})
        
        // const resp = {msg: 'User created'}
        // axios.post.mockResolvedValue({data:{msg:'User created'}})

        userEvent.type(userInput, 'aaron')
        userEvent.type(passInput, '123')
        userEvent.type(passInput2, '123')
        fireEvent.click(button)

        expect(axios.post).toHaveBeenCalled()
        
        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:3001/auth/register",
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
