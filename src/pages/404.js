import Head from "next/head";
import { useRouter } from "next/navigation";

import styles from "@/styles/404.module.css";

//##############################################################################

function Custom404() {
  const router = useRouter();

  const goBack = () => {
    router.back(); // This navigates back to the previous page in the browser history
  };

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Page Not Found - ASIC Marketplace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.mainContainer}>
        <img
          className={styles.errorImage}
          src={"/images/Oops! 404 Error with a broken robot-rafiki.png"}
          alt={""}
        />
        <button className={styles.goBackButton} onClick={goBack}>
          Go Back
        </button>
      </main>
    </div>
  );
}

export default Custom404;
