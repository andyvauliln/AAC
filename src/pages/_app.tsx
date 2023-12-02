import { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/main.css';
// import '../styles/awesome.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
