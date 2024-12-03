import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/users.service';
import { UserInterface } from '../../interfaces/users.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  inputUsername: string = ''; // Variable para capturar el nombre de usuario ingresado
  inputPassword: string = ''; // Variable para capturar la contraseña ingresada
  error: string = 'Credenciales incorrectas, por favor verifique.'; 
  

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.getUsers().subscribe({
      next: (userList: UserInterface[]) => {
        const matchedUser = userList.find(
          (item) =>
            item.name === this.inputUsername &&
            item.password === this.inputPassword
        );

        if (matchedUser) {
          // Usuario y contraseña correctos: almacenar información en localStorage
          localStorage.setItem('loggedUser', JSON.stringify(matchedUser));
          this.router.navigate(['/dashboard']);
        } else {
          // Usuario o contraseña incorrectos: mostrar alerta
          window.alert('Usuario o contraseña incorrectos');
        }
        if (matchedUser) {
          // Redirigir al dashboard si las credenciales son correctas
          this.router.navigate(['/home']);
        } else {
          // Credenciales incorrectas: mostrar mensaje de error
          this.showAlert(this.error);
        }
      },
      error: (err) => {
        // Gestión de errores en la solicitud
        this.showAlert('No se pudo establecer conexión. Intente nuevamente.');
        console.error(err);
      },
    });
  }

  private showAlert(message: string): void {
    window.alert(message);
  }
}
