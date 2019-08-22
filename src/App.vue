<template>
<div id="app">
    <header>
      <h1>Messenger App</h1>
    </header>
    <main class="container">
      <section class="container-inner">
        <Message
          v-for="message in messages"
          :key="message.id"
          :userId="message.userid"
          :id="message.id"
          :avatarUrl="message.avatarurl"
          :message="message.msg"
        />
      </section>
      <div class="toolbar flex-row">
        <input
          placeholder="Say something!"
          @keypress.enter="onSubmit"
          type="text"
          name="message"
          v-model="message"
        />
        <button class="secondary" @click="onSubmit">Send message</button>
      </div>
    </main>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import Message from './components/Message.vue';

export default {
  name: 'app',
  data() {
    return {
      message: ""
    }
  },
  components: {
    Message
  },
  computed: {
    messages () {
      return this.$store.state.messages
    }
  },
  methods: {
    ...mapActions(['sendMessage','pollMessages']),
    onSubmit(){
      this.sendMessage(this.message)
      this.message = "";
    
    },
    onRefresh(){
      this.pollMessages();    
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Arvo:400,700|Montserrat:300,400,600,700");
@import url("https://fonts.googleapis.com/css?family=Heebo|Mali&display=swap");

// neutrals
$arctic: #f4f4f4;
$onyx: #333745;
$haze: #d3d3d1;
// primaries
$lemon: #ffee11;
$sunny: #fff266;
$tiger: #5c3972;
$lilac: #ebcffc;
$rose: #fca7a7;


body {
  font-family: "Montserrat";
  background-color: $onyx;
  color: $onyx;

  h1 {
    color: $lemon;
  }
  p {
    font-size: 16px;
    font-weight: normal;
    line-height: 1.35;
  }

  .avatar {
    padding-left: .5rem;
    margin: .5rem;
    width: 3rem;
    height: 3rem;
    img {
      
      width: inherit;
      height: inherit;
    }
  }

  .dark {
    background-color: $onyx;
    color: $haze; 
  }

  .montserrat {
    font-family: "Montserrat";
  }

  button {
    height: 3.5rem;
    width: 10rem;
    font-size: 16px;
    margin-right: 2rem;
    padding: 0.5rem 2rem;
    text-align: center;
    border: none;
    font-family: "Montserrat";
    font-family: "Heebo";
  }
}

.flex-row {
  width: 80%;
  margin: 2rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  input, button {
    flex: 1 0;
    flex-grow: 1;

  }

  input {
    background-color: transparent;
    color: $arctic;
  }

}

.row {
  width: 80%;
  margin: 2rem auto;
  text-align: center;
}

.card {
  margin-bottom: 2rem;
  height: auto;
  min-height: 4rem;
  width: 5rems;
  background-color: $haze;
  display: flex;
  align-items: flex-end;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  button {
    width: 50%;
    margin-right: 0;

    &.secondary {
      background-color: $haze;
      border-bottom-left-radius: 20px;
    }

  }
}

.left {
     flex-direction: left;
  }

.right {
  flex-direction: right;
     margin-right: auto;
  }

#app {
  text-align: center;
  background-color: $onyx;
  
  .container {
    .container-inner{
      flex-direction: row-reverse;
      height: 65vh;
      overflow-y: scroll;
      display: flex-row;
    }

    .toolbar {
      input {
        height: 3rem;
        margin-right: 2rem;
      }
    }
  }
}
</style>
