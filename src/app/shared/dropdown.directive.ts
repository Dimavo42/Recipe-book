import { Directive,
    HostListener,
    HostBinding,
    ElementRef

 } from "@angular/core";



@Directive({
    selector:'[appDropDown]'
})

export class DropDownDirective {
    
    constructor(private ElRef:ElementRef){}
    @HostBinding('class.open') IsOpen:boolean=false;
    @HostListener('document:click',['$event']) Onclick(event:Event){
        this.IsOpen=this.ElRef.nativeElement.contains(event.target)?
        !this.IsOpen :false;

    }
    
    
}