import ky, {HTTPError, KyInstance, ResponsePromise} from "ky";
import env from "../../env.ts";
import {ServiceError} from "../errors.ts";
import {ZodError} from "zod";

export class BaseService{
    private readonly api: KyInstance
    constructor() {
        this.api = ky.extend({prefixUrl: env.API_URL});
    }
    protected async request<T>(cb: (KyInstance) => ResponsePromise<T>){
        try{
            return await cb(this.api);
        } catch (e){
            if (e instanceof HTTPError){
                throw new ServiceError<T>(e, await e.response.json());
            }
            throw e
        }
    }
}

export default BaseService;
