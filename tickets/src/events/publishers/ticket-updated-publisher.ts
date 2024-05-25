import { Publisher, Subjects, TicketUpdatedEvent } from "@juandev/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
