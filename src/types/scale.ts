export interface Scale {
    id: number;
    eventDate: string;
    musicians: {
      id: number;
      name: string;
      instrument: string;
    }[];
  }
  