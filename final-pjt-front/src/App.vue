<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="openSearchDialog">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- 프로필 및 로그아웃 메뉴 항목들 -->
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item @click="goTo('home')">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('LoginView')">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
         <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('SignUpView')">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Sign up</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goToProfile">
          <v-list-item-icon>
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-icon>
          <v-list-item-title>MyProfile</v-list-item-title>
        </v-list-item>
         <v-list-item @click="goTo('MovieView')">
          <v-list-item-icon>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Movie</v-list-item-title>
        </v-list-item>
        <v-list-item @click="goTo('ArticleView')">
          <v-list-item-icon>
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Article</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-dialog v-model="showSearchDialog" max-width="500">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="searchText"
            placeholder="Search"
            hide-details
            solo
            dense
          ></v-text-field>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary">Search</v-btn>
          <v-btn text color="primary" @click="closeSearchDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      searchText: '',
      showSearchDialog: false,
      username: null,
    }
  },
  methods: {
    logout(){
      axios({
        method : 'delete',
        url : `${process.env.VUE_APP_SERVER_URL}/accounts/auth/`
      }).then((res)=>{
        localStorage.removeItem('token')
        this.$router.push({name:'LoginView'})
      }).catch((err)=>{
        console.log(err)
      })
    },
    clearSearch() {
      this.searchText = '';
    },
    goTo(routeName) {
      if (this.$route.name !== routeName) {
        this.$router.push({ name: routeName });
      }
    },
    goToProfile() {
      for (const user of this.$store.state.users) {
        if (this.$store.state.user.id == user.id) {
          this.username = user.username
        }
      }
      this.$router.push({name: 'ProfileView', params: {username: this.username}})
    },
    getUser() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/userinfo/`
      })
      .then((res) => {
        console.log(res)
        this.$store.dispatch('getUsers', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    
    openSearchDialog() {
      this.showSearchDialog = true;
    },
    closeSearchDialog() {
      this.showSearchDialog = false;
      this.clearSearch();
    },
  },
  created() {
    this.$store.dispatch('setToken')
    this.$store.dispatch('getMovies')
    this.$store.dispatch('getArticles')
    // 필요한 경우 getUser() 메소드 호출
    this.getUser()
  }
}
</script>

<style>
/* 스타일 */
</style>
