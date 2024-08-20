#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { PipelineStack } from "../lib/pipeline-stack";

const app = new cdk.App();

new PipelineStack(app, "LambdaPipelineStackV2", {
  env: {
    account: "818338972021",
    region: "us-west-2",
  },
});
