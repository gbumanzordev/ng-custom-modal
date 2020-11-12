import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalConfig } from '../utils/modal-config';
import { ModalRef } from '../utils/modal-ref';
import { ModalInjector } from '../utils/modal-injector';

@Injectable()
export class ModalService {
  dialogComponentRef: ComponentRef<ModalComponent>;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open<ComponentType, ModalDataType = unknown>(
    componentType: Type<ComponentType>,
    config: ModalConfig<ModalDataType>
  ): ModalRef {
    const dialogRef = this.appendDialogComponentToBody<ModalDataType>(config);
    this.dialogComponentRef.instance.setChildComponentType<ComponentType>(
      componentType
    );

    if (config.width) {
      this.dialogComponentRef.instance.width = config.width;
    }

    if (config.height) {
      this.dialogComponentRef.instance.height = config.height;
    }

    if (config.disableBackdropClose) {
      this.dialogComponentRef.instance.disableBackdropClose =
        config.disableBackdropClose;
    }

    return dialogRef;
  }

  close(): void {
    this.removeDialogComponentFromBody();
  }

  private appendDialogComponentToBody<T = unknown>(
    config?: ModalConfig<T>
  ): ModalRef {
    const map = new WeakMap();
    map.set(ModalConfig, config);

    const dialogRef = new ModalRef();
    map.set(ModalRef, dialogRef);

    const sub = dialogRef.afterClosed.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      ModalComponent
    );
    const componentRef = componentFactory.create(
      new ModalInjector(this.injector, map)
    );
    this.appRef.attachView(componentRef.hostView);

    const domElement = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElement);
    this.dialogComponentRef = componentRef;
    this.dialogComponentRef.instance.onClose.subscribe(() =>
      this.removeDialogComponentFromBody()
    );
    return dialogRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
