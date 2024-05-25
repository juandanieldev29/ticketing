import { Publisher, Subjects, TicketCreatedEvent } from "@juandev/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
