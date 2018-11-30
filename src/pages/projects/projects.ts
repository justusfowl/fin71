import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from '../../providers/services';
import { Project } from '../../models/project';
import { PopoverController } from 'ionic-angular';
import { SearchUserResultsPage } from '../search-user-results/search-user-results';
import { CreateProjectPage } from '../create-project/create-project';
import { User } from '../../models/user';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'ProjectsPage',
  segment: 'projects'
})

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html'
})
export class ProjectsPage implements OnInit {

  projects = []; 
  selectedProjectIndex : any; 
  searchTerm = ""; 

  contributorsPlaceholder = " + Nutzer hinzufügen"; 

  autoCompleteItems = [];

  selectedProjectTitle = ""; 
  selectedProjectContributors = [];
  isFullView : boolean = false; 


  constructor(
    private api: ApiService,
    public popoverController: PopoverController, 
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getProjects(); 
  }

  handleChanged(){
    console.log("changed")
  }

  createProject(evt){
    this.presentProjCreatePopover(evt)
  }

  presentProjCreatePopover(evt: any) {

    const popover = this.popoverController.create('CreateProjectPage');

    popover.onDidDismiss(res => {

      let harald = res; 

      if (res){
        let project = new Project({
          userId : this.auth.userId,
          projectTitle : res
        })
        let owner = new User({userId: this.auth.userId, userName : this.auth.userName}); 
        project.addContributor(owner)

        this.api.saveProject(project).then((resultProject : any) => {
            this.projects.push(new Project(resultProject));
            window.scrollTo(0, document.body.scrollHeight);
        });

      }
    })

    popover.present({
      ev: evt
    });

  }

  presentPopover(evt: any, project : Project) {

    let popover = this.popoverController.create('SearchUserResultsPage', {
      userSearch : evt.target.value,
      project : project
    });

    popover.onDidDismiss((data : any) => {

      console.log(data)
        
    });

    popover.present({
        ev: evt
    });
  }

  addProjectContrib(event, project: Project){
    project.addContributor(event)
    console.log(event)
  }

  removeProjectContrib(event, project: Project){
    project.removeContributor(event)
    console.log(event)
  }

  saveProject(event, project: Project){

    let projectItem = event.target.parentElement.parentElement; 
    let scrollContent = projectItem.parentElement.parentElement;

    scrollContent.classList.remove("fixed-view");

    projectItem.style.height = "auto";
    let styleStr = "translate(0,0)";

    projectItem.style.transform =  styleStr;    
    projectItem.classList.remove("full-view");

    this.isFullView = false;

    project.contributors = this.selectedProjectContributors; 
    project.projectTitle = this.selectedProjectTitle;

    this.updateProject(project);

  }

  projectClick(event, project : Project){

    if (!this.isFullView){

      this.isFullView = true;

      let isAtTop = false; 
      let isSaved = false;

      let projectItem = event.target.parentElement.parentElement; 

      let scrollContent = projectItem.parentElement.parentElement;

      scrollContent.classList.add("fixed-view");

      if (project){
        this.selectedProjectTitle = project.projectTitle; 
        this.selectedProjectContributors = project.contributors; 
      }else{

        isSaved = true;
      }

      
      
      if(projectItem.classList.contains("full-view")){
        isAtTop = true;
      }
      

      let headerOffset = <number>document.getElementsByTagName("ion-header")[0].getClientRects()[0]["height"]; 
      let itemTop = projectItem.getClientRects()[0]["top"];

      let windowHeight = window.innerHeight;

      let transformY = itemTop - headerOffset; 
      let styleStr = "translate(0,-" +  transformY.toString() + "px)";

      projectItem.style.transform =  styleStr;    
      projectItem.classList.toggle("full-view");

      if (isAtTop){
        projectItem.style.height = "auto";
      }else{
        projectItem.style.height = (windowHeight - headerOffset)*0.9999 + 'px';
      }

      

      let harald = event; 

      let res = 1 + 2 ;

      if (isSaved){
        alert("SAVE!")
        console.log(this.selectedProjectContributors);
        this.selectedProjectContributors = []; 
        this.selectedProjectTitle = ""; 
      } 
    }
  }

  getUserSearch(userSearch : string){

    if (userSearch.length >= 3){
      this.api.getUserSearch(userSearch).subscribe(
        (data : any) => {
  
          try{
            this.autoCompleteItems.length = 0; 
            data.forEach(element => {
                this.autoCompleteItems.push(new User(element))
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


  }

  selectProject(index){
    if (this.selectedProjectIndex == index){
      this.selectedProjectIndex = null; 
    }else{
      this.selectedProjectIndex = index; 
    }
    
  }

  getProjects(refresher?){
    this.api.getProjects().subscribe(
      (data : any) => {

        try{
            this.projects.length = 0; 
            
            data.forEach(element => {

              let project = new Project(element)

              this.projects.push(project);
            
            });

            if (refresher){
              refresher.complete();
            }

        }
        catch(err){
          console.log(err);
        } 

      },
      error => {
        this.api.handleAPIError(error);
      }
    )
  }

  checkIfProjectOwner(project : Project, contributor : User){

    if (project.userId == contributor.userId){
      return true;
    }else{
      return false;
    }

  }

  updateProject(project : Project){
    this.api.saveProject(project).then(() => {
      console.log("updated")
    })
  }

  removeContributor(project: Project, contributor : User){
    project.removeContributor(contributor);
    this.api.saveProject(project).then(() => {
      console.log("removed")
    })
  }

  searchChange(evt, project: Project){

    let userSearch = evt.target.value; 

    if (userSearch.length >= 3){
      this.presentPopover(evt, project);
    }else{
        console.log("please type in more than 3 digits")
    }
    
  }

}
