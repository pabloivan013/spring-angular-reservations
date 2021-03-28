import { WeekDays } from "./schedule.model";
import { OperationTime } from './operationTime.model'
import { Type } from "class-transformer";

export class Day {

    day: WeekDays;

    open: boolean = false;

    @Type(() => OperationTime)
    operationTimes: OperationTime[] = [];

    constructor(day:WeekDays) {
        this.day = day
        this.operationTimes.push(new OperationTime())
    }

}