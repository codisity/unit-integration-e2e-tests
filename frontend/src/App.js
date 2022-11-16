import axios from "axios"
import { useState } from "react"
import PageLayout from "./components/PageLayout"

export default function App() {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError(null)
    setIsSubmitting(true)

    const form = event.target
    const formData = new FormData(form)
    const email = formData.get("email")

    try {
      const response = await axios.post(form.action, { email })
      setIsSubmitting(false)
      return setSuccess(response.data.success)
    } catch (error) {
      setIsSubmitting(false)

      if (error?.response?.data?.error) {
        return setError(error.response.data.error)
      }

      console.error(error)
      return setError("Nieoczekiwany błąd")
    }
  }

  if (success) {
    return (
      <PageLayout>
        <div className="text-center">
          <p data-testid="success-message">{success}</p>
          <p className="mt-4 text-sm text-gray-400">
            Odśwież stronę aby wrócić do formularza
          </p>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <form
        className="flex flex-col gap-4"
        action="/api/user"
        onSubmit={handleSubmit}
      >
        <fieldset disabled={isSubmitting}>
          <div>
            <label htmlFor="email-input" className="text-gray-400 text-sm ml-1">
              Email
            </label>
            <input
              name="email"
              type="text"
              id="email-input"
              className="border-2 border-gray-200 rounded-md flex items-center px-3 h-12 w-full"
              placeholder="twojemail@gmail.com"
            />
            {error && (
              <div
                className="text-red-500 text-sm ml-1"
                data-testid="error-message"
              >
                {error}
              </div>
            )}
          </div>
          <div className="mt-4">
            <button className="bg-sky-600 hover:bg-sky-700 text-white rounded-md flex items-center justify-center px-6 h-12 w-full">
              {isSubmitting ? "Przetwarzam..." : "Zarejestruj się"}
            </button>
          </div>
        </fieldset>
      </form>
    </PageLayout>
  )
}
