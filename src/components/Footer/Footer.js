import styles from "@/components/Footer/Footer.module.css";

//##############################################################################

/*
TODO:
Maybe modify content of the footer
*/
function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <p>
          Copyright &copy; <span>{new Date().getFullYear()}</span> by{" "}
          <a href="https://github.com/ma-fath">Maximilien Fathi</a>.
        </p>
        <p>All rights reserved.</p>
      </div>
      <p>
        Powered by <a href="https://vercel.com">Vercel</a> and{" "}
        <a href="https://www.vecteezy.com/">Vecteezy</a>
      </p>
    </footer>
  );
}

export default Footer;
