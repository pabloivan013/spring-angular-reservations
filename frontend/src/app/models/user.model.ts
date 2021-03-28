import { Exclude, Expose, ExposeOptions } from 'class-transformer'
import { Type } from "class-transformer";
import { Reservation } from "./index";
import { Business } from './business.model'
//import { Reservation } from './reservation.model';


export class User {

    @Expose()
    created: boolean = false;

    @Expose()
    name: string;

    @Expose()
    nickname: string;

    @Expose()
    email: string;

    @Expose()
    username: string;

    @Expose()
    picture: string;

    // @Expose()
    @Type(() => Business)
    business: Business[] = []

    @Expose()
    //@Type(() => Reservation)
    reservations: Reservation[] = []

    constructor() {
    }
}