import { Services } from '@/enums';
import { IAction } from '@/interfaces';

export type ServerlessApiManagerProps<Event> = {
  event?: Event;
  action?: IAction;
  contextId?: string;
  logger?: Console;
  service?: Services;
};
