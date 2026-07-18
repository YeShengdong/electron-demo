export {};

declare global {
  interface Window {
    versions: {
      node: () => string;
      chrome: () => string;
      electron: () => string;
    };
    electronAPI: {
      cancelBluetoothRequest: () => void;
      bluetoothPairingRequest: (
        callback: (event: any, details: Record<string, any>) => void,
      ) => void;
      bluetoothPairingResponse: (response: Record<string, any>) => void;
    };
  }
}
