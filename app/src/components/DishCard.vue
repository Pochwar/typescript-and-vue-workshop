<script setup lang="ts">
import EditDishForm from '@/components/EditDishForm.vue';
import { computed, ref } from 'vue';
import type { Dish } from '@/types';

type PropsTypes = {
  dish: Dish
}

const props = defineProps<PropsTypes>()
const emits = defineEmits<{
  (e: 'delete-dish', dish: Dish): void
}>()

const statusColor = computed(() => {
  switch (props.dish.status) {
    case 'Want to Try':
      return 'is-warning'
    case 'Recommended':
      return 'is-success'
    case 'Do Not Recommend':
      return 'is-danger'
    default:
      return ''
  }
})

const deleteDish = () => {
  emits('delete-dish', props.dish)
}

const showEditDishForm = ref<boolean>(false);
</script>

<template>
  <article class="box">
    <div v-if="!showEditDishForm" class="media">
      <aside class="media-left">
        <img src="https://placehold.jp/150x150.png" alt="" />
      </aside>
      <div class="media-content">
        <p class="title is-4 is-spaced mb-1">
          {{ dish.name }}
        </p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ dish.status }}</span>
        </p>
        <div>
          <button @click="showEditDishForm = true" class="button is-small is-info is-light">Edit</button>
          <button @click="deleteDish" class="button is-small is-danger is-light">Delete</button>
        </div>
      </div>
    </div>
    <EditDishForm
      v-else
      :dish="props.dish"
      @close-form="showEditDishForm = false;"
    />
  </article>
</template>

<style></style>
