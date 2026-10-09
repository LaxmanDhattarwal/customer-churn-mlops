import { useState } from "react"
import { predictChurn } from "../services/api"


function Predict() {

  const [formData, setFormData] = useState({
    gender: "Female",
    SeniorCitizen: 0,
    Partner: "Yes",
    Dependents: "No",
    tenure: 1,
    PhoneService: "No",
    MultipleLines: "No phone service",
    InternetService: "DSL",
    OnlineSecurity: "No",
    OnlineBackup: "Yes",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "No",
    StreamingMovies: "No",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 29.85,
    TotalCharges: 29.85
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (event) => {

    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

 const handleSubmit = async (event) => {

  event.preventDefault()

  setLoading(true)
  setError("")
  setResult(null)

  try {

    const customerData = {
      ...formData,

      SeniorCitizen: Number(formData.SeniorCitizen),
      tenure: Number(formData.tenure),
      MonthlyCharges: Number(formData.MonthlyCharges),
      TotalCharges: Number(formData.TotalCharges)
    }

    console.log("Sending customer data:", customerData)

    const prediction = await predictChurn(customerData)

    console.log("Prediction result:", prediction)

    setResult(prediction)

  } catch (err) {

    console.error(err)

    setError("Unable to connect to prediction server.")

  } finally {

    setLoading(false)

  }
}

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold text-slate-800">
          Customer Churn Prediction
        </h1>

        <p className="mt-3 text-gray-600">
          Enter customer information to predict churn probability.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8"
      >

        <div className="grid md:grid-cols-2 gap-6">

          {/* Gender */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>


          {/* Senior Citizen */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Senior Citizen
            </label>

            <select
              name="SeniorCitizen"
              value={formData.SeniorCitizen}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>


          {/* Partner */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Partner
            </label>

            <select
              name="Partner"
              value={formData.Partner}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>


          {/* Dependents */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Dependents
            </label>

            <select
              name="Dependents"
              value={formData.Dependents}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>


          {/* Tenure */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Tenure (months)
            </label>

            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
              min="0"
            />
          </div>


          {/* Phone Service */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Phone Service
            </label>

            <select
              name="PhoneService"
              value={formData.PhoneService}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>


          {/* Multiple Lines */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Multiple Lines
            </label>

            <select
              name="MultipleLines"
              value={formData.MultipleLines}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="No phone service">
                No phone service
              </option>

              <option value="No">
                No
              </option>

              <option value="Yes">
                Yes
              </option>

            </select>
          </div>


          {/* Internet Service */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Internet Service
            </label>

            <select
              name="InternetService"
              value={formData.InternetService}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="DSL">DSL</option>
              <option value="Fiber optic">Fiber optic</option>
              <option value="No">No</option>
            </select>
          </div>


          {/* Online Security */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Online Security
            </label>

            <select
              name="OnlineSecurity"
              value={formData.OnlineSecurity}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">
                No internet service
              </option>
            </select>
          </div>


          {/* Online Backup */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Online Backup
            </label>

            <select
              name="OnlineBackup"
              value={formData.OnlineBackup}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">
                No internet service
              </option>
            </select>
          </div>


          {/* Device Protection */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Device Protection
            </label>

            <select
              name="DeviceProtection"
              value={formData.DeviceProtection}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">
                No internet service
              </option>
            </select>
          </div>


          {/* Tech Support */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Tech Support
            </label>

            <select
              name="TechSupport"
              value={formData.TechSupport}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">
                No internet service
              </option>
            </select>
          </div>


          {/* Streaming TV */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Streaming TV
            </label>

            <select
              name="StreamingTV"
              value={formData.StreamingTV}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">
                No internet service
              </option>
            </select>
          </div>


          {/* Streaming Movies */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Streaming Movies
            </label>

            <select
              name="StreamingMovies"
              value={formData.StreamingMovies}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="No internet service">
                No internet service
              </option>
            </select>
          </div>


          {/* Contract */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Contract
            </label>

            <select
              name="Contract"
              value={formData.Contract}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Month-to-month">
                Month-to-month
              </option>

              <option value="One year">
                One year
              </option>

              <option value="Two year">
                Two year
              </option>

            </select>
          </div>


          {/* Paperless Billing */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Paperless Billing
            </label>

            <select
              name="PaperlessBilling"
              value={formData.PaperlessBilling}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>


          {/* Payment Method */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Payment Method
            </label>

            <select
              name="PaymentMethod"
              value={formData.PaymentMethod}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="Electronic check">
                Electronic check
              </option>

              <option value="Mailed check">
                Mailed check
              </option>

              <option value="Bank transfer (automatic)">
                Bank transfer (automatic)
              </option>

              <option value="Credit card (automatic)">
                Credit card (automatic)
              </option>

            </select>
          </div>


          {/* Monthly Charges */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Monthly Charges
            </label>

            <input
              type="number"
              step="0.01"
              name="MonthlyCharges"
              value={formData.MonthlyCharges}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>


          {/* Total Charges */}

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Total Charges
            </label>

            <input
              type="number"
              step="0.01"
              name="TotalCharges"
              value={formData.TotalCharges}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

        </div>


        <div className="mt-10 text-center">

          <button
            type="submit"
            className="px-10 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
          >
            Predict Churn
          </button>

        </div>

      </form>
      {loading && (
  <div className="mt-8 text-center">
    <p className="text-blue-600 font-semibold">
      Predicting customer churn...
    </p>
  </div>
)}

{error && (
  <div className="mt-8 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center">
    {error}
  </div>
)}

{result && (
  <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 text-center">

    <h2 className="text-2xl font-bold text-slate-800">
      Prediction Result
    </h2>

    <div className="mt-6">

      <p
        className={`text-3xl font-bold ${
          result.prediction === "Churn"
            ? "text-red-600"
            : "text-green-600"
        }`}
      >
        {result.prediction === "Churn" ? "⚠ Churn" : "✓ No Churn"}
      </p>

      <div className="mt-6">

        <p className="text-4xl font-bold text-blue-600">
          {(result.churn_probability * 100).toFixed(2)}%
        </p>

        <p className="mt-2 text-gray-500">
          Churn Probability
        </p>

      </div>

      <div className="mt-6 max-w-md mx-auto">

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-blue-600 h-4 rounded-full transition-all duration-700"
            style={{
              width: `${result.churn_probability * 100}%`
            }}
          />

        </div>

      </div>

    </div>

  </div>
)}



    </div>
  )
}
export default Predict
