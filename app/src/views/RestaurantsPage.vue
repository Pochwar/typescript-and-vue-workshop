<script setup lang="ts">
import NewRestaurantForm from '../components/NewRestaurantForm.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import SideMenu from '../components/SideMenu.vue'
import { computed, onMounted, ref } from 'vue';
import type { Restaurant } from '@/types';
import { useRoute } from 'vue-router';
import { useRestaurantStore } from '@/stores/RestaurantStore';
import { storeToRefs } from 'pinia';

// Restaurant
const filterText = ref('');
const restaurantStore = useRestaurantStore();
const { list: restaurantList } = storeToRefs(restaurantStore);

const filteredRestaurantList = computed((): Restaurant[] => {
  return restaurantList.value.filter((restaurant: Restaurant) => {
    if (restaurant.name) {
      return restaurant.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return restaurantList
    }
  })
})

const addRestaurant = (payload: Restaurant): void => {
  restaurantStore.addRestaurant(payload)
  hideForm()
};

const deleteRestaurant = (payload: Restaurant): void => {
  restaurantStore.deleteRestaurant(payload);
};

const updateFilterText = (payload: Event) => {
  filterText.value = (payload.target as HTMLInputElement).value;
}

// New form
const showNewForm = ref(false);
const hideForm = (): void => {
  showNewForm.value = false
};
onMounted(() => {
  const route = useRoute();
  if (route.query.new) {
    showNewForm.value = true
  }
})
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Restaurants</h1>

        <!-- CTA Bar -->
        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ restaurantStore.numberOfRestaurants }}</strong> restaurants
              </p>
            </div>

            <p class="level-item">
              <button @click="showNewForm = true" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Restaurant name" :value="filterText"
                   @keyup.enter="updateFilterText"
                  />
                </p>
                <p class="control">
                  <button class="button" @click="updateFilterText">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Restaurant Form -->
        <NewRestaurantForm v-if="showNewForm" @add-new-restaurant="addRestaurant" @cancel-new-restaurant="hideForm" />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredRestaurantList" class="column is-full" :key="`item-${item}`">
            <RestaurantCard :restaurant="item" @delete-restaurant="deleteRestaurant" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
