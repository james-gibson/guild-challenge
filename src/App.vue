<template>
  <div id="app">
    <h1>Messenger App</h1>
    <div class="container">
      <div class="container-inner">
        <div class="" v-for="message in messages" :key="message.id">
          <Message 
            :userId="message.userid" 
            :id="message.id" 
            :avatarUrl="message.avatarurl" 
            :message="message.msg" 
            />
        </div>
      </div>
      <div class="toolbar">
        <div class="flex-row">
          <input 
            placeholder="Say something!" 
            @keypress.enter="onSubmit" 
            type="text" 
            name="message" 
            v-model="message" 
            />
          <div>
            <button class="secondary" @click="onSubmit">Add message</button><br />
          </div>
        </div>
      </div>
    </div>
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
// actions
$lapis: #005169;
$sativa: #0d5c22;
$warnge: #f3a32f;
$danger: #770b04;

body {
  font-family: "Montserrat";
  font-family: "Mali";
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

  div.avatar {
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
    font-size: 16px;
    margin-right: 2rem;
    padding: 0.5rem 2rem;
    text-align: center;
    border: none;
    font-family: "Montserrat";
    font-family: "Mali";
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
  
  div.container {
    div.container-inner{
      flex-direction: row-reverse;
      height: 65vh;
      overflow-y: scroll;
      display: flex-row;
    }

    div.toolbar {
      input {
        height: 3rem;
        margin-right: 2rem;
      }
    }
  }
}
</style>
