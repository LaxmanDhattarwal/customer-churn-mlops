import { useEffect, useState } from "react"
import { API_URL } from "../services/api"
function Analytics() {
    const [metrics, setMetrics] = useState(null)
    const [error, setError] = useState("")
    useEffect(() => {

    fetch(`${API_URL}/metrics`)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch metrics")
        }

        return response.json()
      })
      .then((data) => {
        setMetrics(data)
      })
      .catch((error) => {
        console.error(error)
        setError("Unable to load model metrics.")
      })

  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Analytics Dashboard
        </h1>

        <p className="mt-3 text-gray-600">
          Monitor customer churn and model performance.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Model Accuracy
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {metrics ? `${(metrics.accuracy * 100).toFixed(2)}%` : "Loading..."}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Precision
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {metrics ? `${(metrics.precision * 100).toFixed(2)}%` : "Loading..."}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Recall
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {metrics ? `${(metrics.recall * 100).toFixed(2)}%` : "Loading..."}
          </h2>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">

  <p className="text-gray-500">
    F1 Score
  </p>

  <h2 className="text-3xl font-bold text-blue-600 mt-2">
    {metrics
      ? `${(metrics.f1_score * 100).toFixed(2)}%`
      : "Loading..."}
  </h2>

</div>

{metrics && (
  <div className="mt-8 bg-white rounded-2xl shadow p-6">

    <p className="text-gray-500">
      Active Model
    </p>

    <h2 className="text-2xl font-bold text-slate-800 mt-2">
      {metrics.model}
    </h2>

  </div>
)}

        

      </div>

    </div>
  )
}

export default Analytics