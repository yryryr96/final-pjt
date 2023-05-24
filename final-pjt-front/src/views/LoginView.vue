<template>
  <v-container fluid>
    <v-row class="login-image" style="height:90vh; width:100vw" justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <br>
        <v-form @submit.prevent="login">
          <input
            v-model="userinfo.login_id"
            type="text"
            placeholder="ID"
            required
            class="input-field"
          >
          <div>
            <input
              v-model="userinfo.password"
              type="password"
              placeholder="Password"
              required
              class="input-field"
            >
            <p v-if="!state" style="color:yellow;">입력 정보를 확인해주세요.</p>
            <v-btn type="submit" style="width:100%; font-weight:bold; margin-bottom:10px;" color="yellow darken-3" class="mt-4">Login</v-btn>           
            <div style="display:flex; justify-content:end; color:white;">Not a Member?&nbsp;<router-link :to="{name:'SignUpView'}" style="color:yellow">Sign up</router-link></div>
            
          </div>
        </v-form>
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
            },
            state : true
        }
    },
    methods : {
      gosignup(){
        this.$router.push({name:'SignUpView'})
      },
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
              this.state = false;
          })
      }
    },
    created(){
      this.state = true
      console.log(this.$store.state.recommend_movies)
    }

}
</script>

<style scoped>
.grey-dark {
  background-color: #616161;
}

.login-image {
  width: 100%;
  height: 400px;
 background-image: linear-gradient(
    to bottom,
    /* rgba(250,250,250,1) 0%, */
    /* rgba(250,250,250,0.7) 10%, */
    /* rgba(250,250,250,0.5) 20%, */
    /* rgba(250,250,250,0.4) 30%, */
    rgba(250,250,250,0.3) 40%,
    rgba(250,250,250,0.3) 60%,
    rgba(250,250,250,0.4) 70%,
    rgba(250,250,250,0.5) 80%,
    rgba(250,250,250,0.7) 90%,
    rgba(250,250,250,1) 100%
    ),url("../assets/pic2.jpg");
  background-size: cover;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 3px solid white;
  margin-bottom: 20px;
  outline: none; /* 검은 선 제거 */
  color : white;
}

.input-field::placeholder {
  color: white;
}
</style>