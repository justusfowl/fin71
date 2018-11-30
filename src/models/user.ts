
export class User{
    userId : string;
    userName : string; 
    userAvatarPath : string;

    constructor(fields : any) {

        this.userId = fields.userId; 
        this.userName = fields.userName  || null;
        this.userAvatarPath = fields.userAvatarPath || null;

    }

    getUserAvatarPath(){
        if (this.userAvatarPath){
            return this.userAvatarPath; 
        }else{
            return false;
        }
    }

}