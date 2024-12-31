from aws_cdk import (
aws_lambda as lambda_,
aws_apigateway as apigw,
aws_ecr as ecr,
aws_certificatemanager as acm,
aws_route53 as route53,
Duration,
Stack)
from constructs import Construct
import os

class DysonSwarmStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        
        repo = ecr.Repository.from_repository_name(self, "dysonSwarmRepo", "gamesapi")
        
        dyson_swarm_lambda = lambda_.DockerImageFunction(self,
            "dysonSwarmLambda",
            code=lambda_.DockerImageCode.from_ecr(
                repository=repo,
                tag=os.environ["CDK_DOCKER_TAG"]
            ),
            memory_size=256,
            timeout=Duration.seconds(60),
            architecture=lambda_.Architecture.ARM_64
        )
        
        # do auth inside lambda
        api = apigw.LambdaRestApi(self,
            "dysonSwarm-endpoint",
            handler=dyson_swarm_lambda,
            default_cors_preflight_options=apigw.CorsOptions(allow_origins=["*"])
        )
        
        custom_domain = apigw.DomainName(
            self,
            "custom-domain",
            domain_name="gameapi.compellingsciencefiction.com",
            certificate=acm.Certificate.from_certificate_arn(self,'cert',"[cert ARN here]"),
            endpoint_type=apigw.EndpointType.EDGE
        )
        
        apigw.BasePathMapping(
            self,
            "base-path-mapping",
            domain_name=custom_domain,
            rest_api=api
        )
        
        hosted_zone = route53.HostedZone.from_hosted_zone_attributes(
            self,
            "hosted-zone",
            hosted_zone_id="[zone id here]",
            zone_name="compellingsciencefiction.com"
        )
        
        route53.CnameRecord(
            self,
            "cname",
            zone=hosted_zone,
            record_name="gameapi",
            domain_name=custom_domain.domain_name_alias_domain_name
        )