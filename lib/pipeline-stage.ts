import { ApplicationStack } from "./application-stack";
import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { ParametersStack } from "./parameter-stack";

export class PipelineStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new ParametersStack(this, "param-stack-v2", {
      env: { account: "818338972021", region: "us-west-2" },
    });
    new ApplicationStack(this, "app-stack-v2", {
      env: { account: "818338972021", region: "us-west-2" },
    });
  }
}
