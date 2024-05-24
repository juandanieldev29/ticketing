import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@juandev/common";

import { indexTicketRouter } from "./routes/index";
import { createTicketRouter } from "./routes/new";
import { updateTicketRouter } from "./routes/update";
import { showTicketRouter } from "./routes/show";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
  signed: false,
  secure: process.env.NODE_ENV !== 'test'
}));

app.use(indexTicketRouter);
app.use(createTicketRouter);
app.use(updateTicketRouter);
app.use(showTicketRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
