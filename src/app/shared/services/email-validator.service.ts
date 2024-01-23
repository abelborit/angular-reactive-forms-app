import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
/* FORMA 1: era un inicio para ir conociendo cómo hacer */
// export class EmailValidatorService implements AsyncValidator {
//   /* este AbstractControl puede ser un FormControl, FormGroup o FormArray, da esa posibilidad de que sea un poco más flexible por eso su nombre de Abstract Control */
//   /* este ValidationErrors es un objeto que regresa la llave con el nombre del error y el objeto que define qué es el error */
//   validate(
//     control: AbstractControl<any, any>
//   ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//     /* en este caso se sabe que este control va a estar asociado a un email y por eso se crea su constante email para tener su valor */
//     const email = control.value;
//     console.log({ email });

//     /* para regresar un observable de forma facil se podría hacer con el return of() */
//     /* al estar usando un observable y este al ser un proceso asíncrono, en este caso podemos ver inmediatamente el resultado del mismo pero es demasiado rápido y no logramos ver el status del formulario o el pending entonces a fines de práctica se colocará un delay de 2 segundos para verlo. Entonces al trabajar de esta forma con validaciones asíncronas colocamos a Angular (al formulario) en un estado de PENDING o pendiente hasta que esa validación o todas las validaciones asíncronas que se están ejecutando se cumplan para que el estado final sea un VALID o INVALID */
//     return of({
//       isEmailTaken: true,
//     }).pipe(delay(2000));
//   }

//   /* se puede regresar también el error y que tenga datos adicionales para una mejor referencia pero al final de cuentas si aparece el error de isEmailTaken entonces no importaría tanto qué es lo que tiene adentro porque el error isEmailTaken ya apareció y por eso se deja como un true para que sea más directo pero es cuestión de preferencias */
//   // return of({
//   //   isEmailTaken: {
//   //     message: 'email is taken',
//   //   },
//   // }).pipe(delay(2000));

//   /* este registerOnValidatorChange es opcional y sirve para determinar cuándo este validator cambia */
//   // registerOnValidatorChange?(fn: () => void): void {
//   //   throw new Error('Method not implemented.');
//   // }
// }

/* FORMA 2: forma un poco más pegado a la realidad */
export class EmailValidatorService implements AsyncValidator {
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value;

    /* FORMA 1: como usualmente se haría */
    /* esto sería algo usual al hacer estas validaciones asíncronas ya que es mandar lo que queremos evaluar y compararlo contra el backend para que nos regrese algo, ya sea un error o un null según sea el caso */
    // return this.httpClient
    //   .get<any[]>(`http://localhost:3000/users?q=${email}`)
    //   .pipe(
    //     delay(1000),
    //     map((response) => {
    //       return response.length === 0
    //         ? null
    //         : {
    //             isEmailTaken: true,
    //           };
    //     })
    //   );

    /* FORMA 2: forma mejorada creando una nueva instancia del observable */
    /* el Observable se puede usar tanto para el tipado como también para crear nuevos Observable ya que es una clase y lo que pide el Observable es un callback (que es el cuerpo del observable) y dentro tendremos un subscriber. Ese .subscribe() que se utiliza con los observables es este subscriber que es una función o método que está subscrita a nuestros cambios y este observable puede emitir tantos valores como nosotros queramos */
    const newHttpObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });

        /* aquí se tendría que comparar con la respuesta http dada por el backend porque ya estaríamos trabajando con el asincronismo pero en este caso se comparará solo contra 'correo@correo.com' hardcodeado */
        if (email === 'correo@correo.com') {
          /* .next() para emitir el siguiente valor */
          /* .complete() para hacer la limpieza y también se va a desubscribir porque cuando este observable termine de emitir ya no vamos a seguir emitiendo más valores, por eso cuando se completa el observable entonces se manda a llamar al .complete()  */
          subscriber.next({ isEmailTaken: true });
          subscriber.complete();

          /* se podría colocar el return para asegurarnos que se termine el scope de este if() pero cuando se coloca el .complete() entonces vamos a evitar que siga emitiendo más valores */
          // return;
        }

        /* si todo está bien entonces mandamos a llamar al .next() con null para que deje pasar la validación y luego nuevamente el .complete() para terminar las subscripciones */
        subscriber.next(null);
        subscriber.complete();
      }
    ).pipe(delay(1500));

    /* también se podría colocar el return directo arriba pero lo estamos colocando por partes para que se entienda un poco mejor */
    return newHttpObservable;
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
