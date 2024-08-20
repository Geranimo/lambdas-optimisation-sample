import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ssm from "aws-cdk-lib/aws-ssm";
import {readFileSync } from "fs";

export class ParametersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      const lambdaMemoryConfig = JSON.parse(readFileSync('./lambdaconfig.json').toString());
      console.log("Lambda config from file", lambdaMemoryConfig)

    const computePiFunctionName = "computePiService";
    const computePiServiceMemoryConfigParam = new ssm.StringParameter(
      this,
      "computePiService-parameter",
      {
        parameterName: "/lambda/function/" + computePiFunctionName + "/memory",
        stringValue: String(lambdaMemoryConfig[`${computePiFunctionName}`]),
      }
    );

    const computeFactorialFunctionName = "computeFactorialService";

    const computeFactorialServiceMemoryConfigParam = new ssm.StringParameter(
      this,
      computeFactorialFunctionName + "-system-parameter",
      {
        parameterName:
          "/lambda/function/" + computeFactorialFunctionName + "/memory",
        stringValue: String(lambdaMemoryConfig[`${computeFactorialFunctionName}`]),
      }
    );

    const matrixMultiplyFunctionName = "matrixMultiplyService";

    const matrixMultiplyServiceMemoryConfigParam = new ssm.StringParameter(
      this,
      matrixMultiplyFunctionName + "-system-parameter",
      {
        parameterName:
          "/lambda/function/" + matrixMultiplyFunctionName + "/memory",
        stringValue: String(lambdaMemoryConfig[`${matrixMultiplyFunctionName}`]),
      }
    );
  }
}
