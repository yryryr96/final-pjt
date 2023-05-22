<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-title class="grey-dark">
            <h1 class="white--text">SignUp</h1>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signup">
              <v-text-field
                v-model="userinfo.login_id"
                label="ID"
                required
              ></v-text-field>
              <v-text-field
                v-model="userinfo.username"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="userinfo.password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model="userinfo.confirmpassword"
                label="Confirm Password"
                type="password"
                required
                @keyup.enter="signup"
              ></v-text-field>
              <v-btn type="submit" color="yellow darken-2" class="mt-4">Sign Up</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignUpView',
  data() {
    return {
      userinfo: {
        login_id: '',
        username: '',
        password: '',
        confirmpassword: '',
      },
    }
  },
  methods: {
    signup() {
      console.log('signup')
      console.log(process.env.VUE_APP_SERVER_URL)
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_SERVER_URL}/accounts/register/`,
        data: this.userinfo
      }).then((res) => {
        console.log(res)
        const token = res.data.token.access
        localStorage.setItem('token', token)
        this.$router.push('ArticleView')
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  created(){
    // if(this.$store.state.token==null){
    //     alert('로그인이 필요합니다.')
    // }
  }
}
</script>

<style scoped>
.grey-dark {
  background-color: #616161;
}
</style>
