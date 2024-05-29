import styles from "@/components/footer/footer.module.css";

//##############################################################################

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
        Attributions: <a href="https://storyset.com/">Storyset</a> and{" "}
        <a href="https://www.vecteezy.com/">Vecteezy</a>
      </p>
    </footer>
  );
}

export default Footer;
