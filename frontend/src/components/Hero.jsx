function Hero() {
  return (
    <section className="py-20 text-center">

      <h2 className="text-5xl font-bold text-slate-800">
        Customer Churn
      </h2>

      <span className="text-blue-600">Prediction System</span>

      <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
        Predict whether a telecom customer is likely to leave using an
        AI model built with FastAPI, MLflow, Docker and React.
      </p>

      <button className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
        Predict Now
        
      </button>

    </section>
  )
}

export default Hero