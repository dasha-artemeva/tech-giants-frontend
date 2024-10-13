import {HTTPError} from "ky";

class ServiceError<T> extends Error {
    error: HTTPError<T>
    data: {[key: string]: unknown}
    constructor(error, data) {
        super(error.message);
        this.name = 'ServiceError';
        this.error = error;
        this.data = data;
    }

    public get validation_errors(): {[key: string]: string[]}{
        return Object.entries(this.data).filter(
            ([k, v]) => !k.startsWith('__') && k !== 'detail'
        ) as {[key: string]: string[]};
    }

    public get is_validation_error(): boolean{
        return this.validation_errors.length > 0;
    }

    public get detail(): string | undefined {
        return this.data.detail as string | undefined;
    }

    public handle_errors(setError){
        if (this.is_validation_error){
            this.validation_errors.map(
                ([k, v]) => setError(k, {type: 'manual', message: v[0]}));
        }
        if (this.detail){
            setError('root.detail', {type: 'manual', message: this.detail});
        }
    }
}
export {ServiceError};
