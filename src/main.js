import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import Axios from 'axios';

Axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const SERVER_URL = "https://us-central1-gibsunas-playground.cloudfunctions.net/guild-challenge-server";
const randomNumber = Math.floor(Math.random() * (10 + 1));
const AVATAR_URL = `https://picsum.photos/id/${randomNumber}/200/300`;
const fetchMessages = (axios) => {
  return axios.get(SERVER_URL);
}
const postMessage = (axios) => (payload) => {
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
      // User id is hardcoded (support for multiple identified users is not implemented yet)
      const messageBody = {id:Date.now(), userId: '1', avatarUrl: AVATAR_URL, msg: payload};
      postMessage(Axios)(messageBody)
        .then((data) => {
          context.commit("recieveMessages", data)
        });
    },
    pollMessages (context) {
      fetchMessages(Axios)
        .then((data) => {
          context.commit("recieveMessages", data);
          
          setTimeout(() => context.dispatch("pollMessages"),2000);

          const messages = context.state.messages || [];
          const id = messages.length > 0 ? messages[messages.length - 1].id : null;

          if(id) {
            const obj = document.getElementById(id);
            const container = document.getElementsByClassName("container-inner");

            if (!obj) {return}
            obj.scrollIntoView();
            container.scrollTop = container.scrollHeight;
          }
        })
      
    }
  },
  mutations: {
    sendMessage (state, payload) {
      state.isSending = true;
    },
    messageSent (state, payload) {
      state.isSending = false;
    },
    recieveMessages (state, payload) {
      state.messages = payload.data.messages;    
    },
  }
})

store.dispatch('pollMessages');
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
