import { Type } from "class-transformer"
import { Reservation } from "./reservation.model"
import { Schedule } from "./schedule.model"
import { User } from "./user.model"

export class Business {
    
    name: string

    address: string 

    description: string 

    location: string 

    @Type(() => Schedule)
    schedule: Schedule = new Schedule()

    @Type(() => Reservation)
    reservations: Reservation[] = []

    @Type(() => User)
    user: User;

    constructor(){
        
    }
}