<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import type { Restaurant } from '@/types';
import { ref, onMounted } from 'vue';
import { restaurantStatusList } from '@/constants';
import { useRestaurantStore } from '@/stores/RestaurantStore';

const restaurantStore = useRestaurantStore();

type PropsTypes = {
  restaurant: Restaurant;
}

const props = defineProps<PropsTypes>();

const restaurantToEdit = ref<Restaurant|null>(null);

const emits = defineEmits<{
  (e:'close-form'): void
}>();

const editRestaurant = () => {
  if (restaurantToEdit.value) {
    restaurantStore.editRestaurant(restaurantToEdit.value)
  }
  emits('close-form')
}
const cancelEditRestaurant = () => {
  emits('close-form')
}

const elNameInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  elNameInput.value?.focus();
  restaurantToEdit.value = { ...props.restaurant };
})
</script>

<template>
  <form @submit.prevent>
    <div v-if="restaurantToEdit" class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          <input
            v-model="restaurantToEdit.name"
            type="text"
            class="input is-large"
            placeholder="Beignet and the Jets"
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <label for="website" class="label">Website</label>
        <div class="control">
          <input v-model="restaurantToEdit.website" type="text" class="input" placeholder="www.beignetandthejets.com" />
        </div>
      </div>
      <div class="field mb-5">
        <label for="status" class="label">Status</label>
        <div class="select">
          <select v-model="restaurantToEdit.status" id="status">
            <option v-for="status in restaurantStatusList" :value="status" :key="`option-${status}`">
              {{ status }}
            </option>
          </select>
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="editRestaurant" class="button is-success">Submit</button>
          <button @click="cancelEditRestaurant" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
