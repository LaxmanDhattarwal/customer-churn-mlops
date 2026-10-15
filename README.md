# Customer Churn Prediction — End-to-End MLOps Project

An end-to-end Machine Learning and MLOps project that predicts whether a telecom customer is likely to leave a service. The project combines data preprocessing, model training, experiment tracking, model serving, automated testing, containerization, and cloud deployment.

## Live Demo

- **Frontend:** https://customer-churn-frontend-sfxl.onrender.com
- **Backend API:** https://customer-churn-api-tadi.onrender.com
- **API Documentation:** https://customer-churn-api-tadi.onrender.com/docs
- **Model Metrics:** https://customer-churn-api-tadi.onrender.com/metrics

## Project Overview

Customer churn occurs when customers stop using a company's services. Identifying customers who may leave can help businesses improve retention and make better decisions.

This project uses a Logistic Regression classification model to predict customer churn from telecom customer information. A web interface allows users to submit customer details and view predictions, while the API exposes model predictions and evaluation metrics.

## Key Features

- Customer churn prediction using Machine Learning
- Data preprocessing and feature engineering
- Logistic Regression and Random Forest model experimentation
- MLflow experiment tracking and model registration
- DVC for dataset versioning
- FastAPI REST API for model inference
- React frontend for interactive predictions and metrics
- Docker-based containerization
- Automated API tests using pytest
- Cloud deployment using Render

## Technology Stack

- **Programming:** Python
- **Machine Learning:** pandas, scikit-learn
- **Experiment Tracking:** MLflow
- **Data Versioning:** DVC
- **Backend:** FastAPI, Uvicorn
- **Frontend:** React, Vite
- **Testing:** pytest
- **Containerization:** Docker
- **Deployment:** Render
- **Version Control:** Git and GitHub

## Dataset

This project uses the Telco Customer Churn dataset, which contains customer information, subscribed services, account details, and churn labels.

- **Total records:** 7,043
- **Original columns:** 21
- **Target variable:** `Churn`
- **Target values:** `Yes` and `No`
- **Preprocessing:** Converted `TotalCharges` to numeric values, handled missing values, and removed the `customerID` identifier.
- **Feature preparation:** Applied `StandardScaler` to numerical features and `OneHotEncoder` to categorical features.
- **Train-test split:** 80% training and 20% testing, using stratification and `random_state=42`.

## Machine Learning Models

Two classification algorithms were evaluated:

1. **Logistic Regression** — selected for the deployed prediction API.
2. **Random Forest Classifier** — evaluated as an alternative model.

The Logistic Regression model uses a scikit-learn pipeline with preprocessing and classification steps.

## Model Evaluation

The following results were obtained from the test dataset using Logistic Regression.

| Metric | Score |
|---|---:|
| Accuracy | 80.55% |
| Precision | 65.72% |
| Recall | 55.88% |
| F1-score | 60.40% |

### Confusion Matrix

| Actual / Predicted | No Churn | Churn |
|---|---:|---:|
| No Churn | 926 | 109 |
| Churn | 165 | 209 |

Accuracy measures overall correctness, while precision, recall, and F1-score help evaluate how well the model identifies customers who may churn. In a business setting, recall is particularly important because missed churn-risk customers may represent lost retention opportunities.

## Experiment Tracking and Data Versioning

- **MLflow:** Tracks model experiments and metrics and supports model registration.
- **Registered model:** `CustomerChurnModel`
- **DVC:** Tracks the dataset version and supports reproducible data management.

## Project Structure

```text
customer-churn-mlops/
├── frontend/              # React + Vite frontend
├── ml/
│   ├── data/              # Dataset and DVC tracking file
│   ├── models/            # Saved ML model artifacts
│   └── src/               # Preprocessing, training and API code
├── mlruns/                # MLflow experiment artifacts
├── notebooks/             # Jupyter notebooks
├── tests/                 # Automated tests
├── Dockerfile             # Backend Docker configuration
├── docker-compose.yml     # Multi-container configuration
├── requirements.txt       # Python dependencies
├── register_model.py      # Model registration script
└── README.md
```

## Getting Started

### Prerequisites

Install the following tools before running the project locally:

- Python 3.11 or a compatible Python version
- Node.js and npm
- Git
- Docker (optional, for containerized execution)

### 1. Clone the Repository

```bash
git clone https://github.com/LaxmanDhattarwal/customer-churn-mlops.git
cd customer-churn-mlops
```

### 2. Create a Python Virtual Environment

**Windows:**

```bash
python -m venv .venv
.venv\Scripts\activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Backend API

From the project root, run:

```bash
uvicorn ml.src.api:app --reload
```

The API should be available at:

- API root: http://127.0.0.1:8000/
- Interactive API documentation: http://127.0.0.1:8000/docs

### 5. Run the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173.

Configure the frontend's `VITE_API_URL` environment variable to point to your local backend API when needed.

## API Endpoints

The FastAPI backend exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API health or welcome response |
| POST | `/predict` | Predict customer churn |
| GET | `/metrics` | Retrieve model evaluation metrics |

### Example Prediction Request

Send a `POST` request to `/predict` with customer information in JSON format.

```json
{
  "gender": "Female",
  "SeniorCitizen": 0,
  "Partner": "Yes",
  "Dependents": "No",
  "tenure": 12,
  "PhoneService": "Yes",
  "MultipleLines": "No",
  "InternetService": "DSL",
  "OnlineSecurity": "No",
  "OnlineBackup": "Yes",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "No",
  "StreamingMovies": "No",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check",
  "MonthlyCharges": 65.5,
  "TotalCharges": 786.0
}
```

The API returns a churn prediction and its estimated probability. The example response below illustrates the response format; actual values depend on the supplied customer data.

```json
{
  "prediction": "Churn",
  "churn_probability": 0.6137
}
```

Explore and test the API interactively using the [Swagger UI](https://customer-churn-api-tadi.onrender.com/docs).

## Testing

Automated tests are included in the `tests/` directory.

Run the test suite from the project root:

```bash
pytest
```

## Docker

Build the backend Docker image from the project root:

```bash
docker build -t customer-churn-api .
```

Run the container:

```bash
docker run -p 8000:8000 customer-churn-api
```

The backend API will be available at http://127.0.0.1:8000.

If you want to run the services using Docker Compose, review the provided `docker-compose.yml` file and configure any required environment variables before starting the services.

## Deployment

The project is deployed using Render:

- The React frontend is hosted separately from the FastAPI backend.
- The frontend communicates with the backend through its configured API URL.
- The backend serves predictions and model metrics.

**Note:** Free hosting services may sleep when idle, so the first request can take longer while a service starts.

## Future Improvements

- Improve churn recall through model tuning and threshold optimization.
- Add model drift monitoring and data quality checks.
- Automate testing and deployment with a CI/CD pipeline.
- Add explainability tools to help interpret individual predictions.
- Explore additional classification models and compare their performance.

## Author

**Laxman Dhattarwal**

- GitHub: [LaxmanDhattarwal](https://github.com/LaxmanDhattarwal)

