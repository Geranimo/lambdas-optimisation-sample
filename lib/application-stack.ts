import * as cdk from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { CfnSchedule, CfnScheduleGroup } from "aws-cdk-lib/aws-scheduler";
import {
  Effect,
  Policy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import * as ssm from "aws-cdk-lib/aws-ssm";
import { Duration } from "aws-cdk-lib";

export class ApplicationStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const computePiFunctionName = "computePiService";

    const computePiFunction = new NodejsFunction(this, "compute-pi-function", {
      functionName: "computePiService",
      memorySize: Number(
        ssm.StringParameter.valueFromLookup(
          this,
          "/lambda/function/" + computePiFunctionName + "/memory"
        )
      ),
      timeout: Duration.seconds(60),
    });

    const computeFactorialFunctionName = "computeFactorialService";

    const computeFactorialFunction = new NodejsFunction(
      this,
      "compute-factorial-function",
      {
        functionName: computeFactorialFunctionName,
        memorySize: Number(
          ssm.StringParameter.valueFromLookup(
            this,
            "/lambda/function/" + computeFactorialFunctionName + "/memory"
          )
        ),
        timeout: Duration.seconds(120),
      }
    );

    const matrixMultiplyFunctionName = "matrixMultiplyService";

    const matrixMultiplyFunction = new NodejsFunction(
      this,
      "matrix-multiply-function",
      {
        functionName: matrixMultiplyFunctionName,
        memorySize: Number(
          ssm.StringParameter.valueFromLookup(
            this,
            "/lambda/function/" + matrixMultiplyFunctionName + "/memory"
          )
        ),

        timeout: Duration.seconds(60),
      }
    );

    // need to create role and policy for scheduler to invoke the lambda function
    const schedulerRole = new Role(this, "scheduler-role", {
      assumedBy: new ServicePrincipal("scheduler.amazonaws.com"),
    });

    new Policy(this, "schedule-policy", {
      policyName: "ScheduleToInvokeLambdas",
      roles: [schedulerRole],
      statements: [
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ["lambda:InvokeFunction"],
          resources: [
            computePiFunction.functionArn,
            computeFactorialFunction.functionArn,
            matrixMultiplyFunction.functionArn,
          ],
        }),
      ],
    });

    // Create a group for the schedule (maybe you want to add more scheudles to this group the future?)
    const group = new CfnScheduleGroup(this, "schedule-group", {
      name: "SchedulesForLambda",
    });

    // Creates the schedule to invoke the lambda every 1 hour
    new CfnSchedule(this, "schedule-computepi-lambda", {
      groupName: group.name,
      flexibleTimeWindow: {
        mode: "OFF",
      },
      scheduleExpression: "rate(1 hour)",
      target: {
        arn: computePiFunction.functionArn,
        roleArn: schedulerRole.roleArn,
        retryPolicy: {
          maximumRetryAttempts: 2,
        },
      },
    });

    new CfnSchedule(this, "schedule-computefactorial-lambda", {
      groupName: group.name,
      flexibleTimeWindow: {
        mode: "OFF",
      },
      scheduleExpression: "rate(1 hour)",
      target: {
        arn: computeFactorialFunction.functionArn,
        roleArn: schedulerRole.roleArn,
        retryPolicy: {
          maximumRetryAttempts: 2,
        },
      },
    });

    new CfnSchedule(this, "schedule-matrix-multiply-lambda", {
      groupName: group.name,
      flexibleTimeWindow: {
        mode: "OFF",
      },
      scheduleExpression: "rate(1 hour)",
      target: {
        arn: matrixMultiplyFunction.functionArn,
        roleArn: schedulerRole.roleArn,
        retryPolicy: {
          maximumRetryAttempts: 2,
        },
      },
    });
  }
}
