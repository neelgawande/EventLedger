import { CreateEventRequest } from "./event.types.js";

export class EventService {
    async createEvent(data:CreateEventRequest) {
        return {
            message: "Event received",
            data
        }
    }
}