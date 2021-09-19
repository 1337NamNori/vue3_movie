# Vue3 learn

## Create app
- `new Vue()` ⮕ `Vue.createApp()`
- `data` phải luôn là method

## Emits Options: 
- định nghĩa event emits
- remove `.native` 

## Vue Router 
- `new VueRouter()` ⮕ `createRouter()`
- `mode: 'history'` ⮕ `history: createWebHistory()`

## Vuex
- `new Vuex.Store()` ⮕ `createStore()`

## Composition API
- `data()`, `computed`, `methods` ⮕ `setup()`
- `ref()`, `reactive()`, `computed()`, `watch()`
- remove `this` keyword
- lifecycle hooks trong `setup()`: `onMounted()`, `onUnmounted()`, `onUpdated()`
- 
## `<script setup>`

- biến hoặc function định nghĩa trong script setup có thể dùng trực tiếp trong template
- hàm hoặc component được import có thể dùng trực tiếp trong template
- `defineProps()`, `defineEmits()`
- có thể dùng song song với `<script>`

## Dynamic CSS 
```vue 
<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

## 

