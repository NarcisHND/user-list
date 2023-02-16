import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  private readonly element: HTMLElement;

  constructor(private modalService: ModalService, private el: ElementRef, private renderer: Renderer2) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: MouseEvent) => {
      const target: HTMLButtonElement = el.target as HTMLButtonElement;

      if (target.className === 'modal-background' || target.className === 'modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service, so it's accessible from controllers
    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.renderer.setStyle(this.element.firstChild, 'display', 'block');
    this.renderer.setStyle(this.element.lastChild, 'display', 'block');
    document.body.classList.add('app-modal-open');
  }

  // close modal
  close(): void {
    this.renderer.setStyle(this.element.firstChild, 'display', 'none');
    this.renderer.setStyle(this.element.lastChild, 'display', 'none');
    document.body.classList.remove('app-modal-open');
  }
}
