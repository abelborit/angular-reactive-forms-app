import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

/* al hablar de formularios dinámicos nos referimos a que no siempre de antemano sabremos la cantidad de inputs que vamos a tener, selects, cajas numéricas, etc. y aparte esos elementos que creamos de manera dinámica también deben de tener sus validaciones */

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  constructor(private formBuilder: FormBuilder) {}

  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('', []),
  //   favoriteGames: new FormArray([]),
  // });

  public myForm: FormGroup = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    /* favoriteGames será una array de los juegos favoritos y se crea de la siguiente forma con this.formBuilder.array() y eso creará un elemento de FormArray() el cual es un arreglo que puede tener varios FormControl() y todo eso es lo que el servicio FormBuilder se traduce al final de cuentas solo que con el FormBuilder se tiene una sintaxis un poco más facil o cómoda de trabajar. Este favoriteGames será dinámico */
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Zuma Delux', Validators.required],
    ]),
  });

  /* este es solo un campo reactivo que tendrá sus propias validaciones ya que no pertenece a un formulario como tal, se podría crear con un new FormControl() o usando el servicio FormBuilder */
  // public newFavorite: FormControl = new FormControl('', Validators.required);
  public newFavorite: FormControl = this.formBuilder.nonNullable.control(
    '',
    Validators.required
  );

  /* en el campo del formulario HTML hay que hacer referencia al favoriteGames y para eso hay que enlazar el input HTML con la propiedad del formulario favoriteGames pero como favoriteGames es un arreglo entonces en el HTML se usaría un *ngFor="" y en vez de que tenga toda la lógica en el HTML para enlazar el input con la propiedad del formulario entonces mejor es crear un getter para acceder a la propiedad y sus valores */
  get getFavoriteGames() {
    /* aquí se podría hacer con el controls como this.myForm.controls['favoriteGames']..... pero también se podría usar el get(nombre_campo) pero dejarlo solo de esa forma entonces nos dirá que es de tipo AbstractControl<any, any> | null es decir, que es un FormControl pero que no sabe de qué tipo de FormControl entonces siguiendo la documentación nos dice que colocamos as FormArray para que sepa que es un FormArray([]) y que podemos iterarlo */
    return this.myForm.get('favoriteGames') as FormArray;
  }

  /* este función se podría trabajar también como un getter pero ahora lo haremos solo como un método y tendrá como objetivo simplificar la forma en cómo generar la validación si el campo está correcto o incorrecto y estará revisando si el campo en su objeto errors tiene algún error y si el campo fue tocado lo cual al final el método isNotValidField() devolverá un true o un false o también puede ser un null ya que el objeto errors si no tiene nada es un null y el touched devuelve un boolean */
  isNotValidField(field: string): boolean | null {
    // console.log('render isNotValidField');

    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  /* este método recivirá el formArray a evaluar pero también se necesita verificar qué elemento de ese formArray se está modificando a través del índice como se colocó en el  *ngFor="". Se coloca esta función ya que en isNotValidField se basa en un FormControl en específico pero aquí en isNotValidFieldInArray se basa en un FormControl pero perteneciente a un FormArray */
  isNotValidFieldInArray(formArray: FormArray, index: number) {
    // console.log('render isNotValidFieldInArray');
    // console.log({ formArray, index });

    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  /* devolverá un null para que no se pinte nada en la UI aunque recordar que ya tiene la validación de arriba de mostrar o no la etiqueta HTML para el error o también solo podría regresar algo de tipo string y que retorne un string vacío en vez del null, es cuestión de preferencias */
  getFieldError(field: string): string | null {
    // console.log('render getFieldError');

    if (!this.myForm.controls[field]) return null;

    /* se coloca de esta forma para que fieldErrors al final retorne algo del tipo que tiene el .errors que es de tipo ValidationErrors | null y si no tiene nada en vez de que devuelva el null entonces sea un objeto vacío pero se puede colocar de esa forma o solo con el null, es cuestión de preferencias */
    const fieldErrors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(fieldErrors)) {
      /* este console.log() aparecerá dos veces en consola porque hay cierta actualización que está sucediendo por parte del componente HTML de Angular que es parte del ciclo de detección de Angular y por eso aparece varias veces pero eso está bien */
      // console.log({ key });

      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Este campo requiere mínimo ${fieldErrors['minlength'].requiredLength} caracteres`;
      }
    }

    return null;
  }

  handleAddFavorite(): void {
    if (this.newFavorite.invalid) return;
    // console.log(this.newFavorite.value);

    const newElement = this.newFavorite.value;

    /* si no se estuviera trabajando con el servicio FormBuilder entonces se haría de la manera clásica con el FormControl y mandándole el valor y si tiene o no validaciones */
    // this.getFavoriteGames.push(
    //   new FormControl(newElement, Validators.required)
    // );

    /* Propiedad read-only:
    La propiedad "read-only" en Angular se refiere a una propiedad que solo se puede leer, pero no se puede modificar. En otras palabras, solo se puede acceder a su valor, pero no se puede cambiar su valor. Aquí se declara un getter llamado "getFavoriteGames" que devuelve un array de juegos favoritos. Este getter es de solo lectura, lo que significa que no se puede modificar directamente.

    Sin embargo, en el método "handleAddFavorite()", se agrega un nuevo juego al array "getFavoriteGames" utilizando el método "push()". Esto puede parecer contradictorio, pero en realidad es posible porque el array en sí no es de solo lectura, solo el getter que devuelve el array es de solo lectura. Por lo tanto, aunque el getter no se puede modificar directamente, el array que devuelve sí se puede modificar */

    /* aquí se está diciendo que se añadirá al arreglo de getFavoriteGames un FormControl mediante el servicio FormBuilder el cual tendrá un nuevo elemento y sus validaciones */
    this.getFavoriteGames.push(
      this.formBuilder.control(newElement, Validators.required)
    );
    this.newFavorite.reset();
  }

  handleDeleteFavorite(index: number): void {
    /* aquí se podría hacer de la forma tradicional con this.myForm.controls['favoriteGames']....... pero ya tenemos un getter que regresa eso en el getFavoriteGames() y en JavaScript como todo pasa por referencia entonces hacer una eliminación en getFavoriteGames() hará una eliminación en el arreglo de forma directa y usaremos removeAt() que es un método de los arreglos en general y se le pasa el index para que elimine un objeto de una lista según el índice: https://api.dart.cn/stable/3.2.5/dart-js/JsArray/removeAt.html#:~:text=Removes%20the%20object%20at%20position,Returns%20the%20removed%20value. */
    this.getFavoriteGames.removeAt(index);
  }

  handleSubmit(): void {
    if (this.myForm.invalid) {
      /* si el formulario es inválido entonces que marque todos los campos como "touched" y que no haga nada más. Esto con la finalidad de que cuando los campos y el formulario como tal no esté correcto entonces no se envíe nada y corte el proceso de este scope con el return y que al marcar todo como "touched" entonces se disparen las validaciones y hay una validación de que si el campo fue tocado y es inválido entonces salga algún mensaje de error para mejorar la experiencia del usuario */
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    /* hacerlo como la FORMA 1 y al hacer el primer submit del formulario funciona normal porque lo inicializa como un arreglo vacío nuevamente pero al querer agregar nuevos elementos al favoriteGames veremos que no se añaden nuevos elementos, una idea puede ser que esto no lo trabaje de forma reactiva, es decir, como que rompe el estado del formArray y no proporciona una forma de cambiar dinámicamente el tipo de control si es necesario en el futuro, entonces para solucionar esto hay algunas formas las cuales las mejores opciones para este caso podrían se la FORMA 2 o FORMA 3 */

    /* FORMA 1: hay problemas al querer agregar un nuevo elemento en el campo favoriteGames */
    /* aquí no se hace con el getter para colocar el arreglo vacío ya que es un getter y se tendría que implementar un setter entonces lo haremos con el formulario completo tomando solo el campo necesario que sería el favoriteGames y se coloca as FormArray para que lo trate como si fuera un FormArray ya que lo estaba tratando como un campo en general, luego se le iguala a un nuevo FormArray que sea un arreglo vacío usando el servicio FormBuilder o sino también un new FormArray([]) que sería lo mismo */
    // (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);

    /* FORMA 2: utilizando setControl() que utiliza un setter para cambiar/resetear el valor de ese FormControl, en este caso que contiene un form array lo cual puede ser útil cuando se necesita cambiar dinámicamente el tipo de control en tiempo de ejecución pero no es tan necesario si solo se está reemplazando el contenido de un FormArray */
    // this.myForm.setControl('favoriteGames', this.formBuilder.array([]));

    /* FORMA 3 usando el método .clear() que elimina todos los controles presentes en el FormArray. Esto es útil si deseas reiniciar o limpiar completamente el FormArray sin asignar uno nuevo aunque no es necesario si se está asignando un nuevo FormArray pero en este caso solo queremos limpiarlo */
    this.getFavoriteGames.clear();

    this.myForm.reset();
  }
}
