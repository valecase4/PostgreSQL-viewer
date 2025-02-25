import psycopg2

class DatabaseConnection:
    """Context manager for PostgreSQL connection."""
    def __init__(self, db_url: str):
        self.db_url = db_url
        self.conn = None

    def __enter__(self):
        print("Try to open connection...")
        self.conn = psycopg2.connect(self.db_url)
        return self.conn
    
    def __exit__(self, exc_type, exc_value, traceback):
        if self.conn: 
            self.conn.close()
        print("Connection closed...")