import mysql.connector
import random
import time

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="wamo"
)

cursor = db.cursor()

static_coords = {
    1: {"latitude": "43.202221", "longitude": "27.826331"},
    2: {"latitude": "44.202221", "longitude": "28.826331"},
    3: {"latitude": "45.202221", "longitude": "29.826331"}
}

def generate_buoy_data(buoy_id):
    water_temperature = str(round(random.uniform(0, 30), 2))
    sea_state = str(round(random.uniform(0, 10), 2))
    wavelength = str(round(random.uniform(0, 100), 2))
    wave_frequency = str(round(random.uniform(0, 10), 2))
    latitude = static_coords[buoy_id]["latitude"]
    longitude = static_coords[buoy_id]["longitude"]
    return (buoy_id, longitude, latitude, water_temperature, sea_state, wavelength, wave_frequency)

try:
    while True:
        for buoy_id in range(1, 4):
            buoy_data = generate_buoy_data(buoy_id)

            cursor.execute("SELECT COUNT(*) FROM buoys WHERE id = %s", (buoy_id,))
            result = cursor.fetchone()

            if result[0] > 0:
                query = """
                UPDATE buoys
                SET longitude = %s, latitude = %s, `water_temperature(C)` = %s, `sea_state(bal)` = %s, `wavelength(m)` = %s, `wave_frequency(Hz)` = %s
                WHERE id = %s
                """
                cursor.execute(query, (*buoy_data[1:], buoy_id))
                print(f"Updated data for buoy_id={buoy_id}")
            else:
                query = """
                INSERT INTO buoys (id, longitude, latitude, `water_temperature(C)`, `sea_state(bal)`, `wavelength(m)`, `wave_frequency(Hz)`)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(query, buoy_data)
                print(f"Inserted new data for buoy_id={buoy_id}")

            db.commit()
        time.sleep(60)

except KeyboardInterrupt:
    print("Script stopped by user.")

finally:
    cursor.close()
    db.close()
    print("Database connection closed.")