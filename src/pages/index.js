import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const baseURL = "https://doar-computador-api.herokuapp.com/";
  const [alive, setAlive] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then(({ data }) => {
      setAlive(data.alive);
    });
  }, []);

  const resposta = () => {
    if (alive === true) {
      return <p>API online</p>;
    }
    if (alive === false) {
      return <p>API offline</p>
    }
  };
  
  return (
    <div>
      <h1>Doação de computadores usados</h1>
      {resposta()}
    </div>
  );
}
