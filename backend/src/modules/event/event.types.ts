export interface CreateEventRequest{
    serviceName: string
    eventType: string
    payload: Record<string,unknown>
}