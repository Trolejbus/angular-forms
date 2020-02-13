import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { LottieAnimationViewModule } from 'ng-lottie';
import { AnimationComponent } from './animation/animation.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AnimationDirective } from './animation/animation-icon.directive';

@NgModule({
  declarations: [
    AppComponent,
    AnimationComponent,
    AnimationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    LottieAnimationViewModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AnimationComponent
  ]
})
export class AppModule { }
