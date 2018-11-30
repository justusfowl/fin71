
  export class Transaction {
    transactionId : number;
    projectId : number;
    transactionPayerUserId : string;
    transactionCreatorUserId : string;
    projectTitle : string;
    transactionTitle : string;
    transactionCreatedAt: Date;
    transactionAmt : number; 
    transactionCur : string; 
    transactionAmtOrig: number; 
    transactionCurOrig : string;
    typeId: number;
    
    constructor(fields : any) {
  
      this.transactionPayerUserId = fields.transactionPayerUserId; 
      this.transactionCreatorUserId = fields.transactionCreatorUserId; 
      this.transactionId = fields.transactionId;
      this.projectId = fields.projectId;
      this.projectTitle = fields.projectTitle || '';
      this.transactionTitle = fields.transactionTitle || '';
      this.transactionCreatedAt = new Date(fields.transactionCreatedAt) || new Date();

      this.transactionAmt = fields.transactionAmt;
      this.transactionCur = fields.transactionCur;
      this.transactionAmtOrig = fields.transactionAmtOrig;
      this.transactionCurOrig = fields.transactionCurOrig;
      this.typeId = fields.typeId;

    }
  
  }