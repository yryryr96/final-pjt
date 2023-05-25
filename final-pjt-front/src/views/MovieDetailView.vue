<template>
  <div v-if="movie">
    <div class="user-wrap">
      <div class="user-image1">
      <div class="user-text1">
        <p style="font-size:40px; font-weight: 700; color:white;">영화 상세 정보</p>
      </div>
      </div>
    </div>

    <div style="margin : 30px;">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4" class="posterColumn">
        <v-img :src="getImageUrl(movie.poster_path)" class="moviePoster"></v-img>
      </v-col>
      <v-col cols="12" sm="6" md="8" lg="8" class="infoColumn">
        <p class="movietitle" style="font-weight: 900;">{{ movie?.title }}
          <v-btn
            v-if="!this.$store.state.user.like_movies.includes(movie?.id)"
            color="rgba(255, 0, 98, 0.7)"
            icon
            @click="likeMovie"
          >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          <v-btn
            v-else
            color="rgba(255, 0, 98, 0.7)"
            icon
            @click="likeMovie"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <span style="font-size: 20px; color: rgba(255, 0, 98, 0.7)">{{ movie?.like_users.length }}</span>
          <v-btn
            icon
            @click="searchTrailer"
            style="margin-left: 10px;"
          >
            <v-icon>mdi-play-circle-outline</v-icon>
          </v-btn>
          <span style="font-size: 20px; color: gray; cursor:pointer;" @click="searchTrailer">예고편</span>
        </p>
          
        <div class="leftborder">
        <h3>출연</h3>
        <p class="small">
          <template v-for="(actor, index) in movie?.actors">
            <span :key="actor">{{ actor }}</span>
            <span v-if="index !== movie?.actors.length - 1">, </span>
          </template>
        </p></div>
        <br>
        <div class="leftborder">
        <h3>감독</h3>
        <p class="small">{{ movie?.directors }}</p>
        </div>
        <br>
        <div class="leftborder">
        <h3>평점</h3>
        <p class="small">{{ movie?.vote_average }}</p></div>
        <br>
        <div class="leftborder">
        <h3>줄거리</h3>
        <p>{{ movie?.overview }}</p></div>
        <br><br>
        <MovieReview :movie_id="parseInt($route.params.movie_id)" />
      </v-col>
    </v-row>
  </div>

  <!-- 유튜브 예고편 -->
  <!-- <div id="player">

  </div> -->

  

  <v-dialog v-model="showModal" max-width="800px" overlay-opacity="0.8">
    <v-card style="text-align:center;">
      <v-card-title style="font-weight: bold; font-size: 30px;"></v-card-title>
      <v-card-text>
        <iframe v-if="trailerUrl" :src="trailerUrl" width="100%" height="400px" frameborder="0" allowfullscreen></iframe>
      </v-card-text>
      <v-card-actions style="margin: 0px 10px;">
        <v-spacer></v-spacer>
        <v-btn @click="closeTrailerModal">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  </div>
</template>

