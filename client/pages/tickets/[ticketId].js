import { useState } from "react";
import axios from "axios";
import Router from "next/router";

const TicketShow = ({ ticket }) => {
  const [errors, setErrors] = useState([]);

  const createOrder = async () => {
    try {
      const response = await axios.post('/api/orders', { ticketId: ticket.id });
      Router.push(`/orders/${response.data.id}`);
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  }

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {errors.map((err) => <li key={err.message}>{err.message}</li>)}
          </ul>
        </div>
      )}
      <button
        onClick={createOrder}
        className="btn btn-primary"
      >
        Purcharse
      </button>
    </div>
  )
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const response = await client.get(`/api/tickets/${ticketId}`);
  return { ticket: response.data };
}

export default TicketShow;
