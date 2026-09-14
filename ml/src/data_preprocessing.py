import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.metrics import confusion_matrix



DATA_PATH ="ml/data/WA_Fn-UseC_-Telco-Customer-Churn.csv"
df=pd.read_csv(DATA_PATH)

df["TotalCharges"]=pd.to_numeric(df["TotalCharges"],errors="coerce")
# print(df["TotalCharges"].dtype)
# print(df["TotalCharges"].isnull().sum())


# print(df[df["TotalCharges"].isnull()])

# print(df.loc[df["TotalCharges"].isnull(), ["customerID", "tenure", "MonthlyCharges", "TotalCharges", "Churn"]])

df["TotalCharges"]=df["TotalCharges"].fillna(0)
# print(df["TotalCharges"].dtype)
# print(df["TotalCharges"].isnull().sum())

df =df.drop(columns=["customerID"])

X=df.drop(columns=["Churn"])
y=df["Churn"]

y=y.map({
    "No":0,
    "Yes":1
})


print(X.shape)
print(y.shape)
print(X.head())
print(y.head())

X_train, X_test, y_train, y_test= train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
    
)
print("X_train:", X_train.shape)
print("X_test:", X_test.shape)
print("y_train:", y_train.shape)
print("y_test:", y_test.shape)

numerical_features = [
    "SeniorCitizen",
    "tenure",
    "MonthlyCharges",
    "TotalCharges"
]

categorical_features =[
    "gender",
    "Partner",
    "Dependents",
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
    "Contract",
    "PaperlessBilling",
    "PaymentMethod"
]

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numerical_features),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)
    ]
)
model = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("classifier", LogisticRegression(max_iter=1000))
    ]
)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

MODEL_PATH = "ml/models/model.joblib"

joblib.dump(model, MODEL_PATH)

print(f"Model saved to: {MODEL_PATH}")



# preprocessor.fit(X_train)

# X_train_processed = preprocessor.transform(X_train)
# X_test_processed = preprocessor.transform(X_test)

# print("X_train:", X_train.shape)
# print("X_test:", X_test.shape)

# print("Processed X_train:", X_train_processed.shape)
# print("Processed X_test:", X_test_processed.shape) 

print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))


cm =confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)   







