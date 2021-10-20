import { Services } from './enums';
import { assertRequiredParamterWasProvided, getService } from './helpers';
import { Context, IAction, IService } from './interfaces';
import { AnyRecord, Response } from './types';

export class ServerlessApiManager<Event = AnyRecord, ContextProps = Record<string, AnyRecord>> {
  private _action: IAction;
  private _contextId: string;
  private _event: Event;
  private _instance: IService;
  private _service: Services;
  private _context = {} as ContextProps;
  private _logger: Console = console;

  constructor(
    props: { event?: Event; action?: IAction; contextId?: string; logger?: Console; service?: Services } = {},
  ) {
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

  withAction = (action: IAction) => {
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
    const context = new Context<ContextProps>({ contextId: this._contextId, logger: this._logger, ...this._context });

    const request = instance.build(this._event);

    const response = new Response();
    await this._action.execute({ ...request, context }, response);

    return instance.end({ body: response._body, headers: {}, status: response._code });
  };
}
