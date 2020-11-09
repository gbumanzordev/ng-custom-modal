import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { ModalInsertionDirective } from './directives/modal-insertion.directive';
import { CommonModule } from '@angular/common';
import { ModalService } from 'ng-custom-modal';

@NgModule({
  declarations: [ModalComponent, ModalInsertionDirective],
  imports: [CommonModule],
  exports: [ModalComponent],
  providers: [ModalService],
})
export class CustomModalModule {}
