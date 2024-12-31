import requests

# Test data
payload = {
    'player_id': 'test_player_123',
    'session_id': 'test_session_2000',
    'stage_completed': '0',
    'signed_up': 'false'
}

# Send POST request to the API
r = requests.post('https://5clf7fssda.execute-api.us-west-2.amazonaws.com/prod/', data=payload)

# Print the response
print(r.status_code)
print(r.text)