import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../models/user';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/users"

  currentUser = signal<User | null>(null);

  register(req: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, req);
  }

 login(email: string, password: string): Observable<boolean> {
    // Normalizamos el email eliminando espacios y pasando a minúsculas
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Creamos los parámetros de forma segura para la URL
    const params = new HttpParams()
      .set('email', cleanEmail)
      .set('password', cleanPassword);

    return this.http.get<User[]>(this.apiUrl, { params }).pipe(
      tap(users => console.log('Usuarios devueltos por el servidor:', users)),
      map((users: User[]) => {
        if (users.length > 0) {
          this.currentUser.set(users[0]); 
          return true; 
        } else {
          this.currentUser.set(null);
          return false; 
        }
      })
    );
  }

}
