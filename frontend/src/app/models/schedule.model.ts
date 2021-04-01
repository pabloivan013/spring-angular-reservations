import { Type } from "class-transformer";
import { Day } from "./day.model";

export enum WeekDays {
    SUNDAY    = 0,
    MONDAY    = 1,
    TUESDAY   = 2,
    WEDNESDAY = 3,
    THURSDAY  = 4,
    FRIDAY    = 5,
    SATURDAY  = 6

}
export class Schedule {
  
    @Type(() => Day)
    days: Day[] = [];

    offset: number

    constructor() {
        // console.log("object keys", Object.keys(WeekDays));
        // console.log("typeof: ", typeof WeekDays[1]);
        // console.log("typeof: ", typeof WeekDays["MONDAY"]);
        const keys = Object.keys(WeekDays).filter(k => typeof WeekDays[k as any] === "number")//["SUNDAY"]
        const values = keys.map(k => WeekDays[k as any]); // [0, 1]
        // console.log("keys", keys);
        // console.log("values", values);
        keys.forEach(k => {
            this.days.push(new Day(WeekDays[k]))
        })
    }

}