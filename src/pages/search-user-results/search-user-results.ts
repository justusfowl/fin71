import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../providers/services';
import { NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { Project } from '../../models/project';

import { IonicPage } from 'ionic-angular';

@IonicPage({
  name : "SearchUserResultsPage"
})

@Component({
  selector: 'app-search-user-results',
  templateUrl: './search-user-results.html'
})
export class SearchUserResultsPage implements OnInit {

  public userArray : User[] = [];
  public contributorArray : User[] = [];
  public project : Project;

  constructor(
    private api: ApiService,
    private params: NavParams
  ) { 

    let userSearch= params.get('userSearch') as string;
    this.project = params.get('project') as Project;
    this.contributorArray = this.project.contributors;

    this.getUserSearch(userSearch);
  }

  ngOnInit() {

  }

  getUserSearch(userSearch : string){

    this.api.getUserSearch(userSearch).subscribe(
      (data : any) => {

        try{
          this.userArray.length = 0; 
          data.forEach(element => {
              this.userArray.push(new User(element))
          });
        }
        catch(err){

        } 

      },
      error => {
        this.api.handleAPIError(error);
      }
    )
  }

  saveProject(){
    
  }

  clickUser(user){

    if (!this.checkIfUserIsContributor(user)){
      this.project.contributors.push(user);
      this.api.saveProject(this.project).then(() => {
        console.log("stored")
      })
    }else{
      this.project.removeContributor(user);
      this.api.saveProject(this.project).then(() => {
        console.log("removed")
      })
    }

  }

  checkIfUserIsContributor(user : User){
    let userIndex = this.contributorArray.findIndex(x => x.userId == user.userId); 
    if (userIndex == -1){
      return false;
    }else{
      return true; 
    }
  }

}
