import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokeService } from '../../services/poke.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-poketabla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poketabla.component.html',
  styleUrl: './poketabla.component.css',
})
export class PoketablaComponent implements OnInit {
  pokemons: Pokemon[] = [];
  displayedPokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  totalPokemons = 0;
  loading = true;
  currentPage = 1;
  pageSize = 5;
  sortField: keyof Pokemon | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  skeletonItems = new Array(5).fill(0);
  searchTerm: string = '';

  // Nuevas propiedades para los modales
  showInfoModal = false;
  selectedPokemon: Pokemon | null = null;
  showEditModal = false;
  showDeleteModal = false;
  editingPokemon: Pokemon | null = null;
  deletingPokemon: Pokemon | null = null;
  tempPokemonName: string = '';

  constructor(private pokeService: PokeService) {}

  ngOnInit() {
    this.loadPokemonList();
    //imprimir en consola la pagina
    console.log(this.endIndex);
    console.log(this.totalPokemons);
  }


  loadPokemonList() {
    this.loading = true;
    const offset = (this.currentPage - 1) * this.pageSize;
    this.pokeService.getPokemonList(this.pageSize, offset).subscribe({
      next: (response) => {
        this.pokemons = response.pokemons;
        this.totalPokemons = response.total;
        this.filterPokemons();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon list:', error);
        this.loading = false;
      },
    });
  }

  onSearch() {
    this.filterPokemons();
  }

  filterPokemons() {
    if (!this.searchTerm.trim()) {
      this.filteredPokemons = [...this.pokemons];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredPokemons = this.pokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchTermLower) ||
          pokemon.id.toString().includes(searchTermLower)
      );
    }
    this.updateDisplayedPokemons();
  }
  updateDisplayedPokemons() {
    let sortedPokemons = [...this.filteredPokemons];
    if (this.sortField) {
      sortedPokemons.sort((a, b) => {
        const aValue = a[this.sortField!];
        const bValue = b[this.sortField!];
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    this.displayedPokemons = sortedPokemons;
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalPokemons) {
      this.currentPage++;
      this.loadPokemonList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemonList();
    }
  }

  sort(field: keyof Pokemon) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.updateDisplayedPokemons();
  }

  getSortClass(field: keyof Pokemon): string {
    if (this.sortField === field) {
      return this.sortDirection === 'asc' ? 'ascending' : 'descending';
    }
    return '';
  }

  trackByPokemonId(index: number, pokemon: Pokemon) {
    return pokemon.id;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.pokemons.length);
  }

  goToFirstPage() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.loadPokemonList();
    }
  }

  goToLastPage() {
    const lastPage = Math.ceil(this.totalPokemons / this.pageSize);
    if (this.currentPage !== lastPage) {
      this.currentPage = lastPage;
      this.loadPokemonList();
    }
  }

  // Nuevos métodos para el modal de eliminación
  deletePokemon(pokemon: Pokemon) {
    this.deletingPokemon = pokemon;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deletingPokemon = null;
  }

  confirmDelete() {
    if (this.deletingPokemon) {
      const index = this.pokemons.findIndex(
        (p) => p.id === this.deletingPokemon!.id
      );
      if (index !== -1) {
        this.pokemons.splice(index, 1);
        this.filterPokemons();
      }
    }
    this.closeDeleteModal();
  }

  // Nuevos métodos para el modal de edición

  closeEditModal() {
    this.showEditModal = false;
    this.editingPokemon = null;
  }

  viewPokemonInfo(pokemon: Pokemon) {
    this.selectedPokemon = { ...pokemon }; // Crear una copia para evitar mutaciones
    this.showInfoModal = true;
  }

  closeInfoModal() {
    this.showInfoModal = false;
    this.selectedPokemon = null;
  }

  getTypes(): string {
    if (!this.selectedPokemon) return '';
    return this.selectedPokemon.types.map((t) => t.type.name).join(', ');
  }

  getAbilities(): string {
    if (!this.selectedPokemon) return '';
    return this.selectedPokemon.abilities.map((a) => a.ability.name).join(', ');
  }

  editPokemon(pokemon: Pokemon) {
    this.editingPokemon = { ...pokemon }; // Crear una copia para evitar mutaciones
    this.tempPokemonName = pokemon.name;
    this.showEditModal = true;
  }

  saveEdit() {
    if (this.editingPokemon && this.tempPokemonName.trim()) {
      const index = this.pokemons.findIndex(
        (p) => p.id === this.editingPokemon!.id
      );
      if (index !== -1) {
        // Crear un nuevo objeto Pokemon con el nombre actualizado
        this.pokemons[index] = {
          ...this.pokemons[index],
          name: this.tempPokemonName.trim(),
        };

        // Actualizar las listas filtradas y mostradas
        this.filterPokemons();
      }
    }
    this.closeEditModal();
  }

}
