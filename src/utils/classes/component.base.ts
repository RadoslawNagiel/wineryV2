import { Directive, inject, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { SubSink } from 'subsink';

@Directive()
export abstract class ComponentBase {
    protected readonly subs = new SubSink();

    searchValue = signal(``);

    store = inject(Store);

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
