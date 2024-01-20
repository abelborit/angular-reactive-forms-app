import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

/* este podría ser un producto que nos envía el backend y al cargar la primera vez este componente lo tendríamos que establecer en el formulario y por eso se hace uso del OnInit y ngOnInit */
const fakeProduct = {
  name: 'Memory SSD',
  price: 2500,
  inStorage: 50,
};

@Component({
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent implements OnInit {
  /* para trabjar con formularios reactivos se puede hacer con el FormGroup o con el servicio FormBuilder que una ventaja es que nos ayuda un poco al momento de crear un formulario pero al final de cuentas es lo mismo trajarlo con el FormGroup o con el FormBuilder y ya es cuestión de gustos y preferencias */

  /* una consideración a tener en cuenta es que cuando se trabajen con formularios reactivos es necesario que cada elemento de nuestro formulario (inputs, etc...) tienen que estar adentro de un elemento HTML padre, es decir, si se colocan dos inputs los cuales hacen referencia a las propiedades de mi formulario reactivo, entonces estos dos inputs tienen que estar adentro de un componente padre como un div, form, etc... pero debe tener un elemento HTML padre que los envuelva donde en este caso usaremos una etiqueta <form></form> */

  /* aquí se podrían ir creando todas los inputs que voy a necesitar para el formulario y que sean un new FormControl() y asignarle un valor por defecto como por ejemplo public name = new FormControl(''); luego tener un public email = new FormControl(''); pero al hacerlo así no sería un formulario reactivo, serían solo propiedades reactivas que tenemos en nuestro componente, es decir, pequeñas piezas de controles que tenemos aquí en nuestro componente */
  /* pero para que sea un formulario reactivo crearemos una propiedad general que sea un FormGroup() y que tenga todos los inputs del formulario que serán FormControl() o una propiedad general mediante el servicio FormBuilder e ir creando sus propiedades del formulario */

  /* FORMA 1: FormGroup() */
  // public myForm: FormGroup = new FormGroup({
  //   /* FormControl es un genérico donde se le puede colocar el tipo de dato que va a fluir dentro de él o sino se puede dejar que TypeScript lo infiera por nosotros */
  //   /* en las validaciones síncronas o asíncronas si solo es una validación síncrona o una asíncronas entonces se coloca directamente pero si son varias entonces se colocan en un array */
  //   // name: new FormControl(valor por defecto, validaciones síncronas, validaciones asíncronas),
  //   // name: new FormControl('', [], []),
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  /* FORMA 2: inyectando el servicio FormBuilder que al final es una sintaxis un poco más cómoda porque a la larga lo que hace el FormBuilder es traducirlo a la forma del FormGroup() */
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    /* otro uso bien común del reset() es que cuando nosotros tenemos una carga (por ejemplo, queremos entrar a una página web) y viene por el url y tenemos que leer esa url porque esos valores son valores que tenemos que establecer en el formulario, nosotros haremos eso mediante un OnInit y ngOnInit y técnicamente en el ngOnInit es donde vamos a inicializar nuestro formulario */
    this.myForm.reset(fakeProduct);
  }

  /* este función se podría trabajar también como un getter pero ahora lo haremos solo como un método y tendrá como objetivo simplificar la forma en cómo generar la validación si el campo está correcto o incorrecto y estará revisando si el campo en su objeto errors tiene algún error y si el campo fue tocado lo cual al final el método isNotValidField() devolverá un true o un false o también puede ser un null ya que el objeto errors si no tiene nada es un null y el touched devuelve un boolean */
  isNotValidField(field: string): boolean | null {
    // console.log('render isNotValidField');

    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
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

  /* se podría obviar colocar el tipo FormGroup porque al final lo va a inferir pero es buena práctica tipar lo más que se pueda */
  public myForm: FormGroup = this.formBuilder.nonNullable.group({
    // name: [valor por defecto, validaciones síncronas, validaciones asíncronas],
    // name: ['', [], []],
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  handleSaveForm(): void {
    /* ya están las validaciones arriba pero igual se puede mandar el formulario, ahora hay que comprobarlas y cuando se cumplan todas entonces recién se podría enviar el formulario */
    if (this.myForm.invalid) {
      /* si el formulario es inválido entonces que marque todos los campos como "touched" y que no haga nada más. Esto con la finalidad de que cuando los campos y el formulario como tal no esté correcto entonces no se envíe nada y corte el proceso de este scope con el return y que al marcar todo como "touched" entonces se disparen las validaciones y hay una validación de que si el campo fue tocado y es inválido entonces salga algún mensaje de error para mejorar la experiencia del usuario */
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    /* el reset hace dos funciones:
      1. Regresa el formulario a su valor original
      2. Si le mandamos un argumento entonces automáticamente establece los campos cuyos nombres coincidan con las propiedades de mi formulario. No es necesario colocar todas las propiedades porque el reset automáticamente lo hará por nosotros pero lo dejará como null */

    /* valores por defecto pero será todo null. Si se coloca nonNullable en this.formBuilder.group() entonces volverá a sus valores iniciales que se le hayan definido */
    // this.myForm.reset();

    /* resetear el formulario colocando los valores que se le está pasando como argumento */
    this.myForm.reset({ name: 'Laptop MK-II', price: 5000, inStorage: 50 });
  }
}

/* ******************************************************************************************************************* */
/* siempre es mejor trabajar con formularios reactivos a menos que sean formularios muy pero muy simples entonces se podría trabajar con formularios con aproximación por template o trabajar con los [(ngModel)]="" que viene en FormsModule pero aunque funcione bien formularios por template o formularios con [(ngModel)]="" es mejor trabajarlos con formularios reactivos.

- Con el [(ngModel)]="" en general va a enlazar el valor pero nosotros queremos trabajar con el formulario que va más allá de manejar el valor del input porque necesitamos por ejemplo un estado completo del input, por ejemplo, tiene una etiqueta required (el input tiene que venir con un valor sí o sí), también se le puede colocar que cumpla una expresión regular, etc.

- Con formularios por template como su nombre lo dice, en el HTML se va a construir la mayor parte de la lógica lo cual puede ser contraproducente ya que lo que queremos es que los archivos HTML sean tal cual etiquetas HTML en su mayoría y no tenga tanta lógica para que sean fáciles de leer y fáciles de mantener.

- Con formularios reactivos quiere decir que vamos a tener la mayor parte de la lógica en el componente de TypeScript (.ts) ya que con esto hay mayor control, mayor facilidad de uso, los datos que vamos a utilizar estarán en el lado del componente de TypeScript (.ts) my fácilmente.
*/

/* ******************************************************************************************************************* */
/* ¿Afecta el rendimiento en memoria el usar los getter - *ngIf - observable? */
/* la logica o función de lo que contengan se ejecutan constantemente y es cierto que pueden generar ejecuciones innecesarias si no se manejan adecuadamente. Los getters y métodos en *ngIf se evalúan en cada ciclo de detección de cambios, lo que podría afectar el rendimiento si no se trabaja de forma eficiente. Los observables también pueden tener un impacto en el rendimiento si no se gestionan de manera adecuada, especialmente si no se liberan correctamente en el onDestroy del componente para evitar fugas de memoria.

En cuanto al *ngIf en un control de formulario, el cambio se activará cada vez que haya cambios en el ciclo de vida del componente y no solo cuando el campo cambie. Esto significa que cualquier cambio en el ciclo de vida del componente podría activar la evaluación del *ngIf. Siempre es una buena práctica optimizar el código y minimizar las ejecuciones repetidas para lograr un mejor rendimiento. */
