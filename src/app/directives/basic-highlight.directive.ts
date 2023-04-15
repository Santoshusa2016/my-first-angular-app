import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core";

//chap07: Directives
@Directive({
    selector:'[appBasicHighlight]' //square brackets makes it avail as attribute
})
export class BasicHighlightDirective implements OnInit{

    @Input() defaultColor: string = 'transparent';
    @Input() highlightColor: string = 'blue';

    constructor(private elementRef: ElementRef){}

    ngOnInit(): void {
        //called before render, but props are initialized
        this.elementRef.nativeElement.style.backgroundColor= 'transparent';
    }

    //react to events happening on element this attribute sits on.
    //hostListener will trigger whenever an event happens
    @HostListener('mouseenter', ['$event']) mouseover(eventData: Event){
        console.log(eventData);
        this.elementRef.nativeElement.style.backgroundColor= '#5789D8';
    }

    @HostListener('mouseleave') mouseleave(eventData: Event){
        console.log(eventData);
        this.elementRef.nativeElement.style.backgroundColor= 'transparent';
    }

}