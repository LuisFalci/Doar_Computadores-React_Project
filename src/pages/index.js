// import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messageError, setMessageError] = useState("");
  const ref = useRef(null);
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
  const [deviceQuantity, setDeviceQuantity] = useState(1);

  // Step 1 (address)
  const corrigeCep = (e) => {
    const number = e.target.value.replace(/[^\d,.]+|[.,](?=.*[,.])/g, "");
    setZip(number);
  };

  const buscarCep = async () => {
    setMessageError("");
    if (zip.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${zip}/json`)
        .then(({ data }) => {
          if (data.erro === "true") {
            setMessageError("Cep não encontrado");
            return messageError;
          }
          setCity(data.localidade);
          setState(data.uf);
          setstreetAddress(data.logradouro);
          setNeighborhood(data.bairro);
          setMessageError("");
          ref.current.focus();
        })
        .catch(function () {
          setMessageError("Houve algum erro");
        });
    }
    setMessageError("O CEP precisa de 8 digitos");
  };

  // Step 2 (devices)
  const [formFields, setFormFields] = useState([{ type: "", condition: "" }]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
  };

  const addFields = (e) => {
    let numberDevices = parseInt(e);

    // for (let i = 0; i < numberDevices; i++) {
    let object = {
      type: "",
      condition: "",
    };
    setFormFields([...formFields, object]);
    // }
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  // Control steps (1 and 2)

  const handleNextStep = () => setPage(1);
  const handleBackStep = () => setPage(0);

  // Submit
  const handleSubmit = async (e) => {
    axios
      .post("https://doar-computador-api.herokuapp.com/donation", {
        name: name,
        email: email,
        phone: phone,
        zip: zip,
        city: city,
        state: state,
        streetAddress: streetAddress,
        number: number,
        complement: complement,
        neighborhood: neighborhood,
        deviceCount: deviceQuantity,
        devices: formFields,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log({
      name: name,
      email: email,
      phone: phone,
      zip: zip,
      city: city,
      state: state,
      streetAddress: streetAddress,
      number: number,
      complement: complement,
      neighborhood: neighborhood,
      deviceCount: deviceQuantity,
      devices: formFields,
    });
    e.preventDefault();
  };

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                value={zip}
                maxLength="8"
              />
              {messageError != "" && <p>{messageError}</p>}

              <label>Cidade:</label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <label>Estado:</label>
              <input type="text" id="state" name="state" defaultValue={state} 
              onChange={(e) => setState(e.target.value)}/>

              <label>Logradouro:</label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                defaultValue={streetAddress}
                onChange={(e) => setstreetAddress(e.target.value)}
              />

              <label>Numero:</label>
              <input
                ref={ref}
                type="text"
                id="number"
                name="number"
                defaultValue={number}
                onChange={(e) => setNumber(e.target.value)}
              />

              <label>Complemento:</label>
              <input
                type="text"
                id="complement"
                name="complement"
                defaultValue={complement}
                onChange={(e) => setComplement(e.target.value)}
              />

              <label>Bairro:</label>
              <input
                type="text"
                id="neighborhood"
                name="neighborhood"
                defaultValue={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </fieldset>

            <button onClick={handleNextStep}>Proximo</button>
          </>
        )}

        {page === 1 && (
          <>
            {formFields.map((form, index) => {
              return (
                <fieldset key={index}>
                  <label>Tipo:</label>
                  <input
                    name="type"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.type}
                  />
                  <input
                    name="condition"
                    onChange={(event) => handleFormChange(event, index)}
                    value={form.condition}
                  />
                  <button onClick={() => removeFields(index)}>
                    Remover Campo
                  </button>
                </fieldset>
              );
            })}
            <button onClick={addFields}>Adicionar Campo</button>
            <br />
            <button onClick={handleBackStep}>Voltar</button>
            <input type="submit" />
          </>
        )}
      </form>
    </div>
  );
}
