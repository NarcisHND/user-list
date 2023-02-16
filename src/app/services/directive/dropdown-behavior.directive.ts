import {AfterViewInit, Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdownBehavior]'
})
export class DropdownBehaviorDirective implements AfterViewInit {
  private dropdownOption!: HTMLElement;
  private dropDownOptions!: NodeList;
  private dropdownEl!: HTMLElement;
  private dropDownContent!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.dropdownOption = this.el.nativeElement;
    this.dropdownEl = this.el.nativeElement.closest('body').querySelector('.dropbtn');
    this.dropDownContent = this.el.nativeElement.closest('body').querySelector('.dropdown-content');
    this.dropDownOptions = this.el.nativeElement.closest('body').querySelectorAll('.dropdown-option');
    this.renderer.addClass(this.dropDownOptions[0], 'active');
  }

  @HostListener('click')
  setDropdown() {
    this.dropDownOptions = this.el.nativeElement.closest('body').querySelectorAll('.dropdown-option');
    let selectCountry: string = this.dropdownOption.innerText;
    this.dropDownOptions.forEach((option: Node) => {
      let el: HTMLElement = option as HTMLElement;
      if (el.classList.value.includes('active')) {
        this.renderer.removeClass(option, 'active');
      }
    });
    this.renderer.addClass(this.dropdownOption, 'active');
    this.dropdownEl.innerHTML = "Location:" + ' ' + selectCountry + ' ' + `<i _ngcontent-vfg-c18="" aria-hidden="true" class="fa fa-angle-down"></i>`;
  }
}


