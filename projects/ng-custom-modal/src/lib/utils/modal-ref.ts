import { Observable, Subject } from 'rxjs';

export class ModalRef {
  private readonly afterClosed$ = new Subject<unknown>();

  afterClosed: Observable<any> = this.afterClosed$.asObservable();

  close(result?: unknown): void {
    this.afterClosed$.next(result);
  }
}
