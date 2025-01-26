from sqlalchemy import create_engine, MetaData

DATABASE_URL = "sqlite:///./pb_data/data.db"

engine = create_engine(DATABASE_URL)
metadata = MetaData()
metadata.reflect(bind=engine)
users_table = metadata.tables['cards']

def get_all_users():
    with engine.connect() as connection:
        result = connection.execute(users_table.select())
        return [dict(row._mapping) for row in result]

# Example usage
if __name__ == "__main__":
    users = get_all_users()
    for user in users:
        print(user)