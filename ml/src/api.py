import joblib
import pandas as pd


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

MODEL_PATH = "ml/models/model.joblib"

model = joblib.load(MODEL_PATH)

app= FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CustomerData(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float
    
    

@app.get("/")
def home():
    return {"message":"Customer churn API is running"}

@app.post("/predict")
def predict_churn(customer: CustomerData):
    customer_df =pd.DataFrame([customer.model_dump()])
    prediction = model.predict(customer_df)[0]
    
    probability = model.predict_proba(customer_df)[0][1]
    
    return {
        "prediction": "Churn" if prediction == 1 else "No Churn",
        "churn_probability": round(float(probability), 4)
    }

@app.get("/metrics")
def get_metrics():
    return {
        "model": "Logistic Regression",
        "accuracy": 0.8055358410220014,
        "precision": 0.6572327044025157,
        "recall": 0.5588235294117647,
        "f1_score": 0.6040462427745664
        
    }  