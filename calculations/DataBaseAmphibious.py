import mysql.connector
import random
from datetime import datetime
import time

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="wamo"
)

cursor = db.cursor()

def generate_sensor_data():
    robot_id = 1
    pH_value = round(random.uniform(6.0, 8.5), 2)
    tds_value = round(random.uniform(0, 1000), 2)
    ec_value = round(random.uniform(0, 100), 2)
    temp_value = round(random.uniform(15.0, 28.0), 2)
    turbidity_value = round(random.uniform(0, 100), 2)
    nitrates_value = round(random.uniform(0, 50), 2)
    chloride_value = round(random.uniform(0, 100), 2)
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    latitude = str(43.20222153321171)  
    longitude = str(27.82633107870731)  
    return (robot_id, pH_value, tds_value, ec_value, temp_value, turbidity_value, nitrates_value, chloride_value, timestamp, latitude, longitude)

try:
    while True:
        sensor_data = generate_sensor_data()
        robot_id = sensor_data[0]

        cursor.execute("SELECT COUNT(*) FROM amphibious WHERE robot_id = %s", (robot_id,))
        result = cursor.fetchone()

        if result[0] > 0:
            query = """
            UPDATE amphibious
            SET pH_value = %s, tds_value = %s, ec_value = %s, temp_value = %s, turbidity_value = %s, nitrates_value = %s, chloride_value = %s, timestamp = %s, latitude = %s, longitude = %s
            WHERE robot_id = %s
            """
            cursor.execute(query, (*sensor_data[1:], robot_id))
            print(f"Updated reading for robot_id={robot_id} at {sensor_data[8]}")
        else:
            query = """
            INSERT INTO amphibious (robot_id, pH_value, tds_value, ec_value, temp_value, turbidity_value, nitrates_value, chloride_value, timestamp, latitude, longitude)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, sensor_data)
            print(f"Inserted new reading for robot_id={robot_id} at {sensor_data[8]}")

        db.commit()
        time.sleep(60)

except KeyboardInterrupt:
    print("Script stopped by user.")

finally:
    cursor.close()
    db.close()
    print("Database connection closed.")