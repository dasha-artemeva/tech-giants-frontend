import BaseService from "../BaseService";
import {
    CreateParticipationRequestDto,
    ParticipationRequestDto,
    ParticipationRequestFilters,
    ParticipationRequestSchema, PatchParticipantRequestDto
} from "./schemas.ts";
import {objectToFormData} from "../../utils/objectToFormData.ts";


export class ParticipationRequestService extends BaseService{
    path = 'members/participation-request/'

    public async get(id: number): Promise<ParticipationRequestDto>{
        const response = await this.request(
            (api) => api.get(`${this.path}${id}/`)
        );
        return ParticipationRequestSchema.parse(await response.json());
    }

    public async getAll(filters: ParticipationRequestFilters | null = null): Promise<ParticipationRequestDto[]>{
        const response = await this.request(
            (api) => api.get(`${this.path}`, {searchParams: filters}),
        );
        return ParticipationRequestSchema.array().parse(await response.json());
    }

    public async create(data: CreateParticipationRequestDto): Promise<ParticipationRequestDto>{
        const response = await this.request(
            (api) => api.post<ParticipationRequestDto>(`${this.path}`, {body: objectToFormData(data)})
        )
        return ParticipationRequestSchema.parse(await response.json());
    }

    public async patch(id: number, data: PatchParticipantRequestDto): Promise<ParticipationRequestDto>{
        const response = await this.request(
            (api) => api.patch<ParticipationRequestDto>(`${this.path}${id}/`, {json: data})
        );
        return ParticipationRequestSchema.parse(await response.json());
    }
}

export default ParticipationRequestService;

export const participationRequestService = new ParticipationRequestService();