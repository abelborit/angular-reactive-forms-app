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

Adicionalmente se verán:

- Validaciones manuales
- Validaciones asíncronas
- Validar contra expresiones regulares
- Separar la lógica de validaciones
- Estado del formulario
- Mensajes de error personalizados

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

### \* NOTAS:

Para las validaciones personalizadas se podría trabajar de algunas formas pero lo que sí es necesario es que para las funciones validadoras lo adecuado es que tengan una sola tarea de validación para hacer el código más limpio y facil de mantener. Algunas formas de trabajar con las validaciones personalizadas son:

- **FORMA 1: `validators.ts`** tener varias funciones en un archivo aparte como en este caso que es un archivo helper que nos ayudará a centralizar todo lo referido a validaciones de formularios. También se pueden crear varios archivos helpers con distintas validaciones según sea el caso. Lo único raro es que se tiene la lógica separada en un archivo aparte como un archivo helper lo cual no está mal tenerlo así ya que es una opción válido solo que es un poco raro y cuando las funciones de validaciones sean más grandes puede ser que sea un poco más dificil el trabajarlo como archivo aparte.

- **FORMA 2: `validators.service.ts`** crear un servicio para las validaciones para hacer la inyección de dependencias e inyectar ese servicio de validaciones al componente y con eso tener todo lo que necesito en ese objeto que retorna el servicio. La ventaja de inyectarlo es que tendríamos acceso al ciclo vida de los componentes de Angular, inyectar otros servicios, etc.

- **FORMA 3: ` email-validator.service.ts`** trabajar similar a los Guards que es utilizar esa estrategia o ese mismo patrón de implementar una clase con una característica o función o propiedad para que pueda ser usado como un validador asíncrono de forma automática. (En los Guards se utilizaba antes "Nombre_Guard implements canMatch...." pero luego se cambio de componentes de clase a componentes funcionales, entonces aquí se hará algo similar con el implements que es la forma antiguar de trabajar con los Guards que será "Nombre_Servicio implements AsyncValidator" para que este servicio creado funcione como validador asíncrono)

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
