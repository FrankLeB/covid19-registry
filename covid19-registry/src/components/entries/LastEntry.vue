<template>
  <div class="section-outline">
    <div class="row text-left ml-1 mt-1">
      <div class="col-12">
        <h3>Last Entry</h3>
      </div>
    </div>

    <div v-if="!entry">
      <h3 class="my-5">User doesn't have entries yet</h3>
    </div>
    <div v-else>
      <div class="row mt-3">
        <div class="col-4 offset-4">
          <label>Temperature: {{ entry.temperature }}</label>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-4 offset-4">
          <label>Date: {{ entry.entryDate | formatDate }}</label>
        </div>
      </div>

      <div
        v-for="question in entry.questions"
        :key="question.id"
        class="row mt-3"
      >
        <div class="col-12">
          <label class="d-block" style="white-space: pre-line;">{{
            question.question
          }}</label>
          <div class="form-check-inline">
            <input
              :id="`answerRadioYes${question.id}`"
              v-model="question.answer"
              type="radio"
              :name="`answerRadio${question.id}`"
              class="form-check-input"
              :value="1"
              disabled
            />
            <label class="form-check-label" for="answerRadioYes">Yes</label>
          </div>
          <div class="form-check-inline">
            <input
              :id="`answerRadioNo${question.id}`"
              v-model="question.answer"
              type="radio"
              :name="`answerRadio${question.id}`"
              class="form-check-input"
              :value="0"
              disabled
            />
            <label class="form-check-label" for="answerRadioNo">No</label>
          </div>
        </div>
      </div>

      <div class="row mt-3">
        <div v-if="pastDeadline" class="col-12">
          <h4 class="red-text">Must take back their temperature</h4>
        </div>
        <div v-else class="col-12">
          <h4 class="green-text">
            Must take back their temperature at: {{ nextDeadline(entry.entryDate) }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import moment from "moment";

export default {
  filters: {
    formatDate(v) {
      return moment(v).format("YYYY-MM-DD HH:mm");
    }
  },

  props: {
    userId: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      entry: null,
      now: null
    };
  },

  computed: {
    pastDeadline() {
      return moment(this.now).diff(moment(this.entry.entryDate), "hours") >= 5;
    }
  },

  created() {
    this.now = moment().format("YYYY-MM-DD HH:mm:ss");
    this.fetchLatest();
  },

  methods: {
    async fetchLatest() {
      try {
        const res = await axios.get(
          `/entry/fetchLatestByUserId/${this.userId}`
        );
        this.entry = res.data.entry;
      } catch (err) {
        console.log(err);
      }
    },

    nextDeadline(d) {
      return moment(d).add(5, "hours").format("HH:mm");
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
</style>
