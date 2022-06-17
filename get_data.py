import requests
race_response = requests.get('https://ergast.com/api/f1/')
# race_data = race_response.json()
race_content = race_response.content
print(race_content)