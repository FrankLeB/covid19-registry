<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4 text-left">
        <h1><i class="fas fa-question mr-2"></i>Questions</h1>
      </div>
      <div class="col-md-3">
        <button class="btn btn-success" @click="addEntry">
          Add a question
        </button>
      </div>
    </div>

    <transition name="fade-section" appear mode="out-in">
      <div class="row mt-3 table-section">
        <div class="col-12 col-lg-10 offset-lg-1">
          <table class="table table-striped">
            <thead>
              <th>Question</th>
              <th>Options</th>
            </thead>
            <tbody>
              <tr v-for="question in questions" :key="question.id">
                <td>{{ question.question }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      class="btn btn-warning d-inline"
                      @click="modifyEntry(question)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-danger ml-2 d-inline"
                      @click="deleteEntry(question)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>

    <transition name="fade-section" appear mode="out-in">
      <div class="row">
        <div class="col-12">
          <button
            class="btn btn-outline-secondary mr-5"
            :disabled="currentPage === 1"
            @click="prevPage"
          >
            <i class="fas fa-arrow-left"></i>
          </button>
          {{ currentPage }}
          <button
            class="btn btn-outline-secondary ml-5"
            :disabled="questions.length < 10"
            @click="nextPage"
          >
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </transition>

    <app-alert-modal
      v-if="alert.show"
      :description="alert.message"
      :is-success="alert.isSuccess"
      @close="closeAlert"
    ></app-alert-modal>

    <app-modal
      v-if="showModal"
      :question="chosenEdit"
      @close="closeModal"
      @success="alertSuccess('modify')"
      @failed="alertFailed('modify')"
    ></app-modal>

    <app-delete-modal
      v-if="showDelete"
      :question="chosenDelete"
      @close="closeDelete"
      @success="alertSuccess('delete')"
      @failed="alertFailed('delete')"
    ></app-delete-modal>
  </div>
</template>

<script>
import axios from "../axios-auth";

import AlertModal from "../components/AlertModal.vue";
import Modal from "../components/questions/Modal.vue";
import DeleteModal from "../components/questions/DeleteModal.vue";

export default {
  components: {
    appAlertModal: AlertModal,
    appModal: Modal,
    appDeleteModal: DeleteModal
  },

  data() {
    return {
      questions: [],
      currentPage: 1,

      showModal: false,
      chosenEdit: null,

      showDelete: false,
      chosenDelete: null,

      alert: {
        show: false,
        message: "",
        isSuccess: ""
      }
    };
  },

  created() {
    this.fetchQuestions();
  },

  methods: {
    async fetchQuestions() {
      try {
        const res = await axios.get(`/question/fetch/${this.currentPage}`);
        this.questions = res.data.questions;
      } catch (err) {
        console.log(err);
      }
    },

    nextPage() {
      this.currentPage++;
      this.fetchQuestions();
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchQuestions();
      }
    },

    addEntry() {
      this.chosenEdit = {
        id: -1,
        question: ""
      };
      this.showModal = true;
    },

    modifyEntry(v) {
      this.chosenEdit = v;
      this.showModal = true;
    },

    deleteEntry(v) {
      this.chosenDelete = v;
      this.showDelete = true;
    },

    closeModal() {
      this.showModal = false;
      this.chosenEdit = null;
    },

    closeDelete() {
      this.showDelete = false;
      this.chosenDelete = null;
    },

    alertSuccess(operation) {
      if (operation === "modify") {
        this.closeModal();
      } else {
        this.closeDelete();
      }

      this.alert.message = "Successfully saved.";
      this.alert.isSuccess = true;
      this.alert.show = true;

      this.fetchQuestions();
    },

    alertFailed(operation) {
      if (operation === "modify") {
        this.closeModal();
      } else {
        this.closeDelete();
      }

      this.alert.message = "Operation failed. Please try again later.";
      this.alert.isSuccess = false;
      this.alert.show = true;
    },

    closeAlert() {
      this.alert.show = false;
      this.alert.message = "";
    }
  }
};
</script>

<style scoped>
.table-section {
  height: 800px;
}
</style>
