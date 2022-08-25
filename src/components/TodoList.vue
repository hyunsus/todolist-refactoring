<template>
  <section>
    <transition-group name="list" tag="ul">
      <li
        v-for="({ key, value, date }, index) in getTodoItem"
        :key="key"
        class="shadow"
      >
        <div>
          <input
            type="radio"
            name="aa"
            v-model ="idx"
            :value ="index"
          />{{ value }}&nbsp;&nbsp;
        </div>

        <!--
        <i class="check-btn fa fa-check" aria-hidden="true"></i>
        {{ value }}&nbsp;&nbsp;
        -->
        <span class="text-muted"> {{ date }}</span>
        <span
          class="edit-btn"
          type="button"
          @click="editTodo(key, index, value)"
        >
          <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <span
          class="remove-btn"
          type="button"
          @click="removeTodo(key, index)"
        >
          <i class="fa fa-trash" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>

    <button @click='checkArr()'>수정</button>
    <!--
    <button @click='removeArr()'>삭제</button>
    -->
  </section>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';
import Modal from './common/Modal.vue';

export default {

  data() {
    return {
      editModal: false,
      idx: '',
    };
  },
  computed: {
    ...mapGetters(['getTodoItem', 'getEditItem']),
  },
  methods: {
    ...mapActions(['actionRemoveTodo', 'actionEditTodo', 'actionCheckArr']),
    checkArr() {
      const index = this.idx;
      const value = this.getTodoItem[this.idx].value;
      const key = this.getTodoItem[this.idx].key;
      console.debug(index);
      this.actionCheckArr({ index, value, key });
      this.editModal = !this.editModal;
    },
    removeArr() {
      const index = this.idx;
      const key = this.getTodoItem[this.idx].key;
      this.actionRemoveTodo({ key, index });
    },
    removeTodo(key, index) {
      this.actionRemoveTodo({ key, index });
    },
    editTodo(key, index, value) {
      this.getEditItem.index = index;
      this.getEditItem.value = value;
      this.getEditItem.key = key;
      this.editModal = !this.editModal;
    },
    editTodoAction() {
      const objDate = moment();
      const formatdate = objDate.format('YYYY.MM.DD HH:mm:ss');
      const date = formatdate;
      const index = this.getEditItem.index;
      const key = this.getEditItem.key;
      const value = this.getEditItem.value;
      this.actionEditTodo({
        index,
        key,
        date,
        value,
      });
      this.editModal = false;
    },
  },

};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0px;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
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
.remove-btn {
  margin-left: 10px;
  color: #de4343;
  cursor: pointer;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-move {
  transition: transform 1s;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.text-muted {
  color: gray;
  font-size: 0.6em;
}
.radioBtn{
  width: 20px;
}
</style>
