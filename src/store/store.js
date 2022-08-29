import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    todoItems: [],
    editTodoObj: {
      key: '',
      index: '',
      value: '',
    },
    idx: '',
    saveModal: false,
    editModal: false,
    warnModal: false,
  },
  getters: {
    getIdx: (state) => state.idx,
    getTodoItem: (state) => state.todoItems,
    getEditItem: (state) => state.editTodoObj,
    getEditModal: (state) => state.editModal,
    getSaveModal: (state) => state.saveModal,
    getWarnModal: (state) => state.warnModal,
  },
  mutations: {
    setEditModal: (state, payload) => {
      state.editModal = payload;
    },
    setSaveModal: (state, payload) => {
      state.saveModal = payload;
      console.debug(payload);
    },
    setWarnModal: (state, payload) => {
      state.warnModal = payload;
      console.debug(payload);
    },
    setIdx: (state, payload) => {
      state.idx = payload;
      console.debug(payload);
    },
    checkArr: (state, payload) => {
      state.editTodoObj = payload;
      console.debug(state.editTodoObj);
    },
    addTodo: (state, payload) => {
      state.todoItems.push(payload);
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    removeAllOfParents: (state) => {
      state.todoItems = [];
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    removeTodo: (state, payload) => {
      state.todoItems.splice(payload.index, 1);
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    editTodo: (state, payload) => {
      const item = {
        key: payload.key,
        value: payload.value,
        date: payload.date,
      };
      // state.todoItems[payload.index] = item;
      state.todoItems.splice(payload.index, 1, item);
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
  },
  actions: {
    actionAddTodo: (context, payload) => context.commit('addTodo', payload),
    actionRemoveAllOfParents: (context) => context.commit('removeAllOfParents'),
    actionRemoveTodo: (context, payload) => context.commit('removeTodo', payload),
    actionEditTodo: (context, payload) => context.commit('editTodo', payload),
    actionCheckArr: (context, payload) => context.commit('checkArr', payload),
    actionSetEditModal: (context, payload) => context.commit('setEditModal', payload),
    actionSetSaveModal: (context, payload) => context.commit('setSaveModal', payload),
    actionSetIdx: (context, payload) => context.commit('setIdx', payload),
    actionSetWarnModal: (context, payload) => context.commit('setWarnModal', payload),
  },
});
