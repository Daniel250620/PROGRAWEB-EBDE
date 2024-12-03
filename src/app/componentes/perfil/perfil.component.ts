import { Component } from '@angular/core';
import { UserInterface } from '../../interfaces/users.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  user: UserInterface | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      console.error('No user is logged in');
    }
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
}
