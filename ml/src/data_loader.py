import pandas as pd
DATA_PATH="ml/data/WA_Fn-UseC_-Telco-Customer-Churn.csv"
df=pd.read_csv(DATA_PATH)

print(df.head())
print(df.shape)
print(df.columns)