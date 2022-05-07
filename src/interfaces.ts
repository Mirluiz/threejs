type rooms = 'Bedroom' | 'Kitchen' | 'Living' | 'Closed Room';

export type _2d = {
  tour: {
    id: string,
    name: rooms,
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
    "roomName": rooms
  }>,
  cameras: Array<{
    id: string,
    x: number,
    y: number,
    mergeAngle: number,
    angle: number,
    roomName: rooms,
    isActive: boolean,
    highlighted: boolean,
    visibleName: string
  }>,
  placements: {
    [key in rooms]: {
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