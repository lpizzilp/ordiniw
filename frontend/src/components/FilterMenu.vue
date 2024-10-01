<!-- FilterMenu.vue -->
<template>
    <div class="filter-menu-container">
      <div class="filter-menu" ref="menuRef">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="applyFilter(filter)"
          :class="{ active: activeFilter === filter }"
          class="filter-button"
        >
          {{ filter }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterMenu',
    data() {
      return {
        filters: ['Bevande', 'Panini', 'Dolci', 'Vino', 'Antipasti', 'Primi', 'Secondi'],
        activeFilter: null,
      }
    },
    methods: {
      applyFilter(filter) {
        this.activeFilter = filter
        // Qui puoi aggiungere la logica per applicare effettivamente il filtro
        this.$emit('filter-changed', filter)
      },
    },
  }
  </script>
  
  <style scoped>
  .filter-menu-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    z-index: 1000;
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  
  .filter-menu {
    display: flex;
    padding: 10px 0;
  }
  
  .filter-button {
    padding: 8px 16px;
    margin-right: 8px;
    border: none;
    background-color: #f0f0f0;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .filter-button.active {
    background-color: #007bff;
    color: white;
  }
  </style>