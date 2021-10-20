import { AnyRecord, ExecutorHandler } from '@/types';

export interface IAction<ContextProps = AnyRecord> {
  execute: ExecutorHandler<ContextProps>;
}
