import Link from "next/link";

const Home = ({ currentUser, tickets }) => {

  const ticketList = tickets.map(ticket => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  })

  return (
    <div>
      <h2>Tickets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {ticketList}
        </tbody>
      </table>
    </div>
  );
};

Home.getInitialProps = async (context, client, currentUser) => {
  const response = await client.get('/api/tickets');
  return { tickets: response.data };
};

export default Home;
