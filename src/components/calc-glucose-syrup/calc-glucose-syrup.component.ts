import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ToastService } from 'src/app/services/toast-service.service';

@Component({
    standalone: true,
    imports: [IonicModule, NgClass, FormsModule],
    selector: 'app-calc-glucose-syrup',
    templateUrl: './calc-glucose-syrup.component.html',
    styleUrls: ['./calc-glucose-syrup.component.scss'],
})
export class CalcGlucoseSyrupComponent {
    @Input() disableSugarEdit = false;

    @Input() sugarAmount = 1;
    @Input() capacity = 1;
    @Input() glucoseSyrup = 1.6;

    valueValid = true;

    constructor(private readonly toastService: ToastService) {}

    ngOnChanges(changes: any) {
        if (changes.sugar || changes.capacity) {
            this.changedSugarOrCapacity();
        }
        if (changes.syrup) {
            this.changedSyrup();
        }
    }

    changedSugarOrCapacity() {
        if (this.sugarAmount < 0) {
            this.sugarAmount = 0;
        }
        if (this.capacity < 0) {
            this.capacity = 0;
        }

        const newGlucoseSyrup = this.capacity + this.sugarAmount * 0.6;
        this.glucoseSyrup = Math.round(newGlucoseSyrup * 100) / 100;

        this.checkValid();
    }

    changedSyrup() {
        if (this.glucoseSyrup < 0) {
            this.glucoseSyrup = 0;
        }

        const newCapacity = this.glucoseSyrup - this.sugarAmount * 0.6;
        this.capacity = Math.round(newCapacity * 100) / 100;

        if (this.capacity < 0) {
            this.capacity = 0;
            const newGlucoseSyrup = this.capacity + this.sugarAmount * 0.6;
            this.glucoseSyrup = Math.round(newGlucoseSyrup * 100) / 100;
        }

        this.checkValid();
    }

    checkValid() {
        if (this.capacity * 2 < this.sugarAmount) {
            this.valueValid = false;
            this.toastService.presentToastError(`stosunek cukru do płynu powinien wynosić przynajmniej 2:1`);
            return;
        }
        this.valueValid = true;
    }
}
