import { expect, describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
    it("はじめての Vitest", () => {
        render(<App />)
        expect(screen.getByText("Click on the Vite and React logos to learn more")).toBeInTheDocument();
    });
})
