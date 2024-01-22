import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [],
})
export class SwitchesPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  public myForm: FormGroup = this.formBuilder.nonNullable.group({
    gender: ['M', Validators.required],
    /* wantNotifications debe tener un valor seleccionado pero no necesariamente siempre será un true */
    wantNotifications: [true, Validators.required],
    /* termsAndConditions debe tener el valor seleccionado y necesariamente siempre será un true */
    termsAndConditions: [false, Validators.requiredTrue],
  });

  /* este podría ser un objeto que nos envía el backend y al cargar la primera vez este componente lo tendríamos que establecer en el formulario o sino en donde sea necesario y por eso se hace uso del OnInit y ngOnInit */
  public person = {
    gender: 'F',
    wantNotifications: false,
  };

  isNotValidField(field: string): boolean | null {
    // console.log('render isNotValidField');

    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  handleSubmit(): void {
    /* la propiedad del formulario termsAndConditions en este caso solo es para validar si el formulario es correcto pero nosotros lo estamos colocando también al momento de hacer el submit del formulario (esa propiedad en un backend puede ser que no sea necesaria y nosotros la estamos mandando y con eso pueden haber algunos problemas pero hay formas para evitar eso) */
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    /* ENVIANDO TODA LA INFORMACIÓN */
    // this.person = this.myForm.value;
    // console.log(this.myForm.value);
    // console.log(this.person);

    /* FORMA 1: eliminando la propiedad pero nos daremos cuenta que TypeScript se queja porque no existe la propiedad "entre comillas" ya que nosotros sí sabemos que viene y aunque esto es una solución permitida a veces da problemas de tipado */
    // delete this.person.termsAndConditions; // accediendo a la propiedad
    // delete this.person['termsAndConditions']; // computando la propiedad

    /* FORMA 2: creando un nuevo objeto aplicando la desestructuración y luego el spread operator. Al hacer la desestructuración entonces estamos separando las propiedades, por un lado tendrá el termsAndConditions y por el otro tendrá el spread operator de las demás propiedades entonces de esa forma ya separamos la propiedad o propiedades que no queremos enviar */
    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);

    this.myForm.reset();
  }
}
