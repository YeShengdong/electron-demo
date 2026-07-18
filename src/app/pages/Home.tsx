import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [count, setCount] = useState(0);
  const [device, setDevice] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    window.electronAPI.bluetoothPairingRequest((event, details) => {
      const response: Record<string, any> = {};

      switch (details.pairingKind) {
        case "confirm": {
          response.confirmed = window.confirm(
            `Do you want to connect to device ${details.deviceId}?`,
          );
          break;
        }
        case "confirmPin": {
          response.confirmed = window.confirm(
            `Does the pin ${details.pin} match the pin displayed on device ${details.deviceId}?`,
          );
          break;
        }
        case "providePin": {
          const pin = window.prompt(
            `Please provide a pin for ${details.deviceId}.`,
          );
          if (pin) {
            response.pin = pin;
            response.confirmed = true;
          } else {
            response.confirmed = false;
          }
        }
      }
      
      window.electronAPI.bluetoothPairingResponse(response);
    });

    return () => {
      window.electronAPI.cancelBluetoothRequest();
    };
  }, []);

  const handleClick = () => {
    console.log("点击了测试按钮");

    setCount(count + 1);
  };

  const handleTestBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });
      setDevice(device);
    } catch (error) {
      console.error("Error requesting Bluetooth device:", error);
    }
  };

  const handleCancelBluetooth = () => {
    window.electronAPI.cancelBluetoothRequest();
  };

  return (
    <div className="page">
      <h1>首页</h1>
      <p>这是应用的首页内容。当前点击次数：{count}</p>
      <button onClick={handleClick}>测试按钮</button>

      <button onClick={handleTestBluetooth}>ClickTest Bluetooth</button>
      <button onClick={handleCancelBluetooth}>Cancel Bluetooth Request</button>

      <p>
        Currently selected bluetooth device:{" "}
        <strong>{device?.name || `ID: ${device?.id || ""}`}</strong>
      </p>
    </div>
  );
};

export default Home;