import { Injectable } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

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
  public isNotValidField(form: FormGroup, field: string): boolean | null {
    // console.log('render isNotValidField');
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    /* en este método se están recibiendo dos parámetros a evaluar entonces se retornará una función la cual tendrá como argumento a mi formulario y me permite tener control sobre él (el formulario que se le está pasando implícitamente) que es de tipo AbstractControl (FormControl, FormGroup, FormArray) y me regresará ValidationErrors | null o si es para validaciones asíncronas sería Observable<ValidationErrors | null> */
    /* La referencia al formGroup se obtiene de forma automática cuando esta función se utiliza como validación en un formulario. Angular gestiona internamente la inyección del formGroup, por lo que no es necesario pasar explícitamente el formGroup como parámetro. Cuando esta función se utiliza como validación en un formulario, Angular se encarga de proporcionar el formGroup asociado al formulario en curso, permitiendo así acceder a los valores de los campos y establecer errores según sea necesario. */
    return (formGroup: AbstractControl): ValidationErrors | null => {
      // console.log({ formGroup });

      /* aquí toca leer los campos donde se harán la validación ya que solo estoy recibiendo string en isFieldOneEqualFieldTwo y entonces al ya tener los campos y esta función que tendrá el formulario como tal (todos los campos) ya se puede empezar con las validaciones o evaluaciones */
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
      const field2ValidatorsErrors = formGroup.get(field2)?.errors;
      // console.log(field2ValidatorsErrors);

      if (fieldValue1 !== fieldValue2) {
        /* aquí se tendría que establecer por ejemplo al field1 o field2 el error ya que no cumplirá la validación, en este caso se colocará dentro de los errores del field2 ya que es donde se repite la contraseña. En teoría hasta aquí sería más que suficiente porque un campo del formulario tener algún error entonces todo el formulario estará como INVALID */
        formGroup
          .get(field2)
          ?.setErrors({ ...field2ValidatorsErrors, notEqualField: true });

        /* este es el error que va a retornar en caso la validación no se cumpla. Esta respuesta va a los errores globales del formulario */
        return { notEqualField: true };
      }

      /* FORMA 1: establecer todos los errores como null (su caso de uso sería cuando solo se tiene una validación) */
      /* si todo sale bien y cumple la validación entonces hay que limpiar los errores del campo pero hay que tener cuidado ya que esto limpiará todos los errores de ese campo y se tendría que buscar solo el error colocado (si tiene validaciones como campo requerido, campo con mínimo de caracteres, etc, eso se queda ya que siempre lo tendrá verificando y ejecutando) */
      // formGroup.get(field2)?.setErrors(null);
      // return null;

      /* FORMA 2: eliminar el error específico que es el notEqualField (su caso de uso sería cuando se tienen varias validaciones y solo se quiere eliminar una validación en específico) */
      // if (formGroup.get(field2)?.hasError('notEqualField')) {
      //   delete formGroup.get(field2)?.errors?.['notEqualField'];
      //   /* cuando agrega o elimina un validador en tiempo de ejecución, debe llamar updateValueAndValidity() para que la nueva validación entre en vigor */
      //   formGroup.get(field2)?.updateValueAndValidity();
      // }
      // /* este return únicamente se realiza si los dos campos son iguales para que pase la validación */
      // return null;

      /* FORMA 3: retornar solo el null para que no choque con las demás validaciones ya que con el return null; la funcion ya limpia la validación de la propia funcion */
      return null;
    };
  }
}

/* ******************************************************************************************************************* */
/* ¿Por qué en las validaciones enviamos una referencia a la función y no el llamado de la función como tal? */
/* Esto es porque angular es quien debe ejecutar las validaciones cuando ocurran los cambios en los formularios por ello requiere la referencia a los metodos a ejecutar. Si se pasa como parámetro la ejecución de un metodo solo se ejecutaría apenas se monte el componente de angular pero no cuando ocurran cambios, ya que no se tiene la referencia sino el valor que este retorne */

/* ******************************************************************************************************************* */
/* ¿Por qué la función isFieldOneEqualFieldTwo debe retornar otra función? */
/* Esto es porque se requiere de una función que se ejecute cada vez que cambien los valores de password y password2, lo que implica es que estamos retornando la referencia a dicha función anonima que valida si los campos son iguales.

En los validators podemos tener un array de funciones validadoras ahora como necesitamos validar estos 2 campos, tener un retorno como true o false o seria algo valido por el tipado por retornamos una función.

Ahora, ¿Por qué tiene que ser una función? cada vez que ocurran cambios en nuestro formulario debe volver a validarse, angular internamente ejecutará estas funciones y si se obtiene un error es porque la validación fallo. Sería algo similar a los listeners con vainilla javascript, ya que si tenemos un listener al evento change de un input a dicho listener le pasamos como segundo argumento un callback (la definicion de una funcion) el cual se ejecutara cada vez que ocurre un cambio.

Entonces si la función isFieldOneEqualFieldTwo no retornara una función, ¿Angular no podria nunca validar estos 2 campos de password1 y password2? Correcto, ya que no tendria forma de ejecutar la función validadora que necesitamos para comprobar si algún campo (o campos como este caso) son validos.

Pero, ¿Por qué en la funcion cantBeSameUser no es necesario que retorne una funcion?
Porque cantBeSameUser ya es una función y no se está ejecutando sino que se está pasando por referencia, caso similar con el retorno de la función isFieldOneEqualFieldTwo, ese return es una referencia a la función que valida los campos, tal como se comenta arriba y isFieldOneEqualFieldTwo sí se está ejecutando porque se le está pasando parámetros adicionales y el return de isFieldOneEqualFieldTwo es quien recibe el formulario de forma implícita, también que las funciones de validación son funciones que se deben retornar a AbstractControl, por tal razón, necesitamos retornar una función de tipo ValidationErrors | null
*/
