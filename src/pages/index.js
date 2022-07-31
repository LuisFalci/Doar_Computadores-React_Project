import axios from "axios";
import { useState, useRef } from "react";

const index = () => {
  // Quantidade de Aparelhos
  const [deviceQuantity, setDeviceQuantity] = useState(0);

  // Feedback para o usuários
  const [messageError, setMessageError] = useState();
  const [load, setLoad] = useState();

  // foco input numero
  const ref = useRef(null);

  // Control steps (1 and 2)
  const [page, setPage] = useState(0);
  const handleNextStep = () => setPage(1);
  const handleBackStep = () => setPage(0);

  // states do formulário do usuário
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState("");
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [streetAddress, setstreetAddress] = useState();
  const [number, setNumber] = useState();
  const [complement, setComplement] = useState();
  const [neighborhood, setNeighborhood] = useState();

  // Step 1 (address)
  const corrigeCep = (e) => {
    const number = e.target.value.replace(/[^\d,.]+|[.,](?=.*[,.])/g, "");
    setZip(number);
    setLoad("");
    setMessageError("");
  };

  const buscarCep = async () => {
    setLoad("");
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
    } else {
      setMessageError("O CEP precisa de 8 digitos");
    }
  };

  // Step 2 - Formulário Devices
  const [formFields, setFormFields] = useState([]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
    console.log(formFields);
  };

  const addFields = () => {
    setDeviceQuantity(deviceQuantity + 1);

    let object = {
      type: "",
      condition: "",
    };

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    setDeviceQuantity(deviceQuantity - 1);
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const submit = (e) => {
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
      .then(() => {
        alert("Formulário enviado com sucesso");
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          alert("Problema com o Formulário, preencha novamente");
        } else {
          alert(
            "Comportamento inesperado do servidor, tente novamente mais tarde..."
          );
        }
      });

    e.preventDefault();
    e.preventDefault();
    console.log(formFields);
  };

  return (
    <div>
      <h1>Doação de computadores usados</h1>
      <form onSubmit={submit}>
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
                onBlur={() =>
                  setTimeout(buscarCep, 3000) && setLoad("Carregando")
                }
                value={zip}
                maxLength="8"
              />

              {load === "Carregando" && <p>Carregando</p>}
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
              <input
                type="text"
                id="state"
                name="state"
                defaultValue={state}
                onChange={(e) => setState(e.target.value)}
              />

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
            <h2>Aparelhos para doação: {deviceQuantity}</h2>
            {formFields.map((forms, index) => {
              return (
                <div key={index}>
                  <fieldset>
                    <label>Tipo:</label>
                    <select
                      name="type"
                      onChange={(event) => handleFormChange(event, index)}
                    >
                      <option value="" selected disabled hidden>
                        Escolha uma Opção
                      </option>
                      <option value="notebook">Notebook </option>
                      <option value="desktop">Desktop </option>
                      <option value="netbook">Netbook </option>
                      <option value="screen">Monitor </option>
                      <option value="printer">Impressora </option>
                      <option value="scanner">Scanner </option>
                    </select>
                    <label>Condição:</label>
                    <select
                      name="condition"
                      onChange={(event) => handleFormChange(event, index)}
                    >
                      <option value="" selected disabled hidden>
                        Escolha uma Opção
                      </option>
                      <option value="working">
                        Tem todas as partes, liga e funciona normalmente{" "}
                      </option>
                      <option value="notWorking">
                        Tem todas as partes, mas não liga mais{" "}
                      </option>
                      <option value="broken">
                        Faltam peças, funciona só as vezes ou está quebrado{" "}
                      </option>
                    </select>
                    <button type="button" onClick={() => removeFields(index)}>
                      Remover Campo
                    </button>
                  </fieldset>
                </div>
              );
            })}
            <button type="button" onClick={addFields}>
              Adicionar mais um campo
            </button>
            <br />
            <button onClick={handleBackStep}>Voltar</button>
            <br />
            <button type="button" onClick={submit}>
              Enviar
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default index;
