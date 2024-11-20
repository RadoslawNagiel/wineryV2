import { FormControl } from '@angular/forms';

export const setControlAsInvalid = (control: FormControl) => {
    control.markAsDirty();
    control.markAsTouched();
};
