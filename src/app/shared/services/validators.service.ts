import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  /* patrones para expresiones regulares */
  public firstNameAndLastnamePattern: string =
    '([a-zA-Zá-úÁ-Ú]+) ([a-zA-Zá-úÁ-Ú]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  /* la mayor parte de veces en las validaciones nosotros vamos a recibir un control ya que estamos enlazando un input o campo a un control con el formControlName="". Si fuera un array entonces sería un FormArray pero la mayor parte de veces son FormControl */
  public cantBeSameUser(control: FormControl): ValidationErrors | null {
    /* se debería regresar un objeto con el error pero si no da un error en la validación entonces se regresa un null y Angular va a saber que cuando se regresa un null en validaciones personalizadas simplemente toma la validación como permitida y la deja pasar como campo correcto ya que si no tiene un null entonces siempre me tomará como que no cumple la condición y estará el error permanentemente */

    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        isSameUser: true,
      };
    }

    return null;
  }

  /* tendrá como objetivo simplificar la forma en cómo generar la validación si el campo está correcto o incorrecto y estará revisando si el campo en su objeto errors tiene algún error y si el campo fue tocado lo cual al final el método isNotValidField() devolverá un true o un false o también puede ser un null ya que el objeto errors si no tiene nada es un null y el touched devuelve un boolean */
  isNotValidField(form: FormGroup, field: string): boolean | null {
    // console.log('render isNotValidField');
    return form.controls[field].errors && form.controls[field].touched;
  }
}
