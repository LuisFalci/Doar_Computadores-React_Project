import Link from "next/link";
import styles from '../../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <ul className={styles.navbar}>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/instituicoes">
          <a>Instituições Parceiras</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>Sobre nós</a>
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
