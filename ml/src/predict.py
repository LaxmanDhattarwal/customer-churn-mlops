import joblib
import pandas as pd

MODEL_PATH = "ml/models/model.joblib"

model=joblib.load(MODEL_PATH)   
print("Model loaded Successfully!")
# print(model)

customer = {
    "gender": "Female",
    "SeniorCitizen": 0,
    "Partner": "Yes",
    "Dependents": "No",
    "tenure": 1,
    "PhoneService": "No",
    "MultipleLines": "No phone service",
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
    "MonthlyCharges": 29.85,
    "TotalCharges": 29.85
}
customer_df = pd.DataFrame([customer])

prediction = model.predict(customer_df)

probability = model.predict_proba(customer_df)

churn_probability = probability[0][1]

print(
    "Prediction:",
    "Churn" if prediction[0] == 1 else "No Churn"
)
print(
    "Churn Probability:",
    round(churn_probability * 100, 2),
    "%"
) 