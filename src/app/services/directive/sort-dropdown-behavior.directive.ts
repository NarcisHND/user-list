import {AfterViewInit, Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSortDropdownBehavior]'
})
export class SortDropdownBehaviorDirective implements AfterViewInit {
  private sortDropdownOption!: HTMLElement;
  private sortDropDownOptions!: NodeList;
  private sortDropdownEl!: HTMLElement;
  private sortDropDownContent!: HTMLElement;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.sortDropdownOption = this.elRef.nativeElement;
    this.sortDropdownEl = this.elRef.nativeElement.closest('body').querySelector('.sort-dropBtn');
    this.sortDropDownContent = this.elRef.nativeElement.closest('body').querySelector('.sort-dropdown-content');

    this.sortDropDownOptions = this.elRef.nativeElement.closest('body').querySelectorAll('.sort-dropdown-option');
    this.removeActiveClass();

    this.renderer.addClass((this.sortDropDownOptions)[0], 'active');
    this.sortDropdownEl.innerHTML = 'All' + ' ' + `<i _ngcontent-vfg-c18="" aria-hidden="true" class="fa fa-angle-down"></i>`;
  }

  @HostListener('click')
  setDropdown() {
    let selectOrder: string = this.sortDropdownOption.innerText;
    this.removeActiveClass();
    this.renderer.addClass(this.sortDropdownOption, 'active');
    this.sortDropdownEl.innerHTML = selectOrder + ' ' + `<i _ngcontent-vfg-c18="" aria-hidden="true" class="fa fa-angle-down"></i>`;
  }

  removeActiveClass() {
    this.sortDropDownOptions.forEach((option: Node) => {
      let el: HTMLElement = option as HTMLElement;
      if (el.className === 'sort-dropdown-option active') {
        this.renderer.removeClass(option, 'active');
      }
    });
  }
}
