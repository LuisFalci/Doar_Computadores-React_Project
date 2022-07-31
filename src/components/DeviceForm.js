import { useState } from "react";
import styles from "./DeviceForm.module.css";

const DeviceForm = () => {
  const [type, setType] = useState("");
  const [condition, setCondition] = useState("");

  return (
    <fieldset>
      <label>Tipo:</label>
      <input
        type="text"
        id="type"
        name="type"
        defaultValue={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        id="condition"
        name="condition"
        defaultValue={condition}
        onChange={(e) => setCondition(e.target.value)}
      />
    </fieldset>
  );
};

export default DeviceForm;
