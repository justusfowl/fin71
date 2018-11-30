import { User } from './user';


export class Project {
    projectId : number;
    userId : string; 
    projectTitle : string;
    projectCreatedAt: Date;
    projectIconPath : string;
    contributors : any[];

    sumTransactionsEur : number;

    constructor(fields : any) {

        this.userId = fields.userId; 
        this.projectId = fields.projectId;
        this.projectTitle = fields.projectTitle || '';
        this.projectCreatedAt = new Date(fields.projectCreatedAt) || new Date();
        this.projectIconPath = fields.projectIconPath || null;

        this.sumTransactionsEur = fields.sumTransactionsEur || 0;

        this.contributors = [];

        if (fields.contributors){
            this.castContributors(fields.contributors)
        }

    }

    castContributors(contributors){
        contributors.forEach(contrib => {
            this.contributors.push(new User(contrib));
        });
    }

    addContributor(reqUser: User){
        let userIndex = this.contributors.findIndex(x => x.userId == reqUser.userId); 
        if (userIndex == -1){
            this.contributors.push(reqUser);
        }
        
    }

    removeContributor(reqUser: User){
        let userIndex = this.contributors.findIndex(x => x.userId == reqUser.userId); 
        this.contributors.splice(userIndex, 1);
    }

}