import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { v4 } from 'uuid';
import { ComponentBase } from '../../../../utils/classes/component.base';
import { Recipe } from '../../../../utils/interfaces';
import { AddWine } from '../../../../utils/store/app.actions';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `detail`,
    templateUrl: `detail.page.html`,
    imports: [IonicModule, ReactiveFormsModule],
    providers: [DatePipe],
})
export default class DetailPage extends ComponentBase {
    readonly activatedRoute = inject(ActivatedRoute);
    readonly router = inject(Router);
    readonly datePipe = inject(DatePipe);

    readonly form = new FormGroup({
        name: new FormControl<string>(``, [Validators.required, Validators.maxLength(40)]),
        date: new FormControl<string>(this.datePipe.transform(new Date(), `YYYY-MM-dd`) ?? ``, [Validators.required]),
        capacity: new FormControl<number | null>(null, [Validators.required]),
        yeast: new FormControl<string>(``, []),
        yeastTolerance: new FormControl<number>(16, [Validators.required]),
        power: new FormControl<number>(16, [Validators.required]),
        description: new FormControl<string>(``, []),
    });

    recipe = signal<Recipe | undefined>(undefined);

    ionViewWillEnter() {
        const recipe: Recipe = JSON.parse(this.activatedRoute.snapshot.queryParams[`recipe`]);
        this.recipe.set(recipe);
        this.form.controls.name.setValue(recipe.name);
    }

    pinFormatter(value: number) {
        return `${value}%`;
    }

    addVineClick() {
        const id = v4();
        this.store.dispatch(
            new AddWine({
                id,
                name: this.form.value.name ?? ``,
                description: this.form.value.description ?? ``,
                createDate: new Date(this.form.value.date ?? new Date()),
                capacity: this.form.value.capacity ?? 1,
                power: this.form.value.power ?? 1,
                yeast: this.form.value.yeast ?? ``,
                yeastTolerance: this.form.value.yeastTolerance ?? 1,
                startSugar: 0,
                recipe: this.recipe(),
                done: false,
                numberOfBottles: 0,
                stagesDone: [],
            }),
        );
        this.router.navigate([`/tabs/tab-production/${id}`]);
    }
}
