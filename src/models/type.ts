export class Type {
    typeId : number;
    userId : string; 
    typeTitle : string;
    typeIcon: string;

    constructor(fields : any) {

        this.userId = fields.userId; 
        this.typeId = fields.typeId;
        this.typeTitle = fields.typeTitle || 'Projekt';
        this.typeIcon = fields.typeIcon || 'paper-plane';;

    }

}