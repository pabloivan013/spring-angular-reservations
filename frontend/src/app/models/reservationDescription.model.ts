export class ReservationDescription {

    datePassed: boolean = false
    days: number = 0
    hours: number = 0
    minutes: number = 0

    constructor() {

    }

    public calculateDescription(date: Date) {
        let diff = Date.now() - date.getTime() 

        this.datePassed = (diff > 0) 
    
        diff = Math.abs(diff) / 1000 // Get seconds

        // calculate (and subtract) whole days
        this.days = Math.floor(diff / 86400);
        diff -= this.days * 86400;

        // calculate (and subtract) whole hours
        this.hours = Math.floor(diff / 3600) % 24;
        diff -= this.hours * 3600;

        // calculate (and subtract) whole minutes
        this.minutes = Math.floor(diff / 60) % 60;
    }
}