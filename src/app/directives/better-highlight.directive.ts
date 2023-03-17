import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  //accessing prop of element on which attribute sits
  //camelcase based style => DOM, CSS based style => HTML
  @HostBinding('style.backgroundColor') backgroundColor:string = 'transparent';

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    //approach:01
    // this.renderer.setStyle(this.elRef.nativeElement
    //   ,'background-color'
    //   , 'blue');

    //approach:02
    this.backgroundColor = 'green';
  }

}
