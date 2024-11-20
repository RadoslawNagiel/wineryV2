import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { ComponentBase } from '../../../utils/classes/component.base';
import { Ingredient, ProductionStage, Recipe } from '../../../utils/interfaces';
import { CreateRecipeComponent } from '../../../components/create-recipe/create-recipe.component';
import { slugify } from '../../../utils/slugify';
import { KeyboardService } from '../../../services/keyboard.service';
import { Subscription } from 'rxjs';
import { setControlAsInvalid } from '../../../utils/set-control-as-invalid';
import { getRecipeStages } from '../../../utils/get-recipes-detail';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: `add-wine`,
    templateUrl: `add-wine.page.html`,
    imports: [IonicModule, CreateRecipeComponent],
})
export default class AddWinePage extends ComponentBase {
    form = new FormGroup({
        name: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(40)]),
        description: new FormControl<string | null>(null, [Validators.required]),
        ingredients: new FormControl<Ingredient[]>([], [Validators.required]),
    });

    keyboardService = inject(KeyboardService);
    router = inject(Router);
    toastController = inject(ToastController);

    toastDisplayed = signal(false);

    keyboardSubscription = new Subscription();

    ngOnInit() {
        this.keyboardSubscription = new Subscription();
        this.keyboardSubscription.add(
            this.keyboardService.onKeyboardChange.subscribe(() => {
                if (this.keyboardService.isKeyboardOpen()) {
                    this.dismissHintToast();
                }
            }),
        );
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
        this.keyboardSubscription.unsubscribe();
    }

    ionViewWillEnter() {
        this.presentHintToast();
    }

    ionViewWillLeave() {
        this.dismissHintToast();
    }

    async presentHintToast() {
        if (this.toastDisplayed()) {
            return;
        }
        this.toastDisplayed.set(true);
        const toast = await this.toastController.create({
            position: `top`,
            message: `Możesz też wybrać gotowy przepis`,
            animated: true,
            buttons: [
                {
                    text: `Przejdź`,
                    role: `Continue`,
                    handler: () => {
                        this.router.navigate([`/tabs`, `tab-recipes`]);
                    },
                },
            ],
            swipeGesture: `vertical`,
            mode: `ios`,
            duration: 10000,
        });
        void toast.onDidDismiss().then(() => {
            this.toastDisplayed.set(false);
        });
        toast.present();
    }

    dismissHintToast() {
        if (this.toastDisplayed()) {
            this.toastController.dismiss();
        }
    }

    next() {
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach((key) => {
                const control = (this.form.controls as any)[key];
                if (!control.valid) {
                    setControlAsInvalid(control);
                }
            });
            return;
        }

        const recipe: Recipe = {
            slug: slugify(this.form.value.name ?? ``),
            name: this.form.value.name ?? ``,
            ingredients: this.form.value.ingredients ?? [],
            productStages: [
                {
                    name: ProductionStage.Preparation,
                    date: 0,
                    description: this.form.value.description ?? ``,
                },
            ],
        };

        this.router.navigate([`/tabs`, `tab-production`, `add-wine`, `detail`], {
            queryParams: {
                recipe: JSON.stringify(getRecipeStages(recipe)),
            },
        });
    }
}
