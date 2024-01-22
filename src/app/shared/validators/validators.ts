/* para las validaciones personalizadas se podría trabajar de dos formas:
  - FORMA 1: tener varias funciones en un archivo aparte como en este caso que es un archivo helper que nos ayudará a centralizar todo lo referido a validaciones de formularios. También se pueden crear varios archivos helpers con distintas validaciones según sea el caso. Lo único raro es que se tiene la lógica separada en un archivo aparte como un archivo helper lo cual no está mal tenerlo así ya que es una opción válido solo que es un poco raro y cuando las funciones de validaciones sean más grandes puede ser que sea un poco más dificil el trabajarlo como archivo aparte.
  - FORMA 2: crear un servicio para las validaciones para hacer la inyección de dependencias e inyectar ese servicio de validaciones al componente y con eso tener todo lo que necesito en ese objeto que retorna el servicio. La ventaja de inyectarlo es que tendríamos acceso al ciclo vida de los componentes de Angular, inyectar otros servicios, etc...

  Lo que sí es necesario es que para las funciones validadoras lo adecuado es que tengan una sola tarea de validación para hacer el código más limpio y facil de mantener.
*/

/* para saber si es una validación asíncrona entonces la función validadora debería regresar un Observable<ValidationErrors | null> o Promise<ValidationErrors | null> o algo similar referido al trabajo asíncrono, pero si no regresa nada de eso entonces es una validación síncrona */
import { FormControl, ValidationErrors } from '@angular/forms';

export const firstNameAndLastnamePattern: string =
  '([a-zA-Zá-úÁ-Ú]+) ([a-zA-Zá-úÁ-Ú]+)';
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

/* la mayor parte de veces en las validaciones nosotros vamos a recibir un control ya que estamos enlazando un input o campo a un control con el formControlName="". Si fuera un array entonces sería un FormArray pero la mayor parte de veces son FormControl */
export const cantBeSameUser = (
  control: FormControl
): ValidationErrors | null => {
  /* se debería regresar un objeto con el error pero si no da un error en la validación entonces se regresa un null y Angular va a saber que cuando se regresa un null en validaciones personalizadas simplemente toma la validación como permitida y la deja pasar como campo correcto ya que si no tiene un null entonces siempre me tomará como que no cumple la condición y estará el error permanentemente */

  const value: string = control.value.trim().toLowerCase();

  if (value === 'strider') {
    return {
      isSameUser: true,
    };
  }

  return null;
};

/* ******************************************************************************************************************* */
/* Para probar la expresión regular de manera rápida se puede hacer esto:

  let regex = /^([a-zA-Z]+) ([a-zA-Z]+) ([a-zA-Z]+)( [a-zA-Z]+)?$/;
  let testString = "Nombre Nombre2 Apellido";
  let result = regex.test(testString);
  console.log({result})

En este ejemplo, result será true si la cadena de entrada coincide con la expresión regular y false si no coincide.
*/
