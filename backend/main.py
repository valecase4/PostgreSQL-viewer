from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db import get_all_databases, get_all_tables
from typing import List
import uvicorn

app = FastAPI(debug=True)

DB_URL = "user='postgres' password='root' host='localhost' port='5432' dbname='postgres'"

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class MyDatabase(BaseModel):
    name: str
    url: str = None

    def model_post_init(self, __context):
        self.url = f"user='postgres' password='root' host='localhost' port='5432' dbname='{self.name}'"

class Databases(BaseModel):
    databases: List[MyDatabase]

class Table(BaseModel):
    name: str
    columns: List[dict[str, str]]

dbs = [MyDatabase(name=db) for db in get_all_databases(DB_URL)]

@app.get("/")
def main():
    return Databases(databases=dbs)

@app.get("/{db_name}")
def get_db_details(db_name):
    db = MyDatabase(name=db_name)
    all_tables = [Table(name=t['nome'], columns=t['columns']) for t in get_all_tables(db.url)]
    return {"tables": all_tables}

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=8000)