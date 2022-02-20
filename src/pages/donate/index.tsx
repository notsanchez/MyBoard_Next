import styles from './styles.module.scss';
import { useState } from 'react';
import head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import firebase from '../../services/firebaseConnection'

import { PayPalButtons } from '@paypal/react-paypal-js'

/// CLIENT ID = Af3aN9aPmXREXT2kY9IDkcASodPWbUZ7vXC3TzmISosR3BG2D9AsmInP8MPvpJY-KjmbPf6nldf2n4Dp

/// <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

interface DonateProps{
    user:{
        nome: string;
        id: string;
        image: string;
    }
}

export default function Donate({ user }: DonateProps ){
    const [vip, setVip] = useState(false);

    async function handleSaveDonate(){
        await firebase.firestore().collection('users')
        .doc(user.id)
        .set({
            donate: true,
            lastDonate: new Date(),
            image: user.image
        })
        .then(()=>{
            setVip(true);
        })
    }


    return(
        <>
            <head>
                <title>Ajude a plataforma MyBoard a ficar online!</title>
            </head>

            <main className={styles.container}>
                <img src="/images/rocket.svg" alt="" />

                {vip && (
                    <div className={styles.vip}>
                        <img src={user.image} alt="" />
                        <span>Parabéns você é um novo apoiador!</span>
                    </div>
                )}

                <h1>Seja um apoiador deste projeto! 🏆</h1>
                <h3>Contribua com apenas <span>R$ 1,00</span></h3>
                <strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>

                <PayPalButtons
                    createOrder={ (data,actions ) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount:{
                                    value: '1'
                                }
                            }]
                        })
                    }}
                    onApprove={ (data, actions) => {
                        return actions.order.capture().then(function(details){
                            console.log('Compra aprovada:' + details.payer.name.given_name);
                            handleSaveDonate();
                        })
                    }}

                />

            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })

    if(!session?.id){
        return{
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }

    const user = {
        nome: session?.user.name,
        id: session?.id,
        image: session?.user.image
    }

    return{
        props:{
            user
        }
    }

}