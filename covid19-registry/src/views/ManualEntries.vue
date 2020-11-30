<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-4">
        <h1 class="text-left">
          <i class="fas fa-plus mr-2"></i>Manual Entry
        </h1>
      </div>
    </div>

    <div v-if="!selectedUser" class="row mt-3">
      <div class="col-12">
        <app-user-search
          @userSelected="selectedUser = $event"
        ></app-user-search>
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
        <app-manual-entry
          :user-id="selectedUser"
          @saveSuccess="savedEntry('success')"
          @saveFailed="savedEntry('failed')"
        ></app-manual-entry>
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
import UserInfo from "../components/entries/UserInfo.vue";
import ManualEntry from "../components/entries/ManualEntry.vue";
import AlertModal from "../components/AlertModal.vue";

export default {
  components: {
    appUserSearch: UserSearch,
    appUserInfo: UserInfo,
    appManualEntry: ManualEntry,
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
    closeAlert() {
      this.alert.show = false;
      this.alert.message = "";
    },

    savedEntry(result) {
      if (result === "success") {
        this.alert.message = "Successfully saved.";
        this.alert.isSuccess = true;
        this.selectedUser = null;
      } else {
        this.alert.message = "Operation failed. Please try again later.";
        this.alert.isSuccess = false;
      }
      this.alert.show = true;
    }
  }
};
</script>

<style scoped></style>
