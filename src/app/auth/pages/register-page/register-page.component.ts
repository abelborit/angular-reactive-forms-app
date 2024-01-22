import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  cantBeSameUser,
  emailPattern,
  firstNameAndLastnamePattern,
} from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  constructor(private formBuilder: FormBuilder) {}

  public myForm: FormGroup = this.formBuilder.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.pattern(firstNameAndLastnamePattern)],
    ],
    /* la validación de una expresión regular es síncrona porque ya tenemos toda la data para comparar contra la expresión regular y no se coloca el Validators.email ya que es más permisible y por eso usaremos Validators.pattern(expresión_a_colocar) */
    // email: ['', [Validators.required, Validators.email]],
    email: ['', [Validators.required, Validators.pattern(emailPattern)]],
    /* al crear validaciones personalizadas no se invoca la función, es decir, no se coloca cantBeSameUser(), solo se le pasa por referencia, es decir, cantBeSameUser, para que Angular sea quien la ejecute */
    username: ['', [Validators.required, cantBeSameUser]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  isNotValidField(field: string): boolean | null {
    // console.log('render isNotValidField');
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  handleSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset();
  }
}