<script src="https://www.youtube.com/iframe_api"></script>
<script>
import axios from 'axios'
import MovieReview from '@/components/movies/MovieReview'
export default {
    name : 'MovieDetailView',
    data() {
        return{
            // title : null,
            movie : null,
            player: {},
            showModal: false, // 모달 표시 여부를 관리하는 데이터
            trailerUrl: '', // 예고편 URL을 저장하는 데이터
            playerReady: false,
        }
    },
    components : {
        MovieReview
    },
    computed : {
       
    },
    methods: {
        getImageUrl(posterPath){
            const size = 'w500'
            return `https://image.tmdb.org/t/p/${size}/${posterPath}`
        },
        getMovie(){
            axios({
                method : 'get',
                // url : `https://api.themoviedb.org/3/movie/${this.$route.params.movie_id}?language=ko-KR&api_key=${process.env.VUE_APP_API_KEY}`,
                url : `${process.env.VUE_APP_SERVER_URL}/movies/${this.$route.params.movie_id}/`,
                headers : {
                    Authorization : `Bearer ${this.$store.state.token}`
                }
            }).then((res)=>{
                // console.log(this.$store.state.user)
                console.log(res.data.actors)
                const actorsString = res.data.actors
                const cleanedString = actorsString.replace(/\[|\]|'/g, "");
                const actorsArray = cleanedString.split(", ");

                console.log(actorsArray[0]);
                this.movie = res.data
                this.movie.actors = actorsArray
                // this.movie.actors = JSON.parse(res.data.actors)
            })
        },
        likeMovie(){
          axios({
            method :'post',
            url : `${process.env.VUE_APP_SERVER_URL}/movies/${this.movie.id}/like/`,
            headers : {
              Authorization : `Bearer ${this.$store.state.token}`
            }
          }).then((res)=>{
              const likeMovies = this.$store.state.user.like_movies;
              const movieIndex = likeMovies.indexOf(this.movie.id);
              console.log(this.$store.state.user);
              console.log(res)
              if (movieIndex !== -1) {
                // 이미 좋아하는 영화인 경우, 제거
                likeMovies.splice(movieIndex, 1);
              } else {
                // 좋아하는 영화가 아닌 경우, 추가
                likeMovies.push(this.movie.id);
              }
              this.getMovie()
            }).catch((err)=>{
              console.log(err)
            })
        },
        searchTrailer(){
          axios({
            method: 'get',
            url: `${process.env.VUE_APP_SERVER_URL}/movies/search_trailers?searchTerm='${this.movie?.title}'/`,
            origin: 'http://localhost:8080/'
          }).then((res)=>{
            console.log(res)
            const video = res.data
            const videoId = video.video_id
            const trailerUrl = `https://www.youtube.com/embed/${videoId}`; // 예고편 URL 생성

            this.trailerUrl = trailerUrl; // 모달에 예고편 URL 설정
            this.showModal = true; // 모달 표시
            this.$nextTick(() => {
            this.player = new YT.Player('player', {
              height: '360',
              width: '640',
              videoId: videoId,
              // events: {
              // onReady: () => {
              //   // 재생 시작
              //   this.player.playVideo();
              // },
              // },
            });
            });
          }).catch((err)=>{
            console.log(err)
          })
        },
        // 예고편 모달 열기
        openTrailerModal(trailerUrl) {
          this.trailerUrl = trailerUrl; // 예고편 URL 설정
          this.showModal = true; // 모달 표시
        },
        // 예고편 모달 닫기
        closeTrailerModal() {
          this.showModal = false; // 모달 닫기
          this.trailerUrl = ''; // 예고편 URL 초기화
        },
    },
    created(){
      this.getMovie()
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // YouTube API 스크립트 로드 완료 후 호출
      // window.onYouTubeIframeAPIReady = () => {
      //   this.searchTrailer();
      // }
    }
}
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.small {
  font-size: 1.1rem;
}

.moviePoster {
  margin-right: 20px;
}
.movietitle {
  font-size:30px;
  font-weight : bold;
}

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
}
.user-image1 {
  width: 100%;
  height: 400px;
  background-image: linear-gradient(
    to bottom,
    rgba(250,250,250,0) 35%,
    rgba(250,250,250,0.1) 45%,
    rgba(250,250,250,0.2) 55%,
    rgba(250,250,250,0.3) 65%,
    rgba(250,250,250,0.4) 70%,
    rgba(250,250,250,0.5) 75%,
    rgba(250,250,250,0.6) 80%,
    rgba(250,250,250,0.7) 85%,
    rgba(250,250,250,0.8) 90%,
    rgba(250,250,250,1) 100%
    ),
    url("../assets/pngwing.com.png");
  background-size: cover;
}
.leftborder {
  border-left: 5px solid rgba(40,40,40,0.5);
  padding-left: 10px;
}
</style>