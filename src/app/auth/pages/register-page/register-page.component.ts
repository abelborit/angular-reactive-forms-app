import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  constructor(private formBuilder: FormBuilder) {}

  public myForm: FormGroup = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  isNotValidField(field: string): boolean | null {
    // console.log('render isNotValidField');
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  handleSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset();
  }
}
