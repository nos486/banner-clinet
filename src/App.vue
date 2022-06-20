<template>
  <v-app>
    <div class="d-flex titleBar" :class="socket.isConnected ? '' : 'red'" style="height: 100%">
      <Settings @updated="settingsUpdate"></Settings>
      <Banner :text="socket.data.text"></Banner>
      <div v-if="! socket.isConnected" class="pa-5" style="position: relative">Disconnected</div>
      {{socket.data}}
    </div>
  </v-app>

</template>

<script>

import Settings from "@/components/Settings";
import storage from 'electron-json-storage'
import Banner from "@/components/Banner";

export default {
  name: 'App',
  data : ()=>{
    return {
      electronStore : null,
      settingsData : {},
    }
  },
  components: {
    Banner,
    Settings,
  },
  beforeMount() {

  },
  mounted() {
    this.socket.connect("192.168.31.81")
    storage.getAll(function (error, data){
      console.log(data)
    })

    // electronStore.set('unicorn', '🦄');
    // console.log(store.get('unicorn'));
  },
  beforeDestroy() {
    // this.socket.disConnect()
  },
  methods :{
    settingsUpdate(){
      // storage.get("settings", (error, data)=>{
      //   this.settingsData = data
      //   if(data.mode === 'server'){
      //
      //   }else {
      //     this.socket.destroy()
      //     console.log(this.$socket.readyState)
      //   }
      // })
    },
  }
}
</script>

<style>
.titleBar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.noTitleBar {
  -webkit-app-region: no-drag;
}
</style>
