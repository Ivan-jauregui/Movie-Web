import { Component, input } from '@angular/core';
import { User } from '../../../../core/models/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'seller-card',
  imports: [RouterLink],
  templateUrl: './seller-card.component.html',
  styleUrl: './seller-card.component.css'
})
export class SellerCard{
  user = input<User | null>(null)
}
