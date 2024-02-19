export class clientState {
    driverID:number;
    end:number;
    id:string;

    constructor(id:string){
        // -1 = undefined
        this.driverID = -1;
        this.end = -1;
        this.id = id;
    }

    setdriverIDt(driverID:number){
        this.driverID = driverID;
    }
    setEnd(end:number){
        this.end = end;
    }
    getdriverID(){
        return this.driverID;
    }
    getEnd(){
        return this.end;
    }

    updateFromJSON(data:any){
        this.driverID = data.driverID;
        this.end = data.end;
    }


    toJSON(){
        return {
            start: this.driverID,
            end: this.end,
            id: this.id
        }
    }

}