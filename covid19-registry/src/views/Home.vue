<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4">
        <h1 class="text-left"><i class="fas fa-home mr-2"></i>Home</h1>
      </div>
    </div>

    <div v-if="!selectedUser" class="row mt-3">
      <div class="col-12">
        <app-user-search
          @userSelected="selectedUser = $event"
        ></app-user-search>
      </div>

      <div class="col-12 col-lg-10 offset-lg-1">
        <app-users-status
          @userSelected="selectedUser = $event"
        ></app-users-status>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 col-lg-4 offset-lg-7 mb-3">
        <button
          class="btn btn-secondary btn-lg btn-block"
          @click="selectedUser = null"
        >
          <i class="fas fa-arrow-circle-left mr-2"></i>Back
        </button>
      </div>

      <div class="col-12 col-lg-10 offset-lg-1">
        <!-- User Info -->
        <app-user-info :user-id="selectedUser"></app-user-info>
      </div>
      <div class="col-12 col-lg-10 offset-lg-1 mt-3">
        <!-- Last Entry -->
        <app-last-entry :user-id="selectedUser"></app-last-entry>
      </div>

      <div class="col-12 col-lg-10 offset-lg-1 mt-3">
        <!-- New Entry -->
        <app-new-entry
          :user-id="selectedUser"
          @saveSuccess="newEntry('success')"
          @saveFailed="newEntry('failed')"
        ></app-new-entry>
      </div>
    </div>

    <app-alert-modal
      v-if="alert.show"
      :description="alert.message"
      :is-success="alert.isSuccess"
      @close="closeAlert"
    ></app-alert-modal>
  </div>
</template>

<script>
import UserSearch from "../components/entries/UserSearch.vue";
import UsersStatus from "../components/entries/UsersStatus.vue";

import UserInfo from "../components/entries/UserInfo.vue";
import LastEntry from "../components/entries/LastEntry.vue";
import NewEntry from "../components/entries/NewEntry.vue";

import AlertModal from "../components/AlertModal.vue";

export default {
  components: {
    appUserSearch: UserSearch,
    appUsersStatus: UsersStatus,
    appUserInfo: UserInfo,
    appLastEntry: LastEntry,
    appNewEntry: NewEntry,
    appAlertModal: AlertModal
  },

  data() {
    return {
      selectedUser: null,

      alert: {
        show: false,
        message: "",
        isSuccess: false
      }
    };
  },

  methods: {
    newEntry(result) {
      if (result === "success") {
        this.alert.message = "Successfully saved.";
        this.alert.isSuccess = true;
        this.alert.show = true;
        this.selectedUser = null;
      } else {
        this.alert.message = "Operation failed. Please try again later.";
        this.alert.isSuccess = false;
        this.alert.show = true;
      }
    },

    closeAlert() {
      this.alert.show = false;
      this.alert.message = "";
    }
  }
};
</script>
