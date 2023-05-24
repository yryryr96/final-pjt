<template>
  <v-container fluid>
    <v-row class="signup-image" justify="center" style="height:100%; width:auto;" align="center">
      <v-col cols="12" sm="8" md="6">
      <!-- <v-card class="elevation-12">
        <v-card-title class="grey-dark"> -->
        <h1 class="white--text" style="font-size:50px; color:black !important;">SignUp</h1>
        <!-- </v-card-title> -->
        <!-- <v-card-text> -->
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
            ></v-text-field>
            <p v-if="!state" style="color:red">입력 정보를 다시 확인해주세요.</p>
            <h3 style="margin-bottom:10px; color:">영화 추천을 위해 선호하는 장르를 선택해주세요.</h3>
            <v-row>
              <v-col
                v-for="genre in genres"
                :key="genre.id"
                cols="3"
                class="checkbox-column"
              >
                <v-checkbox
                  style="font-weight:bold"
                  :label="genre.name"
                  :value="genre.id"
                  @change="addLikeGenres(genre)"
                  required
                  dense
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-btn type="submit" color="yellow darken-2" class="mt-4" style="width:100%;" :disabled="!hasSelectedGenres">Sign Up</v-btn>
          </v-form>
        <!-- </v-card-text>
      </v-card> -->
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
      state : true,
      userinfo: {
        login_id: '',
        username: '',
        password: '',
        confirmpassword: '',
        like_genres: [],
      },
      genres: [],
    }
  },
  computed:{
    hasSelectedGenres() {
      return this.userinfo.like_genres.length > 0;
    },
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
        // console.log(res)
        // console.log('signup then')
        // console.log(this.userinfo)
        // // const token = res.data.token.access
        // // localStorage.setItem('token', token)
        // this.$router.push({name:'LoginView'})

        axios({
              method : 'post',
              url : `${process.env.VUE_APP_SERVER_URL}/accounts/auth/`,
              data : {
                  login_id : this.userinfo.login_id,
                  password : this.userinfo.password
              }
          }).then((res2)=>{
            localStorage.setItem('token',res2.data.token.access)
            this.$store.dispatch('setToken')
            this.$store.dispatch('setUser',res2.data)
            this.$store.dispatch('getRecommendedMovies')
            this.$router.push({name : 'home'})
          }).catch((err2)=>{
            console.log(err2)
          })
      }).catch((err) => {
        console.log('signup error')
        console.log(this.userinfo)
        console.log(err)
        this.state = false
      })
    },
    getGenres() {
      axios({
        method: 'get',
        url: `${process.env.VUE_APP_SERVER_URL}/movies/signupgenres/`,
      })
      .then((res)=>{
        console.log(res)
        this.genres = res.data
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    addLikeGenres(genre) {
      if (this.userinfo.like_genres.includes(genre.id)) {
        const index = this.userinfo.like_genres.indexOf(genre.id);
        if (index !== -1) {
          this.userinfo.like_genres.splice(index, 1)
        }
      } else {
        this.userinfo.like_genres.push(genre.id)
        console.log(this.userinfo.like_genres)
      }
      
    }
    
  },
  created(){
    this.state = true
    this.getGenres()
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

.signup-image {
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
    ),url("../assets/pic3.jpg");
  background-size: cover;
}
</style>