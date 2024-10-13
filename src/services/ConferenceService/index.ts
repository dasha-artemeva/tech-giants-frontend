import {ConferenceDto, ConferenceSchema} from "./schemas.ts";
import {BaseService} from "../BaseService";

export class ConferenceService extends BaseService{
    path = 'conference/'
    public async get(): Promise<ConferenceDto>{
        const response = await this.request(
            (api) => api.get<ConferenceDto>(`${this.path}`)
        );
        return ConferenceSchema.parse(await response.json());
    }
}

export const conferenceService = new ConferenceService();
export default conferenceService;
