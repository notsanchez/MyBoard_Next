import { GetStaticProps } from 'next';
import Head from 'next/head';
import styles from '../styles/styles.module.scss';
import { useState } from 'react';
import Link from 'next/link';
import { FaGit, FaGithub } from 'react-icons/fa'

import firebase from '../services/firebaseConnection';

type Data = {
  id: string,
  donate: boolean,
  lasDonate: Date,
  image: string,
}

interface HomeProps{
  data: string;
}


export default function Home({ data }: HomeProps ) {
  const [donaters, setDonaters] = useState<Data[]>(JSON.parse(data));

  return (
    <>
    <Head>
      <title>MyBoard - Organizando suas tarefas.</title>
    </Head>
    <main className={styles.contentContainer}>
      <img src="/images/board-user.svg" alt="" />

      <section className={styles.callToAction}>
        <h1>Uma ferramenta para seu dia a dia. <br/> Escreva, planeje e organize-se...</h1>
        <p>
          <span>100% Gratuita</span> e online.
        </p>
        <p>
          <Link href="https://github.com/notsanchez/MyBoard_NextJS">
            <button> <FaGithub className={styles.GitIcon}/> GitHub Repo</button>
          </Link>
        </p>
      </section>

      {donaters.length !== 0 && <h3>Apoiadores:</h3>}
      <div className={styles.donaters}>
      {donaters.map( item => (
        <img key={item.image} src={item.image} alt="" />
      ) )}
      </div>
    </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {

  const donaters = await firebase.firestore().collection('users').get();

  const data = JSON.stringify(donaters.docs.map( u => {
    return{
      id: u.id,
      ...u.data(),
    }
  }))

  return{
    props: {
      data
    },
    revalidate: 60 * 60
  }
  
}