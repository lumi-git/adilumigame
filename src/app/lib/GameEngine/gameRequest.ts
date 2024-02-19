export class gameRequest {
    Type: string;
    ClientID: string;
    Metadata: any;
    RoomID : number;

    constructor(type: string) {
        this.Type = type;
        this.ClientID = "";
        this.RoomID  = -1;
        this.Metadata = {};
    }

    addMetadata(key: string, value: any) {
        this.Metadata[key] = value;
    }

    addObjectMetadata(value:any) {
        this.addMetadata("objectData", value);
    }

    setClientID(id: string) {
        this.ClientID = id;
    }

    getClientID():string {
        return this.ClientID;
    }

    static fromJSON(json: any) {
        let req = new gameRequest(json.Type);
        req.Type = json.Type;
        req.ClientID = json.ClientID;
        req.RoomID = json.RoomID;
        req.Metadata = json.Metadata;
        return req;
    }


}
