import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { ModalInsertionDirective } from './directives/modal-insertion.directive';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.service';
import { ModalCloseDirective } from './directives/modal-close.directive';

@NgModule({
  declarations: [ModalComponent, ModalInsertionDirective, ModalCloseDirective],
  imports: [CommonModule],
  exports: [ModalComponent, ModalCloseDirective],
  providers: [ModalService],
})
export class CustomModalModule {}
