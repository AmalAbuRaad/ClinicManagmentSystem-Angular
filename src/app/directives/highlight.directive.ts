import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
    selector:"[appHighlight]"
})
export class HighlightDirective implements OnInit {

    @Input('appHighlight')
    bgColor:string = 'green';

    constructor(private element:ElementRef){

}

    ngOnInit(){
        console.log(     this.element.nativeElement);
        this.element.nativeElement.style.backgroundColor = this.bgColor;
    }
}