import { default as CreateHabitButton } from './'
import { screen, render, fireEvent } from '@testing-library/react';
import axios from 'axios'

jest.spyOn(console, "error").mockImplementation(() => {})

jest.mock("axios")


describe('Test CreateHabitButton', () => {
    beforeEach(() => {
        render(
            <CreateHabitButton />
        )
    })
    test('Create new habit button exists', () => {
        let button = screen.getByRole('button', {name:'Make a new Habit'})
        expect(button).toBeInTheDocument();
    })
    test('New habit modal opens on button click', () => {
        let button = screen.getByRole('button', {name:'Make a new Habit'})
        fireEvent.click(button)
        let habitButton = screen.getByRole('button', {name:'Make Habit'})
        expect(habitButton).toBeInTheDocument()
    })
    test('Create habit fails when title input is blank', () => {
        let button = screen.getByRole('button', {name:'Make a new Habit'})
        fireEvent.click(button)

        let habitButton = screen.getByRole('button', {name:'Make Habit'})
        fireEvent.click(habitButton)

        let error = screen.getByText('Please give your habit a title!')
        expect(error).toBeInTheDocument()
    })
    test('Create habit fails when frequency input is blank', () => {
        let button = screen.getByRole('button', {name:'Make a new Habit'})
        fireEvent.click(button)

        let titleInput = screen.getByLabelText('title input')
        userEvent.type(titleInput, 'title')

        let habitButton = screen.getByRole('button', {name:'Make Habit'})
        fireEvent.click(habitButton)
        
        let error = screen.getByText('Please give your habit a frequency in which you want to hit a target!')
        expect(error).toBeInTheDocument()
    })
    test('Create habit fails when goal input is blank', () => {
        let button = screen.getByRole('button', {name:'Make a new Habit'})
        fireEvent.click(button)

        let titleInput = screen.getByLabelText('title input')
        let freqInput = screen.getByLabelText('frequency input')

        userEvent.type(titleInput, 'title')
        userEvent.selectOptions(freqInput, 'Daily')

        let habitButton = screen.getByRole('button', {name:'Make Habit'})
        fireEvent.click(habitButton)
        
        let error = screen.getByText('Please set a target between 1 and 100!')
        expect(error).toBeInTheDocument()
    })
    test('Create habit request on valid inputs', () => {
        let button = screen.getByRole('button', {name:'Make a new Habit'})
        fireEvent.click(button)

        let titleInput = screen.getByLabelText('title input')
        let freqInput = screen.getByLabelText('frequency input')
        let goalInput = screen.getByLabelText('goal input')

        userEvent.type(titleInput, 'title')
        userEvent.selectOptions(freqInput, 'Daily')
        userEvent.type(goalInput, '3')
        
        let habitButton = screen.getByRole('button', {name:'Make Habit'})
        fireEvent.click(habitButton)

        expect(axios.post).toHaveBeenCalled()
    })
})
