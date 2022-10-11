import { default as HabitList } from './'
import { screen, render, fireEvent } from '@testing-library/react';
import axios from 'axios'

jest.spyOn(console, "error").mockImplementation(() => {})

jest.mock("axios")

describe('Test HabitList', () => {
    beforeEach(() => {
        render(
            <HabitList userId={'123'} />
        )
    })
    test('Axios get request on component load', () => {
        expect(axios.get).toHaveBeenCalled()
    })
})
