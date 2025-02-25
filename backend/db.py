from connection import DatabaseConnection

def get_all_databases(db_url: str):
    """Retrieve all available databases on a PostgreSQL server"""
    query = "SELECT datname FROM pg_database WHERE datistemplate = false;"

    with DatabaseConnection(db_url) as conn:
        with conn.cursor() as cur:
            cur.execute(query)
            print("Proceed to execute the query...")
            databases = [row[0] for row in cur.fetchall()]
    
    return databases

def get_all_tables(db_url: str):
    """Retrieve all tables of a specified PostgreSQL database"""
    query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    tables_list = []

    with DatabaseConnection(db_url) as conn:
        with conn.cursor() as cur:
            cur.execute(query)

            for row in cur.fetchall():
                table_dict = {}
                table_name = row[0]
                table_dict["nome"] = table_name
                table_dict["columns"] = [{"name": f"{row[0]}", "type": row[1]} for row in get_all_columns(table_name, cur)]
                tables_list.append(table_dict)
        
    return tables_list

def get_all_columns(table_name: str, cur):
    """Get all columns names and data types from a given table"""
    query = f"""
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = '{table_name}'
    """

    cur.execute(query)
    return cur.fetchall()






