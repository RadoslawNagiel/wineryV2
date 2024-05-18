import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { v4 } from 'uuid';
import { ComponentBase } from '../../../../utils/classes/component.base';
import { Recipe, Sweetness } from '../../../../utils/interfaces';
import { AddWine } from '../../../../utils/store/app.actions';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `detail`,
    templateUrl: `detail.page.html`,
    imports: [IonicModule, ReactiveFormsModule, FormsModule],
    providers: [DatePipe],
})
export default class DetailPage extends ComponentBase {
    readonly Sweetness = Sweetness;
    readonly activatedRoute = inject(ActivatedRoute);
    readonly router = inject(Router);
    readonly datePipe = inject(DatePipe);

    readonly form = new FormGroup({
        name: new FormControl<string>(``, [Validators.required, Validators.maxLength(40)]),
        date: new FormControl<string>(this.datePipe.transform(new Date(), `YYYY-MM-dd`) ?? ``, [Validators.required]),
        capacity: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
        yeast: new FormControl<string>(``, []),
        yeastTolerance: new FormControl<number>(16, [Validators.required]),
        power: new FormControl<number>(16, [Validators.required]),
        sweetness: new FormControl<Sweetness>(Sweetness.dry, [Validators.required]),
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
        const recipe = this.recipe();
        if (!recipe) {
            return;
        }
        const capacity = this.form.value.capacity ?? 1;
        const id = v4();

        recipe.ingredients.forEach((ingredient) => (ingredient.value = Math.round(ingredient.value * capacity * 100) / 1000));
        this.store.dispatch(
            new AddWine({
                id,
                name: this.form.value.name ?? ``,
                description: this.form.value.description ?? ``,
                createDate: new Date(this.form.value.date ?? new Date()).getTime(),
                capacity,
                power: this.form.value.power ?? 1,
                yeast: this.form.value.yeast ?? ``,
                yeastTolerance: this.form.value.yeastTolerance ?? 1,
                startSugar: 0,
                recipe,
                done: false,
                numberOfBottles: 0,
                stagesDone: new Array(recipe.productStages.length).fill(false),
                sweetness: this.form.value.sweetness ?? Sweetness.dry,
            }),
        );
        this.router.navigate([`/tabs/tab-production/${id}`]);
    }
}
