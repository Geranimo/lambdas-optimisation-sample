import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

function computePi(n: number): number {
  let pi = 0;
  for (let i = 0; i < n; i++) {
    pi += Math.pow(-1, i) / (2 * i + 1);
  }
  return pi * 4;
}

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  const n = 500000000; // Adjust this value for more or less compute intensity
  const result = computePi(n);
  console.log(`Result: ${result}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Function Result " + result,
    }),
  };
};
