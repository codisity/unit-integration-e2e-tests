import { render, screen } from "@testing-library/react"
import PageLayout from "./PageLayout"

// Unit test
test("renders proper heading", async () => {
  render(<PageLayout />)

  const headingElement = screen.getByText("Rejestracja")
  expect(headingElement).toBeInTheDocument()
})

// Unit test
test("renders children element", async () => {
  render(
    <PageLayout>
      <div>Children Element</div>
    </PageLayout>
  )

  const headingElement = screen.getByText("Children Element")
  expect(headingElement).toBeInTheDocument()
})
