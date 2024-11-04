export interface Scale {
  id: number;
  eventDate: string;
  createdBy: {
    id: number;
    name: string;
  };
  scaleMusicianInstruments: {
    id: number;
    musician: {
      id: number;
      name: string;
    };
    instrument: {
      id: number;
      name: string;
    };
  }[];
}
