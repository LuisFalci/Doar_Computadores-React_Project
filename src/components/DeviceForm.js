import { useState } from "react";
import styles from "./DeviceForm.module.css";
import PropsDevice from "./PropsDevice";

const DeviceForm = () => {
  const [formFields, setFormFields] = useState([{ type: "", condition: "" }]);
  const [deviceQuantity, setDeviceQuantity] = useState("");

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

  return (
    <div>
      <form onSubmit={submit}>
        <label>Quantidade:</label>
        <input
          id="deviceQuantity"
          name="deviceQuantity"
          onChange={(event) => addFields(event.target.value)}
        />

        {formFields.map((form, index) => {
          return (
            <div key={index}>
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
              <button onClick={() => removeFields(index)}>Remover Campo</button>
            </div>
          );
        })}
      </form>
      <button onClick={addFields}>Add more</button>
      <br />
      <button onClick={submit}>submit</button>
    </div>
  );
};

export default DeviceForm;

export function formFieldsData() {
  return formFields;
}
