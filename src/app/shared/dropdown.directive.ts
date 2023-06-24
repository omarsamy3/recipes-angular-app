import 
  {Directive,
   HostListener,
    HostBinding,
     ElementRef,
     Renderer2
    } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective{
// @HostBinding('class.show') isOpen = false;
isOpen = false;
constructor(private elRef: ElementRef, private renderer: Renderer2) {}

@HostListener('document:click', ['$event']) toggleOpen(event: Event){
  // this.isOpen = !this.isOpen;
  this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  // const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
  const dropdownMenu = this.elRef.nativeElement.nextElementSibling;
  if(dropdownMenu){
    if(this.isOpen)
    this.renderer.addClass(dropdownMenu, 'show');
    else
    this.renderer.removeClass(dropdownMenu, 'show');
  }
  
}
}