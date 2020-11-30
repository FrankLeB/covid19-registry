<template>
  <div class="section-outline">
    <div class="row mt-3">
      <div class="col-12 col-md-4 offset-md-4">
        <div class="form-group">
          <label class="d-block">Date</label>
          <app-datepicker
            :value="entry.entryDate"
            :bootstrap-styling="true"
            format="yyyy-MM-dd"
            class="vdp-datepicker"
            @selected="entryDateSelected"
          ></app-datepicker>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-12">
        <div class="form-group">
          <label class="d-block">Time</label>
          <app-timepicker
            v-model="entry.entryTime"
            format="HH:mm"
            advanced-keyboard
          ></app-timepicker>
        </div>
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
          />
          <label class="form-check-label">Yes</label>
        </div>
        <div class="form-check-inline">
          <input
            :id="`answerRadioNo${question.id}`"
            v-model="question.answer"
            type="radio"
            :name="`answerRadio${question.id}`"
            class="form-check-input"
            :value="0"
          />
          <label class="form-check-label">No</label>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12">
        <button class="btn btn-primary btn-lg btn-block" @click="save">
          <i class="fas fa-save mr-2"></i>Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import Datepicker from "vuejs-datepicker";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import axios from "../../axios-auth";
import moment from "moment";

export default {
  components: {
    appDatepicker: Datepicker,
    appTimepicker: VueTimepicker
  },

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
        questions: [],
        entryDate: null,
        entryTime: null
      }
    };
  },

  created() {
    this.entry.entryDate = moment().format("YYYY-MM-DD HH:mm:ss");
    this.entry.entryTime = moment().format("HH:mm");
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
      this.entry.entryDate =
        moment(this.entry.entryDate).format("YYYY-MM-DD") +
        " " +
        this.entry.entryTime;

      try {
        await axios.post("/entry/", this.entry);
        this.$emit("saveSuccess");
      } catch (err) {
        console.log(err);
        this.$emit("saveFailed");
      }
    },

    entryDateSelected(d) {
      this.entry.entryDate = moment(d).format("YYYY-MM-DD HH:mm:ss");
    }
  },

  validations: {
    entry: {
      temperature: {
        required,
        numeric
      },
      entryDate: {
        required
      },
      entryTime: {
        required
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
