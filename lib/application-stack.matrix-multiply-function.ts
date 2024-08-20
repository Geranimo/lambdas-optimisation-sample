import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

const matrixMultiply = (a: number[][], b: number[][]): number[][] => {
  const aRows = a.length;
  const aCols = a[0].length;
  const bCols = b[0].length;

  const result: number[][] = [];
  for (let i = 0; i < aRows; i++) {
    result[i] = [];
    for (let j = 0; j < bCols; j++) {
      let sum = 0;
      for (let k = 0; k < aCols; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }

  return result;
};

export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  const matrixSize = 1000; // Adjust this value to increase or decrease the matrix size
  const a = Array.from({ length: matrixSize }, () =>
    Array.from({ length: matrixSize }, () => Math.random())
  );
  const b = Array.from({ length: matrixSize }, () =>
    Array.from({ length: matrixSize }, () => Math.random())
  );

  const result = matrixMultiply(a, b);
  console.log(`Result: ${result}`);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Matrix multiplication completed successfully.",
    }),
  };
};
