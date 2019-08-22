<template>
  <div :id="id" class="card flex-row">
    <div class="avatar">
      <img alt="User Avatar" :src="avatarUrl"/>
    </div>
    <div>
      <p class="montserrat">{{message}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    props: {
      id: String,
      userId: String,
      message: String,
      avatarUrl: String,
    }
  }
</script>
