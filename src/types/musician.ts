import { Instrument } from "./instrument";
export interface Musician{
    id: number;
    email: string;
    name: string;
    instruments: Instrument[];
}