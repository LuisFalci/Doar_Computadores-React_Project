// import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import DeviceForm from "../components/DeviceForm";

export default function Home() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [streetAddress, setstreetAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const [address, setAddress] = useState("");
  const [deviceQuantity, setDeviceQuantity] = useState("");

  const corrigeCep = (e) => {
    const number = e.target.value.replace(/\D/g, "");
    setZip(number);
  };

  const buscarCep = async () => {
    if (zip.length === 8) {
      return axios
        .get(`https://viacep.com.br/ws/${zip}/json`)
        .then(({ data }) => {
          setCity(data.localidade);
          setState(data.uf);
          setstreetAddress(data.logradouro);
          setNeighborhood(data.bairro);
        });
    }
  };

  const handleSubmit = async (e) => {
    axios
      .post("https://doar-computador-api.herokuapp.com/donation", {
        name: "luis",
        email: "luis@hotmail.com",
        phone: 2342342,
        zip: "luis",
        city: "luis",
        state: "luis",
        streetAddress: "luis",
        number: 123,
        complement: "luis",
        neighborhood: "luis",
        deviceCount: 2,
        devices: [
          { type: "luis", condition: "luis" },
          { type: "luis", condition: "luis" },
        ],
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    e.preventDefault();
  };

  const handleNextStep = () => setPage(1);

  const handleBackStep = () => setPage(0);
  
  console.log({lenght:deviceQuantity});

  return (
    <div>
      <h1>Doação de computadores usados</h1>
      <form onSubmit={handleSubmit}>
        {page === 0 && (
          <>
            <fieldset>
              <label>Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Telefone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </fieldset>

            <fieldset>
              <label>CEP:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                onChange={corrigeCep}
                onBlur={buscarCep}
                defaultValue={zip}
                maxLength="8"
              />

              <label>Cidade:</label>
              <input type="text" id="city" name="city" defaultValue={city} />

              <label>Estado:</label>
              <input type="text" id="state" name="state" defaultValue={state} />

              <label>Logradouro:</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                defaultValue={streetAddress}
              />

              <label>Numero:</label>
              <input
                type="text"
                id="number"
                name="number"
                defaultValue={number}
              />

              <label>Complemento:</label>
              <input
                type="text"
                id="complement"
                name="complement"
                defaultValue={complement}
              />

              <label>Bairro:</label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                defaultValue={neighborhood}
              />
            </fieldset>

            <button onClick={handleNextStep}>Proximo</button>
          </>
        )}

        {page === 1 && (
          <>
            <fieldset>
              <label>Número de Aparelhos:</label>
              <input
                type="number"
                id="deviceCount"
                name="deviceCount"
                min="1"
                max="999"
                defaultValue={deviceQuantity}
                onChange={(e) => setDeviceQuantity(e.target.value)}
              />
            </fieldset>

            {
              Array.from({length:deviceQuantity}).map((_,index) => (
                <DeviceForm key={index}/>
              ))
            }
                     
            <button onClick={handleBackStep}>Voltar</button>
            <input type="submit" />
          </>
        )}
      </form>
    </div>
  );
}
