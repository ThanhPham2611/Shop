import { io } from 'socket.io-client'
import { STORAGEKEY, getCookie } from '../cookie';

export const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ["websocket"],
  auth: {
    token: getCookie(STORAGEKEY.ACCESS_TOKEN)
  }
});