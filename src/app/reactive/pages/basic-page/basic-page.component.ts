import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent {
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
  /* se podría obviar colocar el tipo FormGroup porque al final lo va a inferir pero es buena práctica tipar lo más que se pueda */
  public myForm: FormGroup = this.formBuilder.group({
    // name: [valor por defecto, validaciones síncronas, validaciones asíncronas],
    // name: ['', [], []],
    name: [''],
    price: [0],
    inStorage: [0],
  });

  handleSaveForm(): void {
    console.log(this.myForm.value);
  }
}

/* ******************************************************************************************************************* */
/* siempre es mejor trabajar con formularios reactivos a menos que sean formularios muy pero muy simples entonces se podría trabajar con formularios con aproximación por template o trabajar con los [(ngModel)]="" que viene en FormsModule pero aunque funcione bien formularios por template o formularios con [(ngModel)]="" es mejor trabajarlos con formularios reactivos.

- Con el [(ngModel)]="" en general va a enlazar el valor pero nosotros queremos trabajar con el formulario que va más allá de manejar el valor del input porque necesitamos por ejemplo un estado completo del input, por ejemplo, tiene una etiqueta required (el input tiene que venir con un valor sí o sí), también se le puede colocar que cumpla una expresión regular, etc.

- Con formularios por template como su nombre lo dice, en el HTML se va a construir la mayor parte de la lógica lo cual puede ser contraproducente ya que lo que queremos es que los archivos HTML sean tal cual etiquetas HTML en su mayoría y no tenga tanta lógica para que sean fáciles de leer y fáciles de mantener.

- Con formularios reactivos quiere decir que vamos a tener la mayor parte de la lógica en el componente de TypeScript (.ts) ya que con esto hay mayor control, mayor facilidad de uso, los datos que vamos a utilizar estarán en el lado del componente de TypeScript (.ts) my fácilmente.
*/
