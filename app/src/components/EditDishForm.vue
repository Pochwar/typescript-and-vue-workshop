<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useDishStore } from '@/stores/DishStore';
import type { Dish } from '@/types';
import { dishStatusList } from '@/constants';

const dishStore = useDishStore();

type PropsTypes = {
  dish: Dish
}

const props = defineProps<PropsTypes>()

const dishToEdit = ref<Dish|null>(null);

const emits = defineEmits<{
  (e:'close-form'): void
}>();

const elNameInput = ref<HTMLInputElement | null>(null);

const editDish = () => {
  if (dishToEdit.value) {
    dishStore.editDish(dishToEdit.value)
  }
  emits('close-form')
}

const cancelEditDish = () => {
  emits('close-form')
}

onMounted(() => {
  elNameInput.value?.focus();
  dishToEdit.value = { ...props.dish };
})
</script>

<template>
  <form @submit.prevent>
    <div v-if="dishToEdit" class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          <input
            v-model="dishToEdit.name"
            type="text"
            class="input is-large"
            placeholder="Mystery Flavored Shrimp"
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <label for="status" class="label">Status</label>
        <select v-model="dishToEdit.status" name="status" id="status select">
          <option
            v-for="(status, i) in dishStatusList"
            :key="i"
            :value="status"
          >
            {{ status }}
          </option>
        </select>

      </div>
      <div class="field">
        <div class="buttons">
          <button @click="editDish" class="button is-success">Submit</button>
          <button @click="cancelEditDish" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
