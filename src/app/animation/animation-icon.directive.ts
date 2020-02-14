import { Directive, TemplateRef, ViewContainerRef, OnInit, ComponentFactoryResolver } from '@angular/core';
import { AnimationComponent } from './animation.component';
import { AnimationType } from '../enums/animation-type.enum';

@Directive({ selector: '[animation-icon]'})
export class AnimationDirective implements OnInit {
    private hasView = false;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit(): void {
        console.log(this.templateRef);
        console.log(this.viewContainer);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AnimationComponent);
        this.viewContainer.createEmbeddedView(this.templateRef);
        const componentRef = this.viewContainer.createComponent(componentFactory);

        (componentRef.instance as AnimationComponent).animation = AnimationType.EditOk;
        //(componentRef.instance as AnimationComponent).className = 'test';
    }

  
}