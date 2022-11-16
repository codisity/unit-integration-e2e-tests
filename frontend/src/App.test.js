import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "./App"
import axios from "axios"

jest.mock("axios")

// Useful tool: screen.debug()

// Integration test (happy path)
test("successfully submit form", async () => {
  axios.post.mockResolvedValueOnce({
    data: { success: "Mocked success message" },
  })

  render(<App />)

  userEvent.click(screen.getByText("Zarejestruj się"))

  await waitFor(() => {
    expect(screen.getByText("Mocked success message")).toBeInTheDocument()
  })
})

// Integration test (error case)
test("submit form with validation error", async () => {
  const errorMessage = "Mocked error message"

  axios.post.mockRejectedValueOnce({
    response: { data: { error: errorMessage } },
  })

  render(<App />)

  userEvent.click(screen.getByText("Zarejestruj się"))

  await waitFor(() => {
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})

// Integration test (edge case)
test("throws error when submitting form", async () => {
  const errorMessage = "Mocked error message"

  axios.post.mockRejectedValueOnce(errorMessage)
  console.error = jest.fn()

  render(<App />)

  userEvent.click(screen.getByText("Zarejestruj się"))

  await waitFor(() => {
    expect(screen.getByText("Nieoczekiwany błąd")).toBeInTheDocument()
  })

  expect(console.error).toBeCalledWith(errorMessage)
})
