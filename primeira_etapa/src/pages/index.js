import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  
  const baseURL = "https://doar-computador-api.herokuapp.com/";
  const [alive, setAlive] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setAlive(response.data);
    });
  }, []);

  const resposta = () => {
    if (alive) {
      return <p>API online</p>;
    }
    if (!alive) {
      return <p>API offline</p>;
    }
  };  

  return (
    <div>
      <h1>Doação de computadores usados</h1>
      {resposta()}
    </div>
  );
}
