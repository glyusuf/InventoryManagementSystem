import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
   name:string ="";
  constructor(
    private route: ActivatedRoute,
    private welcomeDataService:WelcomeDataService
  ) { }

  ngOnInit() {
    this.name=this.route.snapshot.params['name'];
  }

  getWelcomeMessage(){
    console.log(this.welcomeDataService.executeHelloWroldService());
    this.welcomeDataService.executeHelloWroldService().subscribe(
      response => this.handleSuccessfullResponse(response)
    );
    console.log('last line of get welcome message');
  }

  handleSuccessfullResponse(response){
    console.log(response);
  }

}
