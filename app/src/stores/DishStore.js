import { defineStore } from 'pinia';
export const useDishStore = defineStore('DishStore', {
    state: () => ({
        list: [
            {
                id: '7d9f3f17-964a-4e82-98e5-ecbba4d709a1',
                name: 'Ghost Pepper Poppers',
                status: 'Want to Try',
            },
            {
                id: '5c986b74-fa02-4a22-98f2-b1ff3559e85e',
                name: 'A Little More Chowder Now',
                status: 'Recommended',
            },
            {
                id: 'c113411d-1589-414f-a283-daf7eedb631e',
                name: 'Full Laptop Battery',
                status: 'Do Not Recommend',
            },
        ]
    }),
    getters: {
        numberOfDishes: (state) => {
            return state.list.length;
        }
    },
    actions: {
        addDish(payload) {
            this.list.push(payload);
        },
        deleteDish(payload) {
            this.list = this.list.filter((dish) => {
                return dish.id !== payload.id;
            });
        },
        editDish(payload) {
            const index = this.list.findIndex((dish) => dish.id === payload.id);
            if (index !== -1) {
                this.list.splice(index, 1, payload);
            }
        }
    }
});
