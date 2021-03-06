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
import { MoviesService } from './services/movies.service';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmailService } from './services/email.service';
import { CustomEmailValidator } from './validators/custom-email.validator';
import { DatePipe } from '@angular/common';
import { CoupleController } from './controllers/couple.controller';
import { GirlController } from './controllers/girl.controller';
import { BoyController } from './controllers/boy.controller';

@NgModule({
  declarations: [
    AppComponent,
    AnimationComponent,
    AnimationDirective,
    PictureComponentComponent,
    CoupleComponent,
    GirlComponent,
    BoyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    LottieAnimationViewModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    CalendarModule,
  ],
  providers: [
      MoviesService,
      EmailService,
      CustomEmailValidator,
      DatePipe,
      BoyController,
      GirlController,
      CoupleController,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AnimationComponent
  ]
})
export class AppModule { }
