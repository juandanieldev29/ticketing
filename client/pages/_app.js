import "bootstrap/dist/css/bootstrap.css";

import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component {...pageProps} currentUser={currentUser} />
      </div>
    </div>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  const axiosClient = buildClient(appContext.ctx);
  const response = await axiosClient.get('/api/users/currentuser');
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      axiosClient,
      response.data.currentUser
    );
  }
  return {
    pageProps,
    ...response.data
  }
};

export default AppComponent;
