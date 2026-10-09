export const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

export async function predictChurn(customerData) {

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(customerData)
  })

  if (!response.ok) {
    throw new Error("Prediction request failed")
  }

  const result = await response.json()

  return result
}