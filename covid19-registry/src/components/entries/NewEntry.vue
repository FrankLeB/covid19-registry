<template>
  <div class="section-outline">
    <div class="row text-left ml-1 mt-1">
      <div class="col-12">
        <h3>New Entry</h3>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-4 offset-4">
        <div class="form-group">
          <label>Temperature</label>
          <input
            v-model="entry.temperature"
            type="number"
            step="0.5"
            class="form-control"
          />
        </div>
      </div>
    </div>

    <div
      v-for="question in entry.questions"
      :key="`new-${question.id}`"
      class="row mt-3"
    >
      <div class="col-12">
        <label class="d-block" style="white-space: pre-line;">{{
          question.question
        }}</label>
        <div class="form-check-inline">
          <input
            :id="`answerRadioYesNew${question.id}`"
            v-model="question.answer"
            type="radio"
            :name="`answerRadioNew${question.id}`"
            class="form-check-input"
            :value="1"
          />
          <label class="form-check-label" for="answerRadioYes">Yes</label>
        </div>
        <div class="form-check-inline">
          <input
            :id="`answerRadioNoNew${question.id}`"
            v-model="question.answer"
            type="radio"
            :name="`answerRadioNew${question.id}`"
            class="form-check-input"
            :value="0"
          />
          <label class="form-check-label" for="answerRadioNo">No</label>
        </div>
      </div>
    </div>

    <div class="row mt-5 mb-1">
      <div class="col-12">
        <button class="btn btn-primary btn-lg btn-block" @click="save">
          <i class="fas fa-save mr-2"></i>Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
import moment from "moment";

export default {
  props: {
    userId: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      entry: {
        temperature: 0,
        questions: []
      }
    };
  },

  created() {
    this.fetchQuestions();
  },

  methods: {
    async fetchQuestions() {
      try {
        const res = await axios.get("/question/fetch");
        this.entry.questions = res.data.questions;
        this.entry.questions = this.entry.questions.map(q => ({
          ...q,
          answer: 0
        }));
      } catch (err) {
        console.log(err);
      }
    },

    async save() {
      this.entry.userId = this.userId;
      this.entry.entryDate = moment().format("YYYY-MM-DD HH:mm:ss");
      try {
        await axios.post("/entry/", this.entry);
        this.$emit("saveSuccess");
      } catch (err) {
        console.log(err);
        this.$emit("saveFailed");
      }
    }
  }
};
</script>
<style scoped>
.section-outline {
  padding: 5px 15px 15px 5px;
}
</style>
