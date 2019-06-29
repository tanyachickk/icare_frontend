import Vue from 'vue';
import Vuex from 'vuex';

import { getAnswers } from '@/api/answers';
import { getQuestions } from '@/api/questions';
import { getSpecializations } from '@/api/specializations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    specializations: [],
  },
  mutations: {
    setAnswers(state, data) {
      state.answers = data;
    },
    setQuestions(state, data) {
      state.questions = data;
    },
    setSpecializations(state, data) {
      state.specializations = data;
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
    },
  },
});
