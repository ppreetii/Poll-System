import socketIO from 'socket.io-client';

const URL =  "http://localhost:5000";

class Socket {
  #_socket;

  connect() {
    this.#_socket = socketIO.connect(URL);
  }

  disconnect() {
    this.#_socket.disconnect();
  }

  get client() {
    if (!this.#_socket) this.connect();

    return this.#_socket;
  }
}

export const socket = new Socket();
