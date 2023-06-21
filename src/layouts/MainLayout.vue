<template>
    <div class="app">
        <div class="el"></div>
        <q-layout>
            <q-page-container class="container">
                <q-btn v-bind:style="userTheme == 'dark-theme'? {'background-color': '#1A1A27'} : {'background-color': '#F6F6F6'}" class="fixed-top-right round_button q-pa-xs q-pr-lg q-mt-lg" @click="toggleTheme">
                  <q-avatar size="3.5rem">
                    <img v-if="userTheme == 'dark-theme'" src="../assets/moon.svg"/>
                    <img v-else src="../assets/sun.svg"/>
                  </q-avatar>
                </q-btn>
                <router-view/>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script>

export default {
  name: 'LayoutDefault',
  data() {
    return {
      userTheme: "light-theme",
    };
  },
  setup(){
    
  },
  mounted() {
    const initUserTheme = this.getTheme() || this.getMediaPreference();
    this.setTheme(initUserTheme);
  },
  methods: {
    toggleTheme() {
      const activeTheme = localStorage.getItem("user-theme");
      if (activeTheme === "light-theme") {
        this.setTheme("dark-theme");
        this.$q.dark.set(true);
      } else {
        this.setTheme("light-theme");
        this.$q.dark.set(false);
      }
    },

    getTheme() {
      return localStorage.getItem("user-theme");
    },

    setTheme(theme) {
      localStorage.setItem("user-theme", theme);
      this.userTheme = theme;
      document.documentElement.className = theme;
      if (theme === "light-theme")
        this.$q.dark.set(false);
      else 
        this.$q.dark.set(true);
      
    },

    getMediaPreference() {
      const hasDarkPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (hasDarkPreference) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
  },
  
}

</script>

<style>
body{
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  background: var(--bgColor) !important;
}

.el{
  position: absolute;
  width: 200%;
  height: 100%;
  left: -50%;
  top: 30%;

  background: var(--ellipseColor);
  border-radius: 50%;
}

.container{
  width: 100vw;
  height: 100vh;
  padding: 60px 100px 60px 100px;
}

.round_button{
  border-radius: 50px 0px 0px 50px;
}

</style>