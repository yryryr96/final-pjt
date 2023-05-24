<template>
  <div>
    <div class="user-wrap">
      <div class="user-image1">
      <div class="user-text1">
        <p style="font-size:40px; color:white; font-weight: bold;">평점으로 보증된 영화, 이건 어때요?</p>
      </div>
      </div>
    </div>
    <TopRateMovieList />
    <div class="user-wrap">
      <div class="user-image2">
      <div class="user-text2">
        <p style="font-size:40px; color:white; font-weight: bold;">유행을 따라가고 싶다면?</p>
      </div>
      </div>
    </div>
    <PopularMovieList />
    <div class="user-wrap">
      <div class="user-image3">
      <div class="user-text2">
        <p style="font-size:40px; color:white; font-weight: bold;">당신의 취향에 꼭 맞는 영화입니다.</p>
      </div>
      </div>
    </div>
    <div v-if="recommendedMovies">
      <RecommendedMovieList :movies="recommendedMovies" />
    </div>
  </div>
</template>

<script>
import TopRateMovieList from '@/components/movies/TopRateMovieList'
import PopularMovieList from '@/components/movies/PopularMovieList'
import RecommendedMovieList from '@/components/movies/RecommendedMovieList'

export default {
  name: 'Home',
  components: {
    TopRateMovieList,
    PopularMovieList,
    RecommendedMovieList
  },
  computed: {
    recommendedMovies() {
      return this.$store.getters.getRecommendedMovies
    }
  },
  created(){
    
    if (this.$store.state.user===null){
      this.$router.push({name:"LoginView"})
    }
  }
}
</script>

<style scoped>
.user-wrap {
  width: 100%;
  margin: 0px auto;
  position: relative;
}
/* .user-image1 {
  width: 100%;
  height: 400px;
  vertical-align: middle;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0) 50%,
    rgba(255,255,255,0.4) 60%,
    rgba(255,255,255,0.7) 75%,
    rgba(255,255,255,1) 100%,
  );
} */
.user-text1 {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: bold;
}
.user-text2 {
  position: absolute;
  top: 60%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: bold;
}
.user-image1 {
  width: 100%;
  height: 400px;
  background-image: linear-gradient(
    to bottom,
    rgba(250,250,250,0) 40%,
    rgba(250,250,250,0.1) 50%,
    rgba(250,250,250,0.2) 60%,
    rgba(250,250,250,0.3) 65%,
    rgba(250,250,250,0.4) 70%,
    rgba(250,250,250,0.5) 75%,
    rgba(250,250,250,0.6) 80%,
    rgba(250,250,250,0.7) 85%,
    rgba(250,250,250,0.8) 90%,
    rgba(250,250,250,1) 100%
    ),
    url("../assets/pic02.jpg");
  background-size: cover;
}
.user-image2 {
  width: 100%;
  height: 400px;
  background-image: linear-gradient(
    to bottom,
    rgba(250,250,250,1) 0%,
    rgba(250,250,250,0.7) 10%,
    rgba(250,250,250,0.5) 20%,
    rgba(250,250,250,0.4) 30%,
    rgba(250,250,250,0.3) 40%,
    rgba(250,250,250,0.3) 60%,
    rgba(250,250,250,0.4) 70%,
    rgba(250,250,250,0.5) 80%,
    rgba(250,250,250,0.7) 90%,
    rgba(250,250,250,1) 100%
    ),
    url("../assets/pic03.jpg");
  background-size: cover;
}
.user-image3 {
  width: 100%;
  height: 400px;
  background-image: linear-gradient(
    to bottom,
    rgba(250,250,250,1) 0%,
    rgba(250,250,250,0.7) 10%,
    rgba(250,250,250,0.5) 20%,
    rgba(250,250,250,0.4) 30%,
    rgba(250,250,250,0.3) 40%,
    rgba(250,250,250,0.3) 60%,
    rgba(250,250,250,0.4) 70%,
    rgba(250,250,250,0.5) 80%,
    rgba(250,250,250,0.7) 90%,
    rgba(250,250,250,1) 100%
    ),
    url("../assets/pic06.jpg");
  background-size: cover; 
}
</style>