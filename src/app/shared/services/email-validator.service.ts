import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  /* este AbstractControl puede ser un FormControl, FormGroup o FormArray, da esa posibilidad de que sea un poco más flexible por eso su nombre de Abstract Control */
  /* este ValidationErrors es un objeto que regresa la llave con el nombre del error y el objeto que define qué es el error */
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    /* en este caso se sabe que este control va a estar asociado a un email y por eso se crea su constante email para tener su valor */
    const email = control.value;
    console.log({ email });

    /* para regresar un observable de forma facil se podría hacer con el return of() */
    /* al estar usando un observable y este al ser un proceso asíncrono, en este caso podemos ver inmediatamente el resultado del mismo pero es demasiado rápido y no logramos ver el status del formulario o el pending entonces a fines de práctica se colocará un delay de 2 segundos para verlo. Entonces al trabajar de esta forma con validaciones asíncronas colocamos a Angular (al formulario) en un estado de PENDING o pendiente hasta que esa validación o todas las validaciones asíncronas que se están ejecutando se cumplan para que el estado final sea un VALID o INVALID */
    return of({
      isEmailTaken: true,
    }).pipe(delay(2000));
  }

  /* este registerOnValidatorChange es opcional y sirve para determinar cuándo este validator cambia */
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }
}

/* ******************************************************************************************************************* */
/* ¿Cómo hacer uso de AsyncValidator con mas de un parametro en validate() en este caso tendrá un token para validarlo contra el Backened */
/*
  - AsyncValidatorFn  es una interfaz que se tiene que importar de @angular/forms.
  - emailValidatorWithParams es el nombre de un método que recibirá el token y regresará algo de tipo AsyncValidatorFn. Dentro de este método retorna una función el cual tendrá como parámetro el control y regresará un Observable que emite algo de tipo ValidationErrors o null.


La función:
  emailValidator(token: any): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      console.log(email);
      return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
                .pipe(
                  // delay(3000),
                  map( resp => {
                    return ( resp.length === 0 )
                        ? null
                        : { emailTomado: true }
                  })
                );
    };
  }


El FormGroup:
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [ this.emailValidator.emailValidatorWithParams('aqui tu token') ] ],
*/

/* ******************************************************************************************************************* */
/* AsyncValidator dudas: */
/* Este AsyncValidator se usa por ejemplo para un registro de usuario, al momento de escribir el correo o username poner un debounce time y que haga una peticion http y verifique si el user o correo ya esta registrado para asi decirle al usuario en el front que esa cuenta ya existe, ¿Es correcto?

Sí, exactamente, un validador asíncrono es una herramienta útil para realizar verificaciones en tiempo real mientras un usuario interactúa con un formulario.

Para un escenario como el registro de usuario, se puede implementar un validador asíncrono con un debounce time para controlar la frecuencia de las solicitudes HTTP al servidor. De esta manera, puedes verificar en tiempo real si el correo electrónico o el nombre de usuario ya están registrados en la base de datos. Si la respuesta del servidor indica que la cuenta ya existe, puedes informar al usuario en el front-end para que elija un nombre o correo diferente antes de enviar el formulario. */
