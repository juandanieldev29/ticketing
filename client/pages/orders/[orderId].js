import { useEffect, useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  const createPayment = async (chargeId) => {
    try {
      await axios.post('/api/payments', {
        orderId: order.id,
        token: chargeId
      });
      Router.push('/orders');
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  }

  if (timeLeft < 0) {
    return (
      <div>Order Expired</div>
    )
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => createPayment(id)}
        stripeKey="pk_test_51PLuDe2N0fiS7hVtr7iDwK8NTJryJUHorhdbEVzwspr4dLhD6xE5USymlcEvpfRFIPDttg37txO2S32ZT8cuODvu00Z46vMLQS"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {errors.map((err) => <li key={err.message}>{err.message}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const response = await client.get(`/api/orders/${orderId}`);
  return { order: response.data };
}

export default OrderShow;
