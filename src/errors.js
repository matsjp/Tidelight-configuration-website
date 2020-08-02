export class DeviceNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "DeviceNotFoundError";
    }
  }

  export class NotConnectedError extends Error {
    constructor(message) {
      super(message);
      this.name = "NotConnected";
    }
  }