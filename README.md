# Serverless Api Manager

Optimized web framework for serverless environment

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

---

### To prevent the cold-start of serverless functions from getting too long, a good alternative is not to use [Express](https://www.npmjs.com/package/express) as it simulates the creation of an entire server and configures all routes and all middlewares of each of the routes, with only 1 being used.s

---

### Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).
Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install --save serverless-api-manager
```

### Usage

```ts
// index.ts

import type { APIGatewayEvent } from 'aws-lambda';
import AnyLoggerLibrary from 'any-logger-library';
import { ServerlessApiManager, Services } from 'serverless-api-manager';
import { MyAction } from './actions/my-action';
import { IContext } from './interfaces/IContext';

export const handler = async (event: APIGatewayEvent) => {
  const manager = new ServerlessApiManager<APIGatewayEvent, IContext>()
    .withEvent(event)
    .withService(Services.API_GATEWAY)
    .withContextId('13245-12345-13245-12345')
    .withLogger(new AnyLoggerLibrary())
    .withContext({ appName: 'my-example' })
    .withAction(new MyAction());

  return manager.run();
};
```

```ts
// interfaces/IContext.ts

export interface IContext {
  appName: string;
}
```

```ts
// actions/my-action.ts

import { IContext } from '../interfaces/IContext';

export class MyAction implements IAction<IContext> {
  execute: ExecutorHandler<IContext> = (request, response) => {
    const { body, context, headers, params, query } = request;
    context.logger.debug(`Initializing my action: ${context.appName}`);

    // ALL YOUR CODE GOES HERE

    context.logger.debug('Sending my response');
    return response
      .headers({ ...headers, 'content-type': 'application/json' })
      .status(200)
      .json({ foo: 'bar', body, params, query });
  };
}
```

[npm-image]: https://img.shields.io/npm/v/serverless-api-manager
[npm-url]: https://npmjs.org/package/serverless-api-manager
[downloads-image]: https://img.shields.io/npm/dm/serverless-api-manager.svg
[downloads-url]: https://npmcharts.com/compare/serverless-api-manager?minimal=true
[repository-url]: https://github.com/zigante/serverless-api-manager#readme
