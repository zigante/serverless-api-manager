import { Context } from './classes';
import { Services } from './enums';
import { assertRequiredParamterWasProvided, getService } from './helpers';
import { IAction } from './interfaces';
import { AnyRecord, IResponse, ServerlessApiManagerProps } from './types';

export class ServerlessApiManager<Event = AnyRecord, ContextProps = Record<string, AnyRecord>> {
  private _action: IAction<ContextProps>;
  private _contextId: string;
  private _event: Event;
  private _service: Services;
  private _context = {} as ContextProps;
  private _logger: Console = console;

  constructor(props: ServerlessApiManagerProps<Event> = {}) {
    const { action, contextId, service, logger, event } = props;

    action && (this._action = action);
    contextId && (this._contextId = contextId);
    logger && (this._logger = logger);
    service && (this._service = service);
    event && (this._event = event);
  }

  withService = (service: Services) => {
    assertRequiredParamterWasProvided('service', service);
    this._logger.debug('Adding service...');

    this._service = service;
    return this;
  };

  withLogger = (logger: Console) => {
    assertRequiredParamterWasProvided('logger', logger);
    this._logger.debug('Adding logger...');

    this._logger = logger;
    return this;
  };

  withContextId = (id: string) => {
    this._contextId = id;
    return this;
  };

  withAction = (action: IAction<ContextProps>) => {
    assertRequiredParamterWasProvided('action', action);
    this._logger.debug('Adding action...');

    this._action = action;
    return this;
  };

  withEvent = (event: Event) => {
    assertRequiredParamterWasProvided('event', event);
    this._logger.debug('Adding event...');

    this._event = event;
    return this;
  };

  withContext = (context: ContextProps) => {
    assertRequiredParamterWasProvided('context', context);
    this._logger.debug('Adding context...');

    this._context = context;
    return this;
  };

  run = async () => {
    assertRequiredParamterWasProvided('event', this._event);
    assertRequiredParamterWasProvided('service', this._service);
    assertRequiredParamterWasProvided('action', this._action);

    const instance = new getService[this._service]();
    if (!instance) throw new Error(`Unknown service '${this._service}'`);

    const request = instance.build(this._event);
    const response = new IResponse();
    const context = new Context<ContextProps>({
      contextId: this._contextId,
      logger: this._logger,
      ...this._context,
    }) as Context & ContextProps;

    await this._action.execute({ ...request, context }, response);

    return instance.end({ body: response._body, headers: {}, status: response._code });
  };
}
