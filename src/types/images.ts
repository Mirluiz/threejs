import {room} from "./room";

export type images = {
  tour: {
    id: string,
    name: room,
    activeRoom: string,
    rooms: {
      [key: string]: {
        type: string
        name: string
        filename: string
        url: string
        urlMobile: string
        thumbnail: string
      }
    }
  }
}
