import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import Axios from 'axios';

Axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const SERVER_URL = "https://us-central1-gibsunas-playground.cloudfunctions.net/guild-challenge-server";
const fetchMessages = (axios) => {
  return axios.get(SERVER_URL);
}
const postMessage = (axios) => (payload) => {
  // eslint-disable-next-line
  console.log(`PostMessage: ${payload}`);
  return axios.post(SERVER_URL,payload);
}

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    messages: [],
    isSending: false, // Preparing for visual cues (not implemented yet)
  },
  actions: {
    sendMessage (context, payload) {
      // eslint-disable-next-line
      // console.log(`Send: ${payload}`);

      // User id is hardcoded (support for multiple identified users is not implemented yet)
      postMessage(Axios)({id:Date.now(), userId: '1', avatarUrl: 'https://source.unsplash.com/random', msg: payload})
        .then((data) => {
          context.commit("recieveMessages", data)

            // eslint-disable-next-line
            // console.log('pollMessages', JSON.stringify(data));
          });
    },
    pollMessages (context) {
      console.log(context)
      fetchMessages(Axios)
      .then((data) => {
        context.commit("recieveMessages", data);
        setTimeout(() => context.dispatch("pollMessages"),2000);

        // eslint-disable-next-line
        // console.log('pollMessages', JSON.stringify(data));
      })
      
    }
  },
  mutations: {
    sendMessage (state, payload) {
      // eslint-disable-next-line
      // console.log(`Sending ${payload}`);
      state.isSending = true;
    },
    messageSent (state, payload) {
      state.isSending = false;
    },
    recieveMessages (state, payload) {
      // eslint-disable-next-line
      // console.log(`Poll results ${payload}`);
      state.messages = payload.data.messages;
      
    },
  }
})

store.dispatch('pollMessages');
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
