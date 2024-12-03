import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UserInterface } from '../../interfaces/users.interface';
import { UsersComponent } from '../../componentes/users/users.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, NgIf, UsersComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  user: UserInterface | null = null;
  showDropdown: boolean = false;

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
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }
  closeDropdown(event: Event) {
    if (!(event.target as HTMLElement).closest('.user-profile')) {
      this.showDropdown = false;
    }
  }
}
