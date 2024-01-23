/* FORMA 1 USANDO EL ARCHIVO HELPER: validators.ts */
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {
//   cantBeSameUser,
//   emailPattern,
//   firstNameAndLastnamePattern,
// } from 'src/app/shared/validators/validators';

// @Component({
//   templateUrl: './register-page.component.html',
//   styles: [],
// })
// export class RegisterPageComponent {
//   constructor(private formBuilder: FormBuilder) {}

//   public myForm: FormGroup = this.formBuilder.nonNullable.group({
//     name: [
//       '',
//       [Validators.required, Validators.pattern(firstNameAndLastnamePattern)],
//     ],
//     /* la validación de una expresión regular es síncrona porque ya tenemos toda la data para comparar contra la expresión regular y no se coloca el Validators.email ya que es más permisible y por eso usaremos Validators.pattern(expresión_a_colocar) */
//     // email: ['', [Validators.required, Validators.email]],
//     email: ['', [Validators.required, Validators.pattern(emailPattern)]],
//     /* al crear validaciones personalizadas no se invoca la función, es decir, no se coloca cantBeSameUser(), solo se le pasa por referencia, es decir, cantBeSameUser, para que Angular sea quien la ejecute */
//     username: ['', [Validators.required, cantBeSameUser]],
//     password: ['', [Validators.required, Validators.minLength(6)]],
//     password2: ['', [Validators.required]],
//   });

//   isNotValidField(field: string): boolean | null {
//     // console.log('render isNotValidField');
//     return (
//       this.myForm.controls[field].errors && this.myForm.controls[field].touched
//     );
//   }

//   handleSubmit(): void {
//     if (this.myForm.invalid) {
//       this.myForm.markAllAsTouched();
//       return;
//     }
//     console.log(this.myForm.value);
//     this.myForm.reset();
//   }
// }

/* FORMA 2 USANDO LOS SERVICIOS: validators.service.ts ---- email-validator.service.ts */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidatorService } from 'src/app/shared/services/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  constructor(
    private formBuilder: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) {}

  public myForm: FormGroup = this.formBuilder.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.firstNameAndLastnamePattern),
      ],
    ],
    /* la validación de una expresión regular es síncrona porque ya tenemos toda la data para comparar contra la expresión regular y no se coloca el Validators.email ya que es más permisible y por eso usaremos Validators.pattern(expresión_a_colocar) */
    /* aquí también se están usando validaciones asíncronas pero primero se disparan las validaciones síncronas y luego cuando las validaciones síncronas estén validadas correctamente se disparan las validaciones asíncronas que se pueden colocar mediante el new para crear una nueva instancia o sino mendiante la inyección del servicio */
    // email: ['', [Validators.required, Validators.email]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),
      ],
      // [new EmailValidatorService()], // validación asíncrona con el new EmailValidatorService() para crear una nueva instancia lo cual no es malo trabajar así pero si se tiene algún proceso en el email-validator.service.ts donde establece alguna conexión o se usa mucho y queremos reutilizar la misma instancia entonces es mejor inyectar el servicio para usarlo directamente las veces que sea necesario porque si hubieran muchas inicializaciones con el new EmailValidatorService() entonces afecta más al rendimiento VS usar el servicio this.emailValidatorService ya que al final es la misma instancia que se usará a lo largo de todas las validaciones (igual tendría que ser algo demasiado grande para que se vea afectado en el rendimiento pero es mejor ahorrarnos esa preocupación por eso se hará con el servicio)
      [this.emailValidatorService], // inyectar el servicio y luego usarlo directamente y no usarlo como this.emailValidatorService.validate ya que la clase (el servicio) implementa "AsyncValidator" por lo tanto, el formulario ya sabe que es de este tipo y puede determinar cómo usar la validación. No es necesario llamar al método validate ya que lo hace de manera implícita
    ],
    /* al crear validaciones personalizadas no se invoca la función, es decir, no se coloca this.validatorsService.cantBeSameUser(), solo se le pasa por referencia, es decir, this.validatorsService.cantBeSameUser, para que Angular sea quien la ejecute */
    username: [
      '',
      [Validators.required, this.validatorsService.cantBeSameUser],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  isNotValidField(field: string): boolean | null {
    // console.log('render isNotValidField');
    return this.validatorsService.isNotValidField(this.myForm, field);
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
