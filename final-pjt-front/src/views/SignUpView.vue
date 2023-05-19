<template>
  <div>
    <h1>SignUp</h1>
    <form submit.prevent="signup">
        <p>ID : <input type="text" v-model="userinfo.login_id"></p>
        <p>username : <input type="text" v-model="userinfo.username"></p>
        <p>password : <input type="password" v-model="userinfo.password"></p>
        <p>confirmpassword : <input type="password" v-model="userinfo.confirmpassword" @keyup.enter="signup"></p>
        
    </form>
    
  </div>

</template>

<script>
import axios from 'axios'
const SERVER_URL = 'http://127.0.0.1:8000'
export default {
    name : 'SignUpView',
    data(){
        return {
            userinfo : {
                login_id : '',
                username : '',
                password : '',
                confirmpassword : '',
            }
        }
    },
    methods : {
        signup(){
            axios({
                method : 'post',
                url : `${SERVER_URL}/accounts/register/`,
                data : this.userinfo
            }).then((res)=>{
                console.log(res)
                const token = res.data.token.access
                localStorage.setItem('token',token)
                this.$router.push('ArticleView')
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>