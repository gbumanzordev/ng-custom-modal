import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libModalInsertion]',
})
export class ModalInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
