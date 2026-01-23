import pandas as pd
import sqlite3

conn = sqlite3.Connection('../database/app.db') 

preventiveActions = pd.read_sql_query("""--sql
    SELECT * FROM PreventiveAction WHERE ignore = 0                             
""", con=conn)

preventiveServiceOrders = pd.read_sql_query("""--sql
    SELECT COUNT(id), machineId, natureId, frequency, nextExecution FROM PreventiveAction WHERE ignore = 0   
    GROUP BY machineId, natureId, frequency, nextExecution                           
""", con=conn)

# print(preventiveActions.head())
# print(preventiveActions.shape)
# print(preventiveServiceOrders.head())
# print(preventiveServiceOrders.shape)

newPreventiveActions = pd.DataFrame(columns=['description', 'excution', 'preventiveOSId'])

for index, row in preventiveServiceOrders.iterrows():
    filtered = preventiveActions[
        preventiveActions['machineId'].eq(row['machineId']) &
        preventiveActions['natureId'].eq(row['natureId']) &
        preventiveActions['frequency'].eq(row['frequency']) &
        preventiveActions['nextExecution'].eq(row['nextExecution'])
    ]
    filtered['preventiveOSId'] = index
    
    actions = filtered[['description', 'excution', 'preventiveOSId']]
    newPreventiveActions = pd.concat([newPreventiveActions, actions])
    # break

print(newPreventiveActions)
 
with pd.ExcelWriter("PREVENTIVAS.xlsx", engine="openpyxl") as writer:
    preventiveServiceOrders.to_excel(writer, sheet_name="ORDENS DE SERVIÇO", index=True)
    newPreventiveActions.to_excel(writer, sheet_name="AÇÕES", index=True)