import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  @ViewChild(
    PlaceholderDirective, 
    {static: false}
    ) alertHost!: PlaceholderDirective;

    private closeSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    //Check if the user is in login mode or signup mode
    if(this.isLoginMode){
      authObs = this.authService.login(email, password)
    }
    else{
      authObs = this.authService.signup(email, password)
    }

    //Subscribe to the observable
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errMessage => {
        
        console.log(errMessage);
        this.error = errMessage;
        this.showErrorAlert(errMessage);
        this.isLoading = false;
      }
    );

    //Reset the form
    form.reset();
  }


  private showErrorAlert(message: string){
    const alertCmpFactory = 
    this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    //Create the component
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    //Set the message
    componentRef.instance.message = message;

    //Subscribe to the close event
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    }
    );
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}
