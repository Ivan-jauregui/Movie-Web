import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { heroArrowRightMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,NgIconComponent],
  providers: [
    provideIcons({ heroArrowRightMini}) 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);


  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    this.authService.login(formValue.email, formValue.password).subscribe({
      next: (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          window.alert(this.authService.currentUser()?.email);
          this.router.navigate(['/']);
        } else {
          window.alert('Correo o contraseña incorrectos.');
        }
      },
      error: (err) => console.error('Error de credenciales', err)
    });
  }
}
