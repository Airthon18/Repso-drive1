import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface User{
  id: number;
  username: string;
  password: string;
  role: string;
  estate?: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private router: Router) {}

  Users: User[] = [
    { id: 1, username: 'admin', password: '1234', role: 'admin', estate: true },
    { id: 2, username: 'user', password: '5678', role: 'user', estate: true },
    { id: 3, username: 'user2', password: '0000', role: 'user', estate: false }
  ]

  onLogin() {
    const user = this.Users.find(u => u.username === this.username && u.password === this.password);
    if (user && user.estate) {
      localStorage.setItem('sessionUser', JSON.stringify(user));
      // Redirección según rol
      if (user.role === 'admin') {
        this.router.navigate(['/usuarios']);
      } else if (user.role === 'user') {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
