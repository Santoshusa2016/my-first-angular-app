import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated //none, shadowDOM
})
export class ServerElementComponent implements 
OnInit, 
OnChanges,
DoCheck, 
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy
{

  /*Chapter:05 */
  @Input('srvElement') element:{type:string, content: string, name: string};
  @Input() name: string;
  
  @ViewChild('header',{static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

  constructor(){
    console.log('constructor() called');
  }
  
  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges() called')
    console.log(changes);
  }

  ngOnInit(): void {
    //will be called everytime new instance of comp is created
    console.log('ngOnInit() called');
    //localVariable is not accessible on onInit
    console.log('Text:' + this.header.nativeElement.textContent);  
    console.log('Pragraph Content Text:' + this.paragraph.nativeElement.textContent);  
  }

  ngDoCheck():void{
    //called during every change detection run
    console.log('ngDoCheck() called')
  }

  ngAfterContentInit(): void {
    //called only once after content (ng-content) has been projected into view
    console.log('ngAfterContentInit() called!')
  }

  ngAfterContentChecked(): void {
    //called everytime projected content has been checked
    console.log('ngAfterContentChecked() called!')
  }

  ngAfterViewInit(): void {
    //called after components view/childview has been initialized
    console.log('ngAfterViewInit() called!')
    //localVariable is accessible on onInit
    console.log('Text:' + this.header.nativeElement.textContent);
    console.log('Pragraph Content Text:' + this.paragraph.nativeElement.textContent);   
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked() called!')
  }

  ngOnDestroy(): void {
    //called once when component is about to be destroyed
    console.log('ngOnDestroy() called!')
  }
  
}
