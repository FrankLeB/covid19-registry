<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h1 class="text-left">
          <i class="fas fa-file-invoice mr-2"></i>All Entries
        </h1>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-lg-3 offset-lg-1 mt-3">
        <label>From:</label>
        <app-datepicker
          :value="dateStart"
          :bootstrap-styling="true"
          format="yyyy-MM-dd"
          class="vdp-datepicker"
          @selected="dateStartSelected"
        ></app-datepicker>
      </div>
      <div class="col-12 col-lg-3 mt-3">
        <label>To:</label>
        <app-datepicker
          :value="dateEnd"
          :bootstrap-styling="true"
          format="yyyy-MM-dd"
          class="vdp-datepicker"
          @selected="dateEndSelected"
        ></app-datepicker>
      </div>
      <div class="col-6 col-lg-3 align-self-end mt-3">
        <button class="btn btn-primary" @click="fetchEntries">
          <i class="fas fa-search mr-2"></i>Search
        </button>
      </div>
      <div class="col-6 col-lg-1 align-self-end mt-3">
        <button class="btn btn-success" @click="exportExcel">
          <i class="fas fa-file-excel mr-2"></i>Export
        </button>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12 col-lg-10 offset-lg-1">
        <table class="table table-sm">
          <thead>
            <th>User</th>
            <th>Entry date</th>
            <th>Temperature</th>
            <th># of "NO"</th>
            <th># of "YES"</th>
          </thead>
          <tbody>
            <tr v-for="entry in entries" :key="entry.entryID">
              <td>{{ entry.user }}</td>
              <td>{{ formatDate(entry.entryDate) }}</td>
              <td>{{ entry.temperature }}</td>
              <td>{{ entry.amountOfNo }}</td>
              <td>{{ entry.amountOfYes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <app-loading-icon v-if="showLoadingIcon"></app-loading-icon>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import moment from "moment";

import Datepicker from "vuejs-datepicker";
import LoadingIcon from "../../components/LoadingIcon.vue";

export default {
  components: {
    appDatepicker: Datepicker,
    appLoadingIcon: LoadingIcon
  },

  data() {
    return {
      entries: [],
      dateStart: null,
      dateEnd: null,

      showLoadingIcon: false
    };
  },

  created() {
    this.dateStart = moment().subtract(7, "days").format("YYYY-MM-DD 01:00:00");
    this.dateEnd = moment().format("YYYY-MM-DD 23:59:00");
    this.fetchEntries();
  },

  methods: {
    async fetchEntries() {
      try {
        this.showLoadingIcon = true;
        const res = await axios.get(
          `/entry/fetchAllEntries?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}`
        );
        this.entries = res.data.entries;
        this.showLoadingIcon = false;
      } catch (err) {
        console.log(err);
        this.showLoadingIcon = false;
      }
    },

    async exportExcel() {
      const url = `/entry/exportExcelAllEntries?dateStart=${this.dateStart}&dateEnd=${this.dateEnd}`;

      try {
        this.showLoadingIcon = true;
        let { data } = await axios.request({
          url,
          method: "GET",
          responseType: "blob"
        });
        this.showLoadingIcon = false;
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "report.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (err) {
        console.log(err);
        this.showLoadingIcon = false;
      }
    },

    formatDate(d) {
      return moment(d).format("YYYY-MM-DD HH:mm:ss");
    },

    dateStartSelected(d) {
      this.dateStart = moment(d).format("YYYY-MM-DD 01:00:00");
    },

    dateEndSelected(d) {
      this.dateEnd = moment(d).format("YYYY-MM-DD 23:59:00");
    }
  }
};
</script>
