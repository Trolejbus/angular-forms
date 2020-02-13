import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { AnimationType } from '../enums/animation-type.enum';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit, AfterViewInit {

  public lottieConfigEdit = {
    path: '../assets/animations/edit.json',
    renderer: 'canvas',
    autoplay: true,
    loop: true
  };

  public lottieConfigEditOk = {
    path: '../assets/animations/edit-ok.json',
    renderer: 'canvas',
    autoplay: true,
    loop: false
  };

  public lottieConfigEditWrong = {
    path: '../assets/animations/edit-wrong.json',
    renderer: 'canvas',
    autoplay: true,
    loop: false
  };

  @Input()
  public animation: AnimationType;
  @Input()
  public control: any;
  public AnimationType = AnimationType;

  private animEdit: any;
  private animEditOk: any;
  private animEditWrong: any;

  constructor() { }

  ngOnInit() {
    console.log(this.control);

  }

  ngAfterViewInit(): void {
    console.log(this.control);
  }

  public handleAnimationEdit(anim: any) {
    this.animEdit = anim;
  }

  public handleAnimationEditOk(anim: any) {
    this.animEditOk = anim;
    anim.addEventListener('enterFrame', function(frame){   
      if(frame.currentTime > 14) {
        anim.pause();
      }
    });
  }

  public handleAnimationEditWrong(anim: any) {
    this.animEditWrong = anim;
    anim.addEventListener('enterFrame', function(frame){   
      if(frame.currentTime > 14) {
        anim.pause();
      }
    });
  }
}
