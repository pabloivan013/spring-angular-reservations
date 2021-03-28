import { Type } from "class-transformer";
import { WeekDay } from "@angular/common"
import { User } from "./user.model";
import { Business } from "./business.model";
import { WeekDays } from "./schedule.model";
import { ReservationDescription } from "./reservationDescription.model";
//import { Business } from "./business.model";

export class Reservation {
    
    @Type(() => Date)
    createdAt: Date

    @Type(() => Date)
    updatedAt: Date

    @Type(() => Date)
    reservedAt: Date

    day: WeekDays

    @Type(() => User)
    user: User

    @Type(() => Business)
    business: Business

    description: ReservationDescription = new ReservationDescription()

    constructor() {}

    calculateDescription() {
        if (this.reservedAt)
            this.description.calculateDescription(this.reservedAt)
    }

    show() {
        return this.createdAt + ' ' + this.updatedAt
    }

}