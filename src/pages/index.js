import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState, useRef } from "react";
import Input from "../components/form/Input";




export default function Home() {
  // Quantidade de Aparelhos
  const [deviceQuantity, setDeviceQuantity] = useState(1);

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

  // String fixa para mensagem de erro de campo
  const invalidField = "Campo inválido!";

  // Variáveis que guardarão as respostar do backend
  const [fieldErrorMessage, setFieldErrorMessage] = useState("");
  const [fieldErrorRequired, setFieldErrorRequired] = useState([]);

  // Faz a validação do cep (elimina caracteres que não são números)
  const corrigeCep = (e) => {
    const number = e.target.value.replace(/[^\d,.]+|[.,](?=.*[,.])/g, "");
    setZip(number);
    setLoad("");
    setMessageError("");
  };

  // Busca o cep no endpoint "viacep" com o zip informado
  const buscarCep = async () => {
    setLoad("");
    setMessageError("");
    if (zip.length === 8) {
      setLoad("Carregando");
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
      setLoad("");
    } else {
      setMessageError("O CEP precisa de 8 digitos");
    }
  };

  // Step 2 - Formulário Devices
  const [formFields, setFormFields] = useState([
    {
      type: "",
      condition: "",
    },
  ]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
    // console.log(formFields);
  };

  // Adiciona um objeto a mais no state formFields (aumenta o número de campos)
  const addFields = () => {
    setDeviceQuantity(deviceQuantity + 1);

    let object = {
      type: "",
      condition: "",
    };

    setFormFields([...formFields, object]);
  };

  // Remove o campo que clicarmos, passando a referência (index) deste campo
  const removeFields = (index) => {
    setDeviceQuantity(deviceQuantity - 1);
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  // Envio do formulário para o backend
  const submit = async (e) => {
    const data = {
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
    };

    await axios
      .post("https://shrouded-cove-82832.herokuapp.com/donation", data)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setFieldErrorMessage("");
        alert("Formulário enviado com sucesso");
      })
      .catch(function (error) {
        if (error.response) {
          // console.log(error.response.data.erro);
          // console.log("Mensagem de erro: "+error.response.data.errorMessage);
          // console.log("Campos requeridos: "+error.response.data.requiredFields);

          setFieldErrorMessage(error.response.data.errorMessage);
          setFieldErrorRequired(error.response.data.requiredFields);

          // Ao utilizar a funão includes() nos campos, temos que garantir que quem a chamar seja uma string
          if (error.response.data.errorMessage === undefined) {
            setFieldErrorMessage("");
          }

          // Ao utilizar a funão some() nos campos, é preciso que quem o chama seja um array
          if (error.response.data.requiredFields === undefined) {
            setFieldErrorRequired([]);
          }
        } else {
          alert(
            "Houve um erro inesperado no servidor, tente novamente mais tarde."
          );
        }
      });
  };

  return (
    <div className={styles.home}>
      <h3 id={styles["alert_h3"]}>{fieldErrorMessage}</h3>
      <form className={styles.home}>
        {page === 0 && (
          <>
            <Input
              text="Nome"
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="ex: Luis"
              handleOnChange={(e) => setName(e.target.value)}
            />
            {fieldErrorRequired.some((elem) => elem === "name") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            {fieldErrorMessage.includes("name") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            <Input
              text="Email"
              type="text"
              name="email"
              id="email"
              value={email}
              placeholder="ex: luisgustavo.1999@hotmail.com"
              handleOnChange={(e) => setEmail(e.target.value)}
            />
            {fieldErrorRequired.some((elem) => elem === "email") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            {fieldErrorMessage.includes("E-mail") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            <Input
              text="Telefone"
              type="text"
              name="phone"
              id="phone"
              value={phone}
              placeholder="ex: 32988722948"
              handleOnChange={(e) => setPhone(e.target.value)}
            />
            {fieldErrorRequired.some((elem) => elem === "phone") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            {fieldErrorMessage.includes("phone") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            <label>
              <span>CEP:</span>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="ex: 36071240"
                onChange={corrigeCep}
                onBlur={() => buscarCep()}
                value={zip}
                maxLength="8"
                required
              />
            </label>
            {fieldErrorRequired.some((elem) => elem === "zip") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            {fieldErrorMessage.includes("zip") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            {load === "Carregando" && <p>Carregando</p>}
            {messageError != "" && <p>{messageError}</p>}
            <Input
              text="Cidade"
              type="text"
              name="city"
              id="city"
              value={city}
              placeholder="ex: Juiz de Fora"
              handleOnChange={(e) => setCity(e.target.value)}
            />
            {fieldErrorRequired.some((elem) => elem === "city") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            <Input
              text="Estado"
              type="text"
              name="state"
              id="state"
              value={state}
              placeholder="ex: MG"
              handleOnChange={(e) => setState(e.target.value)}
            />
            {fieldErrorRequired.some((elem) => elem === "state") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            {fieldErrorMessage.includes("state") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            <Input
              text="Logradouro"
              type="text"
              name="streetAddress"
              id="streetAddress"
              value={streetAddress}
              placeholder="ex: Rua Jorge Firmino"
              handleOnChange={(e) => setstreetAddress(e.target.value)}
            />
            {fieldErrorRequired.some((elem) => elem === "streetAddress") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            <label>
              <span>Numero:</span>
              <input
                ref={ref}
                type="text"
                id="number"
                name="number"
                defaultValue={number}
                placeholder="ex: 126"
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </label>
            {fieldErrorRequired.some((elem) => elem === "number") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            <Input
              text="Complemento"
              type="text"
              name="complement"
              id="complement"
              value={complement}
              placeholder="ex: Casa"
              handleOnChange={(e) => setComplement(e.target.value)}
            />
            {fieldErrorRequired.some((elem) => elem === "complement") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
            <Input
              text="Bairro"
              type="text"
              name="neighborhood"
              id="neighborhood"
              value={neighborhood}
              placeholder="ex: Santa Cândida"
              handleOnChange={(e) => setNeighborhood(e.target.value)}
            />
            {fieldErrorRequired.some((elem) => elem === "neighborhood") && (
              <p id={styles["alert"]}>{invalidField}</p>
            )}
          </>
        )}
        {page === 1 && (
          <>
            <h2>Aparelhos para doação: {deviceQuantity}</h2>
            {formFields.map((_, index) => {
              return (
                <div key={index} id={styles["card"]}>
                  <label>Tipo do Aparelho:</label>
                  <select
                    name="type"
                    onChange={(event) => handleFormChange(event, index)}
                    required
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
                  <label>Condição do Aparelho:</label>
                  <select
                    name="condition"
                    onChange={(event) => handleFormChange(event, index)}
                    required
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
                  <br />
                  {deviceQuantity > 1 && (
                    <>
                      <button type="button" onClick={() => removeFields(index)}>
                        Remover Campo
                      </button>
                      {fieldErrorRequired.some(
                        (elem) => elem === "devices"
                      ) && <p id={styles["alert"]}>{invalidField}</p>}
                    </>
                  )}
                </div>
              );
            })}

            <button type="button" onClick={addFields}>
              Adicionar mais um campo
            </button>
          </>
        )}
        {page === 0 && (
          <button type="button" onClick={handleNextStep}>
            Proximo
          </button>
        )}
        {page === 1 && (
          <>
            <button onClick={handleBackStep}>Voltar</button>
            <button type="button" onClick={submit}>
              Enviar
            </button>
          </>
        )}
      </form>
    </div>
  );
}
