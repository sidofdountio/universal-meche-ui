import { AnotherCharge } from "./another-charge";

export interface Charge {
    id:number;
    totalSalaire:any;
    impot:any;
    loyer:any;
    ration:any;
    transport:any;
    electriciter:any;
    autreCharge:AnotherCharge;
}
