import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "../styles/About.module.css";

const about = () => {
  return (
    <>
      <Head>
        <title>Página Sobre nós</title>
      </Head>
      <div className={styles.about}>
        <h1>O que fazemos</h1>
        <p>
          Nosso site destina-se à ajudar aqueles que mais necessitam de um
          computador. Com um intuito filantrópico, realizamos a entrega dos
          aparelhos para as instituições cadastradas em nosso banco. Por meio de
          um formulário, você pode fazer a doação de quantos aparelhos quiser.
        </p>
        <p>Que tal fazer parte deste projeto?</p>
       
        <Link href="/">
          <a>Clique aqui para doar!</a>
        </Link>
      </div>
    </>
  );
};

export default about;
