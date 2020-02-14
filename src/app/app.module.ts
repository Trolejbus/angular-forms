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
import { PictureComponentComponent } from './picture-component/picture-component.component';
import { CoupleComponent } from './couple/couple.component';
import { GirlComponent } from './girl/girl.component';
import { BoyComponent } from './boy/boy.component';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesService } from './services/movies.service';

@NgModule({
  declarations: [
    AppComponent,
    AnimationComponent,
    AnimationDirective,
    PictureComponentComponent,
    CoupleComponent,
    GirlComponent,
    BoyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    LottieAnimationViewModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    DropdownModule,
    BrowserAnimationsModule
  ],
  providers: [
      MoviesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AnimationComponent
  ]
})
export class AppModule { }
