# Vue3 learn

## Create app
- `new Vue()` ⮕ `Vue.createApp()`
- `data` always be a method

## Emits Options: 
- define events that a component can emit to its parent.
- remove `.native` 

## Vue Router 
- `new VueRouter()` ⮕ `createRouter()`
- `mode: 'history'` ⮕ `history: createWebHistory()`

## Vuex
- `new Vuex.Store()` ⮕ `createStore()`

## Composition API
- `data()`, `computed`, `methods` ⮕ `setup()`
- `ref()`, `computed()`, `watch()`
- remove `this` keyword
