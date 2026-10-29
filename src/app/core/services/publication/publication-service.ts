import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../../models/publicacion';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000/publications";

  save(req: Publication): Observable<Publication> {
    return this.http.post<Publication>(this.apiUrl, req)
  }

  getAll(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}?_embed=images`);
  }
  
  getById(id: string): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/${id}?_embed=images`);
  }

  getPublicationsByUser(userId: string): Observable<Publication[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Publication[]>(this.apiUrl, { params });
  }

  getPublicationsByBatchId(id: number): Observable<Publication[]> {
    return this.getAll().pipe(
      map((data: Publication[]) => data.filter(p => p.publicationId === id))
    );
  }
}
