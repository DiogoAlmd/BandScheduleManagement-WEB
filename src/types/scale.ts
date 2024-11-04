export interface Scale {
  id: number;
  eventDate: string;
  createdBy: {
    id: number;
    name: string;
  };
  scaleMusician: {
    id: number;
    musician: {
      id: number;
      name: string;
    };
    instruments: {
      id: number;
      name: string;
    }[];
  }[];
}
