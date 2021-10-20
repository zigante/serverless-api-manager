import { Context } from '@/interfaces';
import { AnyRecord } from './';

export type ExecutorHandler<ContextProps = AnyRecord> = (
  request: Request<ContextProps>,
  response: Response,
) => Response | Promise<Response>;

export type Request<
  ContextProps = AnyRecord,
  Body = Record<string, string>,
  Headers = Record<string, string>,
  Params = Record<string, string>,
  Query = Record<string, string>,
> = {
  body: Body;
  headers: Headers;
  params: Params;
  query: Query;
  context: Context<ContextProps>;
};

export class Response {
  _code: number;
  _body: AnyRecord;
  _headers: Record<string, string>;

  headers = (data: Record<string, string>) => {
    this._headers = data;
    return this;
  };

  status = (data: number) => {
    this._code = data;
    return this;
  };

  json = (data: AnyRecord) => {
    this._body = data;
    return this;
  };

  send = (data: AnyRecord) => {
    this._body = data;
    return this;
  };
}
