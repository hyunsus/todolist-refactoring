import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    todoItems: [],
    editTodoObj: {
      key: '',
      index: '',
      value: '',
      category: '',
    },
    idx: '',
    saveModal: false,
    editModal: false,
    warnModal: false,
    hobbySum: 0,
    exerciseSum: 0,
    etcSum: 0,
  },
  getters: {
    getIdx: (state) => state.idx,
    getTodoItem: (state) => state.todoItems,
    getEditItem: (state) => state.editTodoObj,
    getEditModal: (state) => state.editModal,
    getSaveModal: (state) => state.saveModal,
    getWarnModal: (state) => state.warnModal,
    getExerciseSum: (state) => state.exerciseSum,
    getHobbySum: (state) => state.hobbySum,
    getEtcSum: (state) => state.etcSum,
  },
  mutations: {
    /**
     *  created()에서 data 초기화 하는 부분
     * @param {*} state
     */
    dataInit: (state) => {
      if (localStorage.getItem('vue-todo')) {
        state.todoItems = JSON.parse(localStorage.getItem('vue-todo'));
        state.todoItems.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
      }
    },
    /**
     * editmodal 창 띄우고, 닫기
     * @param {*} state
     * @param {*} payload editmodal setter 값
     */
    setEditModal: (state, payload) => {
      state.editModal = payload;
    },
    /**
     * savemodal 창 띄우고, 닫기
     * @param {*} state
     * @param {*} payload savemodal setter 값
     */
    setSaveModal: (state, payload) => {
      state.saveModal = payload;
    },
    /**
     * warnmodal 창 띄우고, 닫기
     * @param {*} state
     * @param {*} payload warnmodal setter 값
     */
    setWarnModal: (state, payload) => {
      state.warnModal = payload;
    },
    /**
     * 라디오 버튼으로 선택한 Index값 가져오기
     * @param {*} state
     * @param {*} payload index setter 값
     */
    setIdx: (state, payload) => {
      state.idx = payload;
      console.debug('선택한 Index값 = ', payload);
    },
    /**
     * 항목 추가
     * @param {*} state
     * @param {*} payload 추가할 항목 Object
     */
    addTodo: (state, payload) => {
      state.todoItems.push(payload);
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    /**
     * 전체 삭제
     * @param {*} state
     */
    removeAll: (state) => {
      state.todoItems = [];
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    /**
     * 항목 삭제(선택한 항목)
     * @param {*} state
     * @param {*} payload 삭제할 항목 Object(선택한 항목)
     */
    removeTodo: (state, payload) => {
      state.todoItems.splice(payload.index, 1);
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    /**
     * 항목 수정(선택한 항목)
     * @param {*} state
     * @param {*} payload 수정할 항목 Object (선택한 항목)
     */
    editTodo: (state, payload) => {
      const item = {
        key: payload.key,
        value: payload.value,
        date: payload.date,
        category: payload.category,
      };
      state.todoItems.splice(payload.index, 1, item);
      localStorage.setItem('vue-todo', JSON.stringify(state.todoItems));
    },
    /**
     * 카테고리별 차트데이터
     * @param {*} state
     */
    reCalculate: (state) => {
      // filter를 이용하여 category 별로 변수에 담기
      const exerciseList = _.filter(state.todoItems, (item) => item.category === '운동');
      const hobbyList = _.filter(state.todoItems, (item) => item.category === '취미');
      const etcList = _.filter(state.todoItems, (item) => item.category === '기타');
      // reduce를 이용하여 카테고리 수 확인
      state.exerciseSum = _.reduce(exerciseList, (Sum) => (Sum + 1), 0);
      state.hobbySum = _.reduce(hobbyList, (Sum) => (Sum + 1), 0);
      state.etcSum = _.reduce(etcList, (Sum) => (Sum + 1), 0);
    },
  },
  actions: {
    actionAddTodo: (context, payload) => context.commit('addTodo', payload),
    actionRemoveAll: (context) => context.commit('removeAll'),
    actionRemoveTodo: (context, payload) => context.commit('removeTodo', payload),
    actionEditTodo: (context, payload) => context.commit('editTodo', payload),
    actionSetEditModal: (context, payload) => context.commit('setEditModal', payload),
    actionSetSaveModal: (context, payload) => context.commit('setSaveModal', payload),
    actionSetWarnModal: (context, payload) => context.commit('setWarnModal', payload),
    actionSetIdx: (context, payload) => context.commit('setIdx', payload),
    actionDataInit: (context) => context.commit('dataInit'),
    actionReCalculate: (context) => context.commit('reCalculate'),
  },
});
