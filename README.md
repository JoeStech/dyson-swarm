# dyson-swarm
An open source incremental hard science fiction game.

This is a game created for the AWS Game Builder Challenge hackathon. It can be played at

https://compellingsciencefiction.com/games/dysonswarm.html


## Deployment

Deployment consists of two parts:

1. The game itself, which is a static website built with HTML, CSS, and JavaScript. It is hosted on an S3 bucket and served through CloudFront, and deployed with the deploy.sh script.
2. The game metrics backend, which is a Python API built with AWS Lambda and API Gateway. It can be deployed by running `python deploy.py` in the metrics_api directory.

A prerequisite for deployment of the metrics backend is the AWS CDK CLI installed and configured, along with the AWS credentials configured for the account you wish to deploy to.


## Future improvements

mass rate expenditures in metrics panel
net mass rate in metrics panel
create button to slowly convert mining rigs instead of all at once
visual issue with buying cylinders in stage 4 when you don't have enough money 
final message doesn't fit mobile screen
fix mining platform cost when switching to mass driver company
don't allow fractions of a shipyard, etc in swarm stage
spot fix certain buttons for balance

## NOTES

10^24 tons is full swarm

3e+14 cylinders is full swarm

10,000,000,000 tons per cylinder

(7.08×10^8)*10.76 =7618080000 sq ft per cylinder

7618080000/200000 = 38090.4 sq ft per person for a 200,000 person cylinder