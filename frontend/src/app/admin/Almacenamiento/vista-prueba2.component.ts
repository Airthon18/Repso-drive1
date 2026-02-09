import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface FileItem {
  id: number;
  name: string;
  type: string;
  extension: string;
  size: string;
  lastModified: string;
  color: string;
  icon: string;
}

interface Notification {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}


@Component({
  selector: 'app-vista-prueba2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vista-prueba2.component.html',
  styleUrl: './vista-prueba2.component.css'
})
export class VistaPrueba2Component {
  files: FileItem[] = [
    {
      id: 1,
      name: 'Informe Anual 2024.pdf',
      type: 'Documento',
      extension: 'PDF',
      size: '25 MB',
      lastModified: '2 días atrás',
      color: 'blue',
      icon: '📄'
    },
    {
      id: 2,
      name: 'Foto Portada.png',
      type: 'Imagen',
      extension: 'PNG',
      size: '8.5 MB',
      lastModified: '3 días atrás',
      color: 'green',
      icon: '🖼️'
    },
    {
      id: 3,
      name: 'Presentación Producto.mp4',
      type: 'Video',
      extension: 'MP4',
      size: '1.2 GB',
      lastModified: '5 días atrás',
      color: 'red',
      icon: '🎥'
    },
    {
      id: 4,
      name: 'Jingle Publicitario.mp3',
      type: 'Audio',
      extension: 'MP3',
      size: '3.2 MB',
      lastModified: '5 meses atrás',
      color: 'yellow',
      icon: '🎵'
    }
  ];

  // Lista de usuarios disponibles para compartir
  allUsers: User[] = [
    { id: 1, name: 'María González', email: 'maria.gonzalez@empresa.com', avatar: '👩' },
    { id: 2, name: 'Loco Roblox', email: 'Roblox.Abraham@empresa.com', avatar: '👨' },
    { id: 3, name: 'Wilfredo Apaza', email: 'Igor.Wilfredo@empresa.com', avatar: '👩‍💼' },
    { id: 4, name: 'Hassad Cornelio', email: 'carlos.rodriguez@empresa.com', avatar: '👨‍💼' },
    { id: 5, name: 'Laura Sánchez', email: 'laura.sanchez@empresa.com', avatar: '👩‍🦰' },
    { id: 6, name: 'Pedro López', email: 'pedro.lopez@empresa.com', avatar: '👨‍🦱' },
    { id: 7, name: 'Yorch', email: 'sofia.torres@empresa.com', avatar: '👩‍🦳' },
    { id: 8, name: 'Miguel Ángel', email: 'miguel.angel@empresa.com', avatar: '👨‍🦲' }
  ];

  editingFileId: number | null = null;
  newFileName: string = '';
  notification: Notification | null = null;

  // Variables para el modal de compartir
  showShareModal: boolean = false;
  fileToShare: FileItem | null = null;
  searchQuery: string = '';
  selectedUsers: User[] = [];

  get filteredUsers(): User[] {
    if (!this.searchQuery.trim()) {
      return this.allUsers;
    }
    const query = this.searchQuery.toLowerCase();
    return this.allUsers.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }

  showNotification(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.notification = { message, type };
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

  handleEdit(file: FileItem): void {
    this.editingFileId = file.id;
    this.newFileName = file.name;
  }

  saveEdit(fileId: number): void {
    this.files = this.files.map(f =>
      f.id === fileId ? { ...f, name: this.newFileName } : f
    );
    this.editingFileId = null;
    this.showNotification('Archivo renombrado exitosamente');
  }

  cancelEdit(): void {
    this.editingFileId = null;
    this.newFileName = '';
  }

  handleDownload(file: FileItem): void {
    this.showNotification(`Descargando: ${file.name}`);
    console.log('Descargando archivo:', file);
  }

  handleDelete(file: FileItem): void {
    if (confirm('¿Estás seguro de que quieres eliminar este archivo?')) {
      this.files = this.files.filter(f => f.id !== file.id);
      this.showNotification('Archivo eliminado', 'error');
    }
  }

  handleShare(file: FileItem): void {
    this.fileToShare = file;
    this.showShareModal = true;
    this.searchQuery = '';
    this.selectedUsers = [];
  }

  closeShareModal(): void {
    this.showShareModal = false;
    this.fileToShare = null;
    this.searchQuery = '';
    this.selectedUsers = [];
  }

  toggleUserSelection(user: User): void {
    const index = this.selectedUsers.findIndex(u => u.id === user.id);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(user);
    }
  }

  isUserSelected(user: User): boolean {
    return this.selectedUsers.some(u => u.id === user.id);
  }

  confirmShare(): void {
    if (this.selectedUsers.length === 0) {
      this.showNotification('Selecciona al menos un usuario para compartir', 'error');
      return;
    }

    const userNames = this.selectedUsers.map(u => u.name).join(', ');
    this.showNotification(`Archivo compartido con: ${userNames}`, 'success');
    console.log('Compartir archivo:', this.fileToShare, 'con usuarios:', this.selectedUsers);
    this.closeShareModal();
  }

  handleFavorite(file: FileItem): void {
    this.showNotification('Añadido a favoritos', 'info');
    console.log('Marcar como favorito:', file);
  }

  getColorClasses(color: string): { bg: string; text: string; badge: string } {
    const colors: { [key: string]: { bg: string; text: string; badge: string } } = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-400', badge: 'bg-blue-200 text-blue-700' },
      green: { bg: 'bg-green-100', text: 'text-green-400', badge: 'bg-green-200 text-green-700' },
      red: { bg: 'bg-red-100', text: 'text-red-400', badge: 'bg-red-200 text-red-700' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-400', badge: 'bg-yellow-200 text-yellow-700' }
    };
    return colors[color];
  }

  onKeyPress(event: KeyboardEvent, fileId: number): void {
    if (event.key === 'Enter') {
      this.saveEdit(fileId);
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }

}
