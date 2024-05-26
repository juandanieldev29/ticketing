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

import { Order } from "../models/order";

const router = express.Router();

router.get('/api/orders/:orderId', currentUser, requireAuth, [
  param('orderId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
],
validateRequest,
async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate('ticket');
  if (!order) {
    throw new NotFoundError();
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  res.send(order);
});

export { router as showOrderRouter };
