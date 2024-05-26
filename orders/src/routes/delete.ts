import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  NotAuthorizedError,
  NotFoundError,
  currentUser,
  requireAuth,
  validateRequest
} from "@juandev/common";
import { param } from "express-validator";

import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.delete('/api/orders/:orderId', currentUser, requireAuth, [
  param('orderId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
],
validateRequest,
async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  order.status = OrderStatus.Cancelled;
  await order.save();
  res.status(204).send(order);
});

export { router as deleteOrderRouter };
