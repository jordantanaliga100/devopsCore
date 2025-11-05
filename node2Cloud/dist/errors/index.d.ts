export declare class AppError extends Error {
    message: string;
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number, isOperational?: boolean);
    status: string;
}
export declare const ErrorClass: {
    BadRequest: {
        new (message?: string): {
            message: string;
            statusCode: number;
            isOperational: boolean;
            status: string;
            name: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    Unauthorized: {
        new (message?: string): {
            message: string;
            statusCode: number;
            isOperational: boolean;
            status: string;
            name: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    Forbidden: {
        new (message?: string): {
            message: string;
            statusCode: number;
            isOperational: boolean;
            status: string;
            name: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    NotFound: {
        new (message?: string): {
            message: string;
            statusCode: number;
            isOperational: boolean;
            status: string;
            name: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    UnprocessableEntity: {
        new (message?: string): {
            message: string;
            statusCode: number;
            isOperational: boolean;
            status: string;
            name: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    InternalServer: {
        new (message?: string): {
            message: string;
            statusCode: number;
            isOperational: boolean;
            status: string;
            name: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    ServiceUnavailable: {
        new (message?: string): {
            message: string;
            statusCode: number;
            isOperational: boolean;
            status: string;
            name: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
};
//# sourceMappingURL=index.d.ts.map