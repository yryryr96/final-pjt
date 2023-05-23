<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-card-title class="grey-dark">
            <h1 class="white--text">Login</h1>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field
                v-model="userinfo.login_id"
                label="ID"
                required
              ></v-text-field>
              <v-text-field
                v-model="userinfo.password"
                label="Password"
                type="password"
                required
              ></v-text-field>
              <div style="display:flex; justify-content:space-between">
                <v-btn type="submit" color="yellow darken-2" class="mt-4">Login</v-btn>
                <v-btn type="submit" color="yellow darken-2" class="mt-4" @click="gosignup">sign up</v-btn>
              </div>
              
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
    name : 'LoginView',
    data(){
        return{
            userinfo : {
                login_id : '',
                password : ''
            }
        }
    },
    methods : {
      gosignup(){
        this.$router.push({name:'SignUpView'})
      },
        // setUser(){
        //     axios({
        //         method : 'get',
        //         url : `${process.env.VUE_APP_SERVER_URL}/accounts/getuser`,
        //         headers : {
        //             Authorization : `Bearer ${this.$store.state.token}`
        //         }
        //     }).then((res)=>{
                
        //     })
        // },
        login(){
            axios({
                method : 'post',
                url : `${process.env.VUE_APP_SERVER_URL}/accounts/auth/`,
                data : {
                    login_id : this.userinfo.login_id,
                    password : this.userinfo.password
                }
            }).then((res)=>{
                localStorage.setItem('token',res.data.token.access)
                this.$store.dispatch('setToken')
                this.$store.dispatch('setUser',res.data)
                this.$store.dispatch('getRecommendedMovies')
                this.$router.push({name : 'home'})
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    created(){
      console.log(this.$store.state.recommend_movies)
    }

}
</script>

<style scoped>
.grey-dark {
  background-color: #616161;
}
</style>