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

  /* en el campo del formulario HTML hay que hacer referencia al favoriteGames y para eso hay que enlazar el input HTML con la propiedad del formulario favoriteGames pero como favoriteGames es un arreglo entonces en el HTML se usaría un *ngFor="" y en vez de que tenga toda la lógica en el HTML para enlazar el input con la propiedad del formulario entonces mejor es crear un getter para acceder a la propiedad y sus valores */
  get getFavoriteGames() {
    /* aquí se podría hacer con el controls como this.myForm.controls['favoriteGames']..... pero también se podría usar el get(nombre_campo) pero dejarlo solo de esa forma entonces nos dirá que es de tipo AbstractControl<any, any> | null es decir, que es un FormControl pero que no sabe de qué tipo de FormControl entonces siguiendo la documentación nos dice que colocamos as FormArray para que sepa que es un FormArray([]) y que podemos iterarlo */
    return this.myForm.get('favoriteGames') as FormArray;
  }

  handleSubmit(): void {
    if (this.myForm.invalid) {
      /* si el formulario es inválido entonces que marque todos los campos como "touched" y que no haga nada más. Esto con la finalidad de que cuando los campos y el formulario como tal no esté correcto entonces no se envíe nada y corte el proceso de este scope con el return y que al marcar todo como "touched" entonces se disparen las validaciones y hay una validación de que si el campo fue tocado y es inválido entonces salga algún mensaje de error para mejorar la experiencia del usuario */
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
