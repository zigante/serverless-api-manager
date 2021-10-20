import { Context } from '@/classes';
import { AnyRecord, StringRecord } from './';

export type ExecutorHandler<ContextProps = AnyRecord> = (
  request: IRequest<ContextProps>,
  response: IResponse,
) => IResponse | Promise<IResponse>;

export type IRequest<ContextProps = AnyRecord> = {
  body: StringRecord;
  context: Context & ContextProps;
  headers: StringRecord;
  params: StringRecord;
  query: StringRecord;
};

export class IResponse {
  _code: number;
  _body: AnyRecord;
  _headers: StringRecord;

  headers = (data: StringRecord) => {
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
