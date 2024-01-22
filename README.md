# Angular & TypeScript - Angular Reactive Forms App

---

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

Angular cuenta con varias maneras de manejar formularios pero como consejo sería mejor utilizar los formularios reactivos ya que hay mayor control y es más fácil poder manipular el formulario pero, los formularios por template sirven mucho cuando son tareas simples o rápidas aunque en esos casos igualmente se preferiría no utilizar formularios por template y simplemente tomar el valor que se necesita usando referencias locales.

- Los formularios por template usan el FormsModule. Aquí la validación y lógica del formulario está más enfocada a trabajarla en el HTML lo cual es fácil al principio pero al ya haber validaciones personalizadas, validaciones asíncronas, etc. ya se vuelve mucho más complicado y añadie mucha lógica al HTML lo cual este archivo debería estar lo más limpio posible y dedicado la mayor parte a la estructura HTML como tal.
- Los formularios reactivos usan el ReactiveFormsModule. Aquí la validación y lógica del formulario está más enfocada a trabajarla en el archivo de TypeScript (.ts) lo cual nos da mayor control.

Los temas que se verán son:

- Formularios Reactivos (https://angular.io/guide/reactive-forms)
- Lazyload y tareas relacionadas
- Validaciones propias de Angular
- Validaciones personalizadas
- Validaciones asíncronas
- Arreglos y objetos anidados
- FormBuilder
- FormGroup
- FormArray

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Bootstrap (CDN): https://getbootstrap.com/
  ```html
  <!-- Bootstrap CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
  ```
- ejemplo
- ejemplo

---

# AngularReactiveFormsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
