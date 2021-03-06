import * as connectTimeout from 'connect-timeout';

import { Middleware, NestMiddleware } from '@nestjs/common';

import { RequestHandler } from 'express';

@Middleware()
export class ConnectTimeoutMiddleware implements NestMiddleware {

    public static configure(timeout: string, opts?: connectTimeout.TimeoutOptions) {
        this.timeout = timeout;
        this.options = opts;
    }

    private static timeout: string;
    private static options: connectTimeout.TimeoutOptions;

    public resolve(...args: any[]): RequestHandler {
        if (ConnectTimeoutMiddleware.timeout) {
            return connectTimeout(ConnectTimeoutMiddleware.timeout, ConnectTimeoutMiddleware.options);
        } else {
            throw new Error('ConnectTimeoutMiddleware requires a timeout string in configure.');
        }
    }
}
