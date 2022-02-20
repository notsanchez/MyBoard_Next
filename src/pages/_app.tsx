import { AppProps } from 'next/app';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import '../styles/global.scss';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client'; 


const initialOptions = {
  "client-id": "Af3aN9aPmXREXT2kY9IDkcASodPWbUZ7vXC3TzmISosR3BG2D9AsmInP8MPvpJY-KjmbPf6nldf2n4Dp",
  currency: "BRL",
  intent: "capture"
};


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header/>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  )
}

export default MyApp
