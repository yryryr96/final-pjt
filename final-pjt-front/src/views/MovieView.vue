<template>
    <div>
        <div class="user-wrap">
            <div class="user-image14">
            <div class="user-text1">
                <p style="font-size:40px; color:white; font-weight: bold;">전체 영화</p>
            </div>
            </div>
        </div>
        <MovieList/>
    </div>
</template>

<script>
import MovieList from '@/components/movies/MovieList'
export default {
    name : 'MovieView',
    components : {
        MovieList
    }
}
</script>

<style scope>
.user-wrap {
  width: 100%;
  margin: 0px auto;
  position: relative;
}
.user-text1 {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: bold;
}
.user-image14 {
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
    url("../assets/pic14.jpg");
  background-size: cover;
}
</style>