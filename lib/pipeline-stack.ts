import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Repository } from "aws-cdk-lib/aws-codecommit";
import * as iam from "aws-cdk-lib/aws-iam";
import {
  CodePipeline,
  CodePipelineSource,
  CodeBuildStep,
} from "aws-cdk-lib/pipelines";
import { PipelineStage } from "./pipeline-stage";

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "WorkshopPipelinev2",
      synth: new CodeBuildStep("SynthStep", {
        input: CodePipelineSource.connection("Geranimo/lambdas-optimisation-sample", "main", {
          connectionArn: "arn:aws:codeconnections:us-west-2:818338972021:connection/a4cc8a42-495c-44b8-a5ce-25ff0ce25249"
        }),
        installCommands: ["npm install -g aws-cdk"],
        commands: [
          "npm ci",
          "npm run build",
          "npx cdk context --clear",
          "npx cdk synth",
        ],
        rolePolicyStatements: [
          new iam.PolicyStatement({
            actions: ["sts:AssumeRole"],
            resources: ["*"],
            conditions: {
              StringEquals: {
                "iam:ResourceTag/aws-cdk:bootstrap-role": "lookup",
              },
            },
          }),
        ],
      }),
    });

    const deploy = new PipelineStage(this, "Deployv2");
    const deployStage = pipeline.addStage(deploy);
  }
}
