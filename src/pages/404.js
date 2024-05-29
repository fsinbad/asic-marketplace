import Head from "next/head";
import { useRouter } from "next/navigation";

import styles from "@/styles/404.module.css";

//##############################################################################

function Custom404() {
  const router = useRouter();

  // Navigate back to the previous page in the browser history.
  function goBack() {
    router.back();
  }

  return (
    <div className={styles.pageContainer}>
      <Head>
        <meta
          name="description"
          content="ASIC Marketplace is your one-stop shop to find the perfect 
          ASIC miner and unlock your crypto mining potential."
        />
        <title>Page Not Found - ASIC Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </Head>

      <main className={styles.mainContainer}>
        <img
          className={styles.errorImage}
          src={"/images/Oops! 404 Error with a broken robot-rafiki.png"}
          alt={"Robot Lost! Error 404"}
        />
        <button className={styles.goBackButton} onClick={goBack}>
          Go Back
        </button>
      </main>
    </div>
  );
}

export default Custom404;
