<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4 text-left">
        <h1><i class="fas fa-hard-hat mr-2"></i>Users</h1>
      </div>
      <div class="col-md-3">
        <button class="btn btn-success" @click="addEntry">
          Add a user
        </button>
      </div>
    </div>

    <transition name="fade-section" appear mode="out-in">
      <div class="row mt-3 table-section">
        <div class="col-12 col-lg-10 offset-lg-1">
          <table class="table table-striped">
            <thead>
              <th>Name</th>
              <th>Phone number</th>
              <th>Options</th>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key="user.id"
              >
                <td>{{ user.name }}</td>
                <td>{{ user.phoneNo }}</td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      class="btn btn-warning d-inline"
                      @click="modifyEntry(user)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-danger ml-2 d-inline"
                      @click="deleteEntry(user)"
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
            :disabled="users.length < 10"
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
      :user="chosenEdit"
      @close="closeModal"
      @success="alertSuccess('modify')"
      @failed="alertFailed('modify')"
    ></app-modal>

    <app-delete-modal
      v-if="showDelete"
      :contractor="chosenDelete"
      @close="closeDelete"
      @success="alertSuccess('delete')"
      @failed="alertFailed('delete')"
    ></app-delete-modal>
  </div>
</template>

<script>
import axios from "../axios-auth";

import AlertModal from "../components/AlertModal.vue";
import Modal from "../components/users/Modal.vue";
import DeleteModal from "../components/users/DeleteModal.vue";

export default {
  components: {
    appAlertModal: AlertModal,
    appModal: Modal,
    appDeleteModal: DeleteModal
  },

  data() {
    return {
      users: [],
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
    this.fetchUsers();
  },

  methods: {
    async fetchUsers() {
      try {
        const res = await axios.get(`/user/fetch/${this.currentPage}`);
        this.users = res.data.users;
      } catch (err) {
        console.log(err);
      }
    },

    nextPage() {
      this.currentPage++;
      this.fetchUsers();
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchUsers();
      }
    },

    addEntry() {
      this.chosenEdit = {
        id: -1,
        name: "",
        phoneNo: ""
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

      this.fetchUsers();
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
