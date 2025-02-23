import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.REACT_APP_WEB_SOCKET_URL, {
      transports: ["websocket", "polling"],
      withCredentials: true
    });
  }
  return socket;
};
