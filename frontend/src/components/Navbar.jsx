import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ChurnAI
        </Link>

        <div className="flex gap-6 text-gray-700 font-medium">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/predict"
            className="hover:text-blue-600"
          >
            Predict
          </Link>

          <Link
            to="/analytics"
            className="hover:text-blue-600"
          >
            Analytics
          </Link>

        </div>

      </div>

    </nav>
  )
}

export default Navbar