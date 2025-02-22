import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_BASE_URL, {
      transports: ["websocket"],
      withCredentials: true
    });
  }
  return socket;
};
