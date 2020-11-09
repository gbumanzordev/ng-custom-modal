import { Observable, Subject } from 'rxjs';

export class ModalRef {
  private readonly afterClosed$ = new Subject<unknown>();

  get afterClosed(): Observable<unknown> {
    return this.afterClosed$.asObservable();
  }

  close<T>(result?: T): void {
    this.afterClosed$.next(result);
  }
}
