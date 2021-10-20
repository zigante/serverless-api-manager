import { AnyRecord } from '@/types';
import { randomUUID } from 'crypto';

export class Context<Props = AnyRecord> {
  logger: Console;
  contextId: string;

  constructor(props: Context<Props> & Props) {
    const { contextId, logger } = props;
    this.logger = logger;
    this.contextId = contextId || randomUUID();
  }
}
