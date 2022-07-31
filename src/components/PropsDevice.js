import { useState } from "react";

const PropsDevice = ({ props }) => {
  const [deviceList, setDeviceList] = useState([]);
  const addDevice = () => {
    if (props.type != null && props.condition != null) {
      setDeviceList([
        ...deviceList,
        {
          type: type,
          condition: condition,
        },
      ]);
    }
  };

  addDevice;
  return deviceList;
};

export default PropsDevice;
