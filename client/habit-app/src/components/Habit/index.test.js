import { default as Habit } from './'
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

describe('Test Habit', () => {
    beforeEach(() => {
        render(
            <Habit habit={testHabit} updateHabits={jest.fn()} />
        )
    })
    test('Title exists', () => {
        let title = screen.getByText(/Exercise/i)
        expect(title).toBeInTheDocument();
    })
    test('Current times completed is correct value', () => {
        let current = screen.getByText(/3/i)
        expect(current).toBeInTheDocument();
    })
    test('Goal is correct value', () => {
        let goal = screen.getByText(/5/i)
        expect(goal).toBeInTheDocument();
    })
    test('Click main habit button brings up modal', () => {
        let button = screen.getByRole('button', {name: 'Exercise 3/5'})
        fireEvent.click(button)
        let modalStreak = screen.getByText('4')
        let modalText = screen.getByText(/You have completed/i)
        expect(modalStreak).toBeInTheDocument()
        expect(modalText).toBeInTheDocument()
    })
    test('Current increases by 1 on + button click', () => {
        let button = screen.getByRole('button', {name: '+'})
        fireEvent.click(button)
        let current = screen.getByText(/4/i)
        expect(current).toBeInTheDocument()
    })
    test('Patch request on + button click', () => {
        let button = screen.getByRole('button', {name: '+'})
        fireEvent.click(button)
        expect(axios.patch).toHaveBeenCalled()
    })
    test('Current decreases by 1 on - button click', () => {
        let button = screen.getByRole('button', {name: '-'})
        fireEvent.click(button)
        let current = screen.getByText(/2/i)
        expect(current).toBeInTheDocument()
    })
    test('Patch request on - button click', () => {
        let button = screen.getByRole('button', {name: '-'})
        fireEvent.click(button)
        expect(axios.patch).toHaveBeenCalled()
    })
})
