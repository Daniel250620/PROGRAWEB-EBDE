import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/users.service';
import { UserInterface } from '../../interfaces/users.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: UserInterface[] = [];
  displayedUsers: UserInterface[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 5;
  sortDirection: { [key: string]: boolean } = {};

  constructor(private userService: UserService) {
    // Inicializa el objeto de dirección de ordenamiento
    this.sortDirection = {
      id: false,
      name: false,
      email: false,
      role: false,
    };
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.updateDisplayedUsers();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      },
    });
  }

  updateDisplayedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.users.slice(start, end);
  }

  nextPage() {
    if (this.endIndex < this.users.length) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.users.length);
  }

  trackByUserId(index: number, user: UserInterface): number {
    return user.id;
  }
  sortTable(column: keyof UserInterface) { // Cambiado aquí
    this.sortDirection[column] = !this.sortDirection[column]; // Cambia la dirección de orden
    const direction = this.sortDirection[column] ? 1 : -1; // 1 para ascendente, -1 para descendente

    this.displayedUsers.sort((a, b) => {
      if (a[column] < b[column]) {
        return -1 * direction;
      }
      if (a[column] > b[column]) {
        return 1 * direction;
      }
      return 0;
    });
  }
}
