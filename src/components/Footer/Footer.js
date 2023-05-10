import styles from "@/components/Footer/Footer.module.css"

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                Copyright &copy;{" "}
                <span>{new Date().getFullYear()}</span> by{" "}
                <a href="https://github.com/MaximilienFathi">
                    Maximilien Fathi
                </a>
                . All rights reserved.
            </p>
            <p>
                Powered by{" "}
                <a href="https://vercel.com">Vercel</a>{" "}
                and{" "}
                <a href="">Image Source</a>
            </p>
        </footer>
    )
}