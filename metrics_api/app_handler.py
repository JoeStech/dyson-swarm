import psycopg2
import json
import os
import hashlib

def handler(event, context):
    conn = psycopg2.connect(
        host=os.environ['DB_HOST'],
        database=os.environ['DB_NAME'],
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASSWORD']
    )
    cur = conn.cursor()

    print(event)
    if event['httpMethod'] == 'POST':
        body = event.get('body')
        parsed_body = json.loads(body)
        print(parsed_body)
        sql = """
                    INSERT INTO metrics 
                    (player_id, session_id, stage_completed, signed_up)
                    VALUES (%s, %s, %s, %s)
                """

        ip = event['requestContext']['identity']['sourceIp']

        # hash the ip address to create a player id
        player_id = hashlib.sha256(ip.encode()).hexdigest()
        print(f"player_id: {player_id}")
        
        cur.execute(sql, (player_id, parsed_body['session_id'], parsed_body['stage_completed'], parsed_body['signed_up']))
        conn.commit()

    return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'Content-Type': 'application/json',
            },
            'body': '{"status":"metrics stored"}'
        }
    
    
if __name__ == "__main__":
    # FOR LOCAL TESTING ONLY
    event = {'httpMethod': 'POST', 'body': 'none'}
    print(handler(event,{}))
