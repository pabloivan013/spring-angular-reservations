import { Transform, Type } from "class-transformer"

export class OperationTime {

    @Type(() => Date)
    start: Date = new Date(new Date().setHours(0,0,0,0))

    @Type(() => Date)
    end: Date   = new Date(new Date().setHours(0,10,0,0))

    @Type(() => Date)
    interval: Date   = new Date(new Date().setHours(0,5,0,0))

    intervalTime: number = 5

    constructor(){}

}