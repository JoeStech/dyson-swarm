import os
import aws_cdk as cdk
import dyson_swarm_stack

app = cdk.App()
dyson_swarm_stack.DysonSwarmStack(app, "dyson-swarm")
app.synth()
