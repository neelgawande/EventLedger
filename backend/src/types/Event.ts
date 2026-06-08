export interface EventInput {
  serviceName:string
  eventType:string
  payloadHash:string
}

export interface Event {
  eventId:string
  serviceName:string
  eventType:string
  timestamp:string
  payloadHash:string
  eventHash:string
  batchId:string|null
}