import subprocess
import os
import shlex

REPO_NAME = 'gamesapi'
ACCOUNT_ID = os.environ['ACCOUNT_ID']
REGION = 'us-west-2'

with open('version.txt', 'r') as f:
    version = int(f.read())
    
os.environ['CDK_DOCKER_TAG'] = f"v{version}"

print("logging in to ecr")
subprocess.check_output(f"aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin {ACCOUNT_ID}.dkr.ecr.{REGION}.amazonaws.com", shell=True)
print("building container")
subprocess.check_output(f"docker build --platform linux/arm64 --provenance=false -t {REPO_NAME} .", shell=True)
print("tagging and pushing container")
subprocess.check_output(f"docker tag {REPO_NAME}:latest {ACCOUNT_ID}.dkr.ecr.{REGION}.amazonaws.com/{REPO_NAME}:v{version}", shell=True)
subprocess.check_output(f"docker push {ACCOUNT_ID}.dkr.ecr.{REGION}.amazonaws.com/{REPO_NAME}:v{version}", shell=True)

with open('version.txt', 'w') as f:
    f.seek(0)
    f.write(str(version+1))

os.chdir('cdk')
subprocess.check_output(f"export CDK_DOCKER_TAG={os.environ['CDK_DOCKER_TAG']}; cdk deploy --require-approval never", shell=True)