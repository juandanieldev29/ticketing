import { useState } from "react";
import axios from "axios";
import Router from "next/router";

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    try {
      await axios.post('/api/tickets', {
        title,
        price
      });
      Router.push('/');
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  }

  const onBlur = () => {
    const value = parseFloat(price);
    if (Number.isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  }

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            value={price}
            onBlur={onBlur}
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            <h4>Ooops....</h4>
            <ul className="my-0">
              {errors.map((err) => <li key={err.message}>{err.message}</li>)}
            </ul>
          </div>
        )}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default NewTicket;
