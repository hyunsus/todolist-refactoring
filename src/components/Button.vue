<template>
  <div class="ac">
    <button
      class="allfix-btn"
      id="btn1"
      @click="toggleBtn()"
    >
      편집
    </button>
    <div
      class="aa"
      id="ac"
    >
      <button
        class="btn"
        id="btn2"
        @click='actionSetSaveModal(true)'
      >
        등록
      </button>
      <button class="btn2" @click='actionSetEditModal(true)'>수정</button>
      <button class="btn3" @click="removeTodo()">삭제</button>
    </div>

    <modal v-if="getEditModal" @close="actionSetEditModal(false)">
      <h3 slot="header">수정하기</h3>
      <span slot="footer">
        수정할 내용을 작성해주세요
        <input
          type="text"
          v-model="getEditItem.value"
          onfocus="this.select()"
          @keypress.enter="editTodoAction()"
        />&nbsp;
        <span
          class="fixBtn"
          type="button"
          @click="editTodoAction()"
        >
          <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <i
          class="close-modal-btn fa fa-times"
          aria-hidden="true"
          @click="actionSetEditModal(false)"
        ></i>
      </span>
    </modal>

    <modal v-if="getSaveModal" @close="actionSetSaveModal(false)">
      <h3 slot="header">등록하기</h3>
      <span slot="footer">
        등록할 내용을 작성해주세요
        <input
          type="text"
          v-model="newTodoItem"
          onfocus="this.select()"
          @keypress.enter="addTodo()"
        />&nbsp;
        <span
          class="fixBtn"
          type="button"
          @click="addTodo()"
        >
          <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <i
          class="close-modal-btn fa fa-times"
          aria-hidden="true"
          @click="actionSetSaveModal(false)"
        ></i>
      </span>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import Modal from './common/Modal.vue';

export default {
  components: {
    Modal,
  },
  computed: {
    ...mapGetters(['getTodoItem', 'getIdx', 'getEditModal', 'getDelModal', 'getEditItem', 'getSaveModal', 'getTodoItem']),
    valueShowEditModal: {
      get() {
        return this.getEditModal;
      },
      set(val) {
        this.actionSetEditModal(val);
      },
    },
    valueShowSaveModal: {
      get() {
        return this.getSaveModal;
      },
      set(val) {
        this.actionSetSaveModal(val);
      },
    },
  },
  date() {
    return {
      newTodoItem: '',
    };
  },
  methods: {
    ...mapActions(['actionRemoveTodo', 'actionSetEditModal', 'actionSetSaveModal', 'actionAddTodo', 'actionEditTodo']),
    /**
    * 선택한 일 삭제
    */
    toggleBtn() {
      const btn1 = document.getElementById('ac');
      if (btn1.style.visibility !== 'hidden') {
        btn1.style.visibility = 'hidden';
      } else {
        btn1.style.visibility = 'visible';
      }
    },

    addTodo() {
      if (this.newTodoItem !== '' && this.newTodoItem) {
        const value = this.newTodoItem.trim();
        const date1 = moment();
        const date = date1.format('YYYY.MM.DD HH:mm:ss');
        const key = `key${date1}`;
        this.actionAddTodo({
          key,
          value,
          date,
        });
        this.clearInput();
      }
      this.actionSetSaveModal(false);
    },
    clearInput() {
      this.newTodoItem = '';
    },
    removeTodo() {
      const index = this.getIdx;
      const key = this.getTodoItem[this.getIdx];
      if (index === '') {
        console.log('삭제불가');
      } else {
        this.actionRemoveTodo({ key, index });
      }
    },
    editTodoAction() {
      const objDate = moment();
      const formatdate = objDate.format('YYYY.MM.DD HH:mm:ss');
      const date = formatdate;
      const index = this.getIdx;
      const key = this.getTodoItem[this.getIdx].key;
      const value = this.getEditItem.value;
      this.actionEditTodo({
        index,
        key,
        date,
        value,
      });
      this.getEditItem.value = '';
      this.actionSetEditModal(false);
    },
  },
};
</script>

<style scoped>
.ac{
  float:right;
}
.aa{
  float:right;
}
.check-btn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.edit-btn,
.fixBtn {
  margin-left: auto;
  color: forestgreen;
  cursor: pointer;
}
</style>
