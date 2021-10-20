import { AnyRecord, Request } from '@/types';

export class IService<Event = AnyRecord, Return = AnyRecord> {
  build = (_event: Event): Request => {
    throw new Error('Not implemented');
  };
  end = (_result: IServiceResult): Return => {
    throw new Error('Not implemented');
  };
}

export interface IServiceResult {
  headers: Record<string, string>;
  body: AnyRecord;
  status: number;
}
