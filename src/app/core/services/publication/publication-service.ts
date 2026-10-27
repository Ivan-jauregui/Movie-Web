import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../../models/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicationService{
  private http = inject(HttpClient);
  private apiUrl="http://localhost:3000/publications";

  save(req:Publication):Observable<Publication>{
    return this.http.post<Publication>(this.apiUrl,req)
  }

  getAll(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}?_embed=images`);
  }


  getById(id: string): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/${id}?_embed=images`);
  }

}
