import { default as HabitModal } from './'
import { screen, render, fireEvent } from '@testing-library/react';
import axios from 'axios'

jest.spyOn(console, "error").mockImplementation(() => {})

jest.mock("axios")

let testHabit = {
    id: "629dd294da9aff4209426a5d",
    title: "Exercise",
    frequency: "Monthly",
    goal: 5,
    completed: false,
    streak: 4,
    startdate: "8-10-2022",
    userId: "629f8820a84519212982bb30",
    current: 3}

describe('Test HabitModal', () => {
    beforeEach(() => {
        render(
            <HabitModal habit={testHabit} current={3} completed={false} streak={4} show={true} onHide={jest.fn()} updateHabits={jest.fn()} />
        )
    })
    test('Title exists', () => {
        let title = screen.getByText('Exercise')
        expect(title).toBeInTheDocument();
    })
    test('Streak is correct value', () => {
        let streak = screen.getByText('4')
        expect(streak).toBeInTheDocument();
    })
    test('Current times completed is correct value', () => {
        let current = screen.getByText(/3/i)
        expect(current).toBeInTheDocument();
    })
    test('Goal is correct value', () => {
        let goal = screen.getByText(/5/i)
        expect(goal).toBeInTheDocument();
    })
    test('Frequency is correct value', () => {
        let frequency = screen.getByText(/Monthly/i)
        expect(frequency).toBeInTheDocument();
    })
    test('Click delete habit button brings up popover', () => {
        let button = screen.getByRole('button', {name: 'Delete Habit'})
        fireEvent.click(button)
        let popoverText = screen.getByText('Are you sure? Once deleted, this habit cannot be restored!')
        let confirmButton = screen.getByRole('button', {name: 'Confirm Delete'})
        expect(popoverText).toBeInTheDocument()
        expect(confirmButton).toBeInTheDocument()
    })
    test('Axios delete request on confirm button click', () => {
        let button = screen.getByRole('button', {name: 'Delete Habit'})
        fireEvent.click(button)
        let confirmButton = screen.getByRole('button', {name: 'Confirm Delete'})
        fireEvent.click(confirmButton)
        expect(axios.delete).toHaveBeenCalled()
    })
})
