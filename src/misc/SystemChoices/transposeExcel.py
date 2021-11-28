import pandas as pd
import json

SYS_NUM = 'System Number'
SYS = 'System'
SYS_PART_NUM = "System Part number"


df = pd.read_excel('./Systems 214 Final REV9.xlsx', sheet_name=0)

data = {}
data['systems'] = []


for i, row in df.iterrows():
    data['systems'].append({
        'label' : "SYS" + str(df[SYS_NUM][i]) + " " + df[SYS][i],
        'value': i,
        'data' : {
            'sysNumber': str(df[SYS_NUM][i]),
            'title': df[SYS][i],
            'partNumber': df[SYS_PART_NUM][i]
        }
    })

with open('systemChoices.json', 'w') as outfile:
    json.dump(data, outfile)