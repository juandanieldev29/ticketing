import request from "supertest";

import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "../../models/order";

it('marks an order as cancelled', async () => {
  const ticket = Ticket.build({
    title: 'Test',
    price: 10
  });
  await ticket.save();
  const user = global.signin();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);
  const { body: updatedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);
  expect(updatedOrder.status).toEqual(OrderStatus.Cancelled);
});

it('returns an error if one user tries to delete another users order', async () => {
  const ticket = Ticket.build({
    title: 'Test',
    price: 10
  });
  await ticket.save();
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});

it.todo('emits an order cancelled event')
