import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../../../../core/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [],
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent {
  private readonly userService = inject(UserService);

  readonly userId = input<string>();


  readonly user = signal<User | null>(null);

  constructor() {
    effect(() => {
      const id = this.userId();
      if (id) {
        this.fetchUser(id);
      }
    });
  }

  private fetchUser(id: string): void {
    this.userService.getById(id).subscribe({
      next: (data) => this.user.set(data),
      error: (err) => console.error(`[PublicProfile] Error al obtener usuario con ID: ${id}`, err)
    });
  }
}
