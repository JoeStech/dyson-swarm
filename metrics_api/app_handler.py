import psycopg2
import json
import urllib.parse
import os

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
        parsed_body = urllib.parse.parse_qs(body)
        print(parsed_body)
        sql = """
                    INSERT INTO metrics 
                    (player_id, session_id, stage_completed, signed_up)
                    VALUES (%s, %s, %s, %s)
                """
        if parsed_body['signed_up'] == ['true']:
            signed_up = True
        else:
            signed_up = False
        cur.execute(sql, (parsed_body['player_id'][0], parsed_body['session_id'][0], int(parsed_body['stage_completed'][0]), signed_up))
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
