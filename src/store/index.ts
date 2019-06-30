import Vue from 'vue';
import Vuex from 'vuex';

import { getDoctors } from '@/api/doctors';
import { getAppointments } from '@/api/appointments';
import { getAnswers } from '@/api/answers';
import { getQuestions, createQuestion, deleteQuestion } from '@/api/questions';
import { getSpecializations } from '@/api/specializations';
import { createOption, getOptions } from '@/api/options';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    specializations: [],
    doctors: [],
    options: [],
    appointments: [],
  },
  mutations: {
    setAnswers(state, data) {
      state.answers = data;
    },
    setQuestions(state, data) {
      state.questions = data;
    },
    deleteQuestion(state, id) {
      state.questions = state.questions.filter((q: any) => q.id !== id);
    },
    addQuestion(state, data) {
      state.questions = [...state.questions, data] as any;
    },
    setSpecializations(state, data) {
      state.specializations = data;
    },
    setDoctors(state, data) {
      state.doctors = data;
    },
    setAppointments(state, data) {
      state.appointments = data;
    },
    setOptions(state, data) {
      state.options = data;
    },
  },
  actions: {
    async getAnswers({ commit }) {
      const answers = await getAnswers();
      commit('setAnswers', answers);
    },
    async getQuestions({ commit }) {
      const questions = await getQuestions();
      commit('setQuestions', questions);
    },
    async getSpecializations({ commit }) {
      const specializations = await getSpecializations();
      commit('setSpecializations', specializations);
    },
    async getData({ dispatch }) {
      dispatch('getAnswers');
      dispatch('getQuestions');
      dispatch('getSpecializations');
      dispatch('getDoctors');
      dispatch('getAppointments');
    },
    async createQuestion({ commit }, { data, options }) {
      const result = await createQuestion(data);
      options.forEach((text: string, i: number) => {
        if (text) {
          createOption({ text, question: result.id, order: i }).then((opt) => {
            if (!result.options) {
              result.options = [];
            }
            result.options = [...result.options, opt];
          });
        }
      });
      commit('addQuestion', result);
    },
    async deleteQuestion({ commit }, id: number) {
      await deleteQuestion(id);
      commit('deleteQuestion', id);
    },
    async getDoctors({ commit }) {
      const doctors = await getDoctors();
      commit('setDoctors', doctors);
    },
    async getAppointments({ commit }) {
      const appointments = await getAppointments();
      commit('setAppointments', appointments);
    },
    async getOptions({ commit }) {
      const options = await getOptions();
      commit('setOptions', options);
    },
  },
});
