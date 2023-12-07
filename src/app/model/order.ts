import { Custormer } from "./custorme";

export interface Order {
    id:number;
    customer:Custormer;
    orderAt: Date | String;
    totalAmount: number;
}
