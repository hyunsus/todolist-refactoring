<template>
  <div class="menus">
    <!-- 라벨을 이용하여 버튼 hidden 시키기 -->
    <label
      class="menu"
      for ="menu"
    >
      편집
    </label>
    <input id="menu" type="checkbox">
    <div id = "main-nav">
      <nav id="main">
        <ul>
          <li>
            <!-- 등록 버튼 -->
            <button
              class="custom-btn btn-1"
              @click='actionSetSaveModal(true)'
            >
              등록
            </button>
          </li>
          <!-- 수정 버튼 -->
          <li><button class="custom-btn btn-2" @click='checkModal'>수정</button></li>
          <!-- 삭제 버튼 -->
          <li><button class="custom-btn btn-4" @click="removeTodo">삭제</button></li>
        </ul>
      </nav>
    </div>
    <!-- 경고 모달 -->
    <modal v-if="getWarnModal" @close="actionSetWarnModal(false)">
      <h3 slot="header">경고</h3>
      <span slot="footer">
        할 일을 체크해주세요!
        <i
          class="close-modal-btn fa fa-times"
          aria-hidden="true"
          @click="actionSetWarnModal(false)"
        ></i>
      </span>
    </modal>
    <!-- 수정 모달 -->
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
    <!-- 등록 모달 -->
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
    ...mapGetters(['getIdx', 'getEditModal', 'getEditItem', 'getSaveModal', 'getTodoItem', 'getWarnModal']),
    // editmodal setter
    valueShowEditModal: {
      get() {
        return this.getEditModal;
      },
      set(val) {
        this.actionSetEditModal(val);
      },
    },
    // savemodal setter
    valueShowSaveModal: {
      get() {
        return this.getSaveModal;
      },
      set(val) {
        this.actionSetSaveModal(val);
      },
    },
    // warnmodal setter
    valueShowWarnModal: {
      get() {
        return this.getWarnModal;
      },
      set(val) {
        this.actionSetWarnModal(val);
      },
    },
  },
  data() {
    return {
      newTodoItem: '',
    };
  },
  methods: {
    ...mapActions(['actionSetWarnModal', 'actionRemoveTodo', 'actionSetEditModal', 'actionSetSaveModal', 'actionAddTodo', 'actionEditTodo']),
    /**
     * 수정 버튼을 클릭했을 때 index값 체크해서 모달 띄우기
     */
    checkModal() {
      if (this.getIdx === '') {
        this.actionSetWarnModal(true);
      } else {
        this.actionSetEditModal(true);
      }
    },
    /**
     * 등록 버튼을 눌렀을 때 값 전달
     */
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
    /**
     * 삭제 버튼을 눌렀을 때 값 전달
     */
    removeTodo() {
      const index = this.getIdx;
      const key = this.getTodoItem[this.getIdx];
      if (index === '') {
        this.actionSetWarnModal(true);
      } else {
        this.actionRemoveTodo({ key, index });
      }
    },
    /**
     * 수정아이콘을 눌렀을 때 값 전달
     */
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
label.menu{
  border: 1px solid black;
  float: right;
}
input#menu{
  visibility:hidden;
  width: 0px;
}
div#main-nav{
  visibility:hidden;
  padding: 4px;
}
input#menu:checked + div#main-nav{
  visibility:visible;
}
.menus{
  float:right;
}
ul{
  list-style:none;
    margin:0;
    padding:0;
}
li{
  margin: 20px 0 0 20px;
  padding: 0 0 0 0;
  border : 0;
  float: left;
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
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}
.btn-4 {
  background-color: #4dccc6;
background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-4:hover{
  background-color: #89d8d3;
background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
}
.btn-4 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-4:before,
.btn-4:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.9),
              -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255,255,255,.9),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  transition: all 0.3s ease;
}
.btn-4:before {
  height: 0%;
  width: .1px;
}
.btn-4:after {
  width: 0%;
  height: .1px;
}
.btn-4:hover:before {
  height: 100%;
}
.btn-4:hover:after {
  width: 100%;
}
.btn-4 span:before,
.btn-4 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.9),
              -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255,255,255,.9),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  transition: all 0.3s ease;
}
.btn-4 span:before {
  width: .1px;
  height: 0%;
}
.btn-4 span:after {
  width: 0%;
  height: .1px;
}
.btn-4 span:hover:before {
  height: 100%;
}
.btn-4 span:hover:after {
  width: 100%;
}

/* 1 */
.btn-1 {
  background: rgb(6,14,131);
  background: linear-gradient(0deg, rgba(6,14,131,1) 0%, rgba(12,25,180,1) 100%);
  border: none;
}
.btn-1:hover {
background: rgb(0,3,255);
background: linear-gradient(0deg, rgba(0,3,255,1) 0%, rgba(2,126,251,1) 100%);
}

/* 2 */
.btn-2 {
  background: rgb(96,9,240);
  background: linear-gradient(0deg, rgba(96,9,240,1) 0%, rgba(129,5,240,1) 100%);
  border: none;

}
.btn-2:before {
  height: 0%;
  width: 2px;
}
.btn-2:hover {
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .5),
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}

</style>
