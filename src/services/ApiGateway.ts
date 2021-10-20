import { IService, IServiceResult } from '@/interfaces';
import { Request } from '@/types';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export class ApiGateway extends IService<APIGatewayEvent, APIGatewayProxyResult> {
  build = (event: APIGatewayEvent): Request => {
    const { body, headers = {}, pathParameters = {}, queryStringParameters = {} } = event;

    return {
      body,
      headers,
      params: pathParameters,
      query: queryStringParameters,
    } as unknown as Request;
  };

  end = (result: IServiceResult): APIGatewayProxyResult => {
    const { body = '', headers = {}, status = 200 } = result;

    return {
      body: JSON.stringify(body),
      statusCode: status,
      headers,
    };
  };
}
