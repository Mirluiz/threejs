import {room} from "./room";

export type tour = {
  walls: Array<{
    id: string
    thickness: number
    bearing: number
    height: null
    lengthFormatted: string
    backEdge: null
    orphan: boolean
    hovered: boolean
  }>,
  corners: Array<{
    id: { x: number, y: number},
    x: number,
    y: number,
    wallStarts: Array<{
      id: string,
      thickness: number,
      bearing: number,
      height: null,
      lengthFormatted: string,
      backEdge: null,
      orphan: boolean,
      hovered: boolean
    }>,
    "wallEnds": [
      {
        id: string,
        thickness: number,
        bearing: number,
        height: null,
        lengthFormatted: string,
        backEdge: null,
        orphan: boolean,
        hovered: boolean
      }
    ]
  }>,
  rooms: Array<{
    corners: [
      {
        id: {x:number, y:number},
        x: number,
        y: number,
        wallStarts: Array<{
          id: string,
          thickness: number,
          bearing: number,
          height: null,
          lengthFormatted: string,
          backEdge: null,
          orphan: boolean,
          hovered: boolean
        }>,
        wallEnds: Array<{
          id: string,
          thickness: number,
          bearing: number,
          height: null,
          lengthFormatted: string,
          backEdge: null,
          orphan: boolean,
          hovered: boolean
        }>
      }
    ],
    "interiorCorners": Array<{
      x: number,
      y: number
    }>,
    "roomName": room
  }>,
  cameras: Array<{
    id: string,
    x: number,
    y: number,
    mergeAngle: number,
    angle: number,
    roomName: room,
    isActive: boolean,
    highlighted: boolean,
    visibleName: string
  }>,
  placements: {
    [key in room]: {
      id: string,
      roomName: string,
      type: number,
      visibleName: string,
      visibleNamePosition: null,
      isRoomNameShown: boolean,
      areDimensionsShown: boolean,
      dimensionIndex: number,
      dimensionsCache: Array<any>
    }
  }
}