import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

export const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');


  if (!password || !confirmPassword || password.value === confirmPassword.value) {
    return null;
  }


  confirmPassword.setErrors({ passwordMismatch: true });
  return { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  form!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService)
  private router = inject(Router);


  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
     confirmPassword: ['', [Validators.required]]
    }, { validators: passwordsMatchValidator });
  }


  get passwordsDoNotMatch(): boolean {
    const confirm = this.form.get('confirmPassword');
    return !!(confirm?.hasError('passwordMismatch') && confirm?.touched);
  }

  register(): void {
   if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

      const formValue = this.form.value;

      const user: User = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phoneNumber: formValue.phoneNumber,
        password: formValue.password,
      }

  
      this.authService.register(user).subscribe({
        next: (response: any) => {
          //localStorage.setItem('token', response.token);
          window.alert("Sesion Iniciada")
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error de credenciales', err)
      })
  }
}
