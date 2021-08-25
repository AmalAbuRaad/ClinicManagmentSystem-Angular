import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHidden]'
})
export class AppHiddenDirective {

  @Input('appHidden')
  set hiddenValue(value:boolean){
    if(!value){
      this.container.createEmbeddedView(this.element);
    }
    else{
      this.container.clear()
    }
  };

  constructor(private element:TemplateRef<any>, private container:ViewContainerRef) { }

}
