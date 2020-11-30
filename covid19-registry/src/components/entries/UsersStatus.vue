<template>
  <div class="section-outline users-status">
    <div class="row text-left">
      <div class="col-12">
        <h3>Users status</h3>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12">
        <table class="table table-sm">
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              @click="rowClicked(user.id)"
            >
              <td v-if="user.image">
                <img
                  :src="`http://${serverAPI}/images/${user.image}`"
                  alt="user image"
                  class="photo-display my-2"
                />
              </td>
              <td v-else></td>
              <td>{{ user.name }}</td>
              <td>{{ user.phoneNo }}</td>
              <td>{{ user.entryDate | formatTime }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import moment from "moment";

export default {
  filters: {
    formatTime(v) {
      return moment(v).format("HH:mm");
    }
  },

  data() {
    return {
      users: [],
      refreshInterval: null,

      serverAPI: process.env.VUE_APP_SERVER_API
    };
  },

  created() {
    this.fetchStatus();
    this.refreshInterval = setInterval(() => {
      this.fetchStatus();
    }, 30000);
  },

  beforeDestroy() {
    clearInterval(this.refreshInterval);
  },

  methods: {
    async fetchStatus() {
      try {
        const res = await axios.get("/entry/fetchLateStatus");
        this.users = res.data.users;
      } catch (err) {
        console.log(err);
      }
    },

    rowClicked(v) {
      this.$emit("userSelected", v);
    }
  }
};
</script>

<style scoped>
.section-outline {
  background: #b7b7b7 !important;
  border: 2px solid #797979;
  padding: 5px 15px 15px 5px;
}

.users-status {
  height: 500px;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1;
}

.photo-display {
  width: 75px;
  height: 75px;
  border: 1px solid black;
}

.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  border-top: 0.5px solid #000000;
  border-bottom: 0.5px solid #000000;
}

.table > tbody > tr > td {
  vertical-align: middle;
  color: #be0003;
}

.table > tbody > tr > td:hover {
  cursor: pointer;
}

.users-status::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: #f5f5f5;
}

.users-status::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.users-status::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
</style>
