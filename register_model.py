import mlflow

mlflow.set_tracking_uri("http://127.0.0.1:5000")

model_uri = "runs:/40e3a0acc39c4673852e73e27b6ae5c8/model"

registered_model = mlflow.register_model(
    model_uri,
    "CustomerChurnModel"
)

print("Model registered successfully!")
print("Name:", registered_model.name)
print("Version:", registered_model.version)