import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Android Marketplace
          </h1>

          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit!
          </p>

          <ul className={styles.grid}>
            <li className={styles.card}>
              <a href="#">
                <img src="" alt="Android Phone 1" />
                <h3>Android Phone 1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </a>
            </li>

            <li className={styles.card}>
              <a href="#">
                <img src="" alt="Android Phone 2" />
                <h3>Android Phone 2</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </a>
            </li>

            <li className={styles.card}>
              <a href="#">
                <img src="" alt="Android Phone 3" />
                <h3>Android Phone 3</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </a>
            </li>
          </ul>
        </main>

        <footer className={styles.footer}>
        </footer>
      </div>
  )
}