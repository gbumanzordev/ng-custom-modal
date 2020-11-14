import { Directive, HostListener } from '@angular/core';
import { ModalRef } from '../utils/modal-ref';

@Directive({
  selector: '[appModalClose]',
})
export class ModalCloseDirective {
  constructor(private modalRef: ModalRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.preventDefault();
    this.modalRef.close();
  }
}
