<template>
  <el-container>
    <el-main class="background-image" :style="{'--backgroundImageUrl': backgroundImageUrl}">

    </el-main>
    <el-aside width="300px">
      <div style="overflow: hidden">
        <div class="aside-background" :style="{'--backgroundImageUrl': backgroundImageUrl}">
          <div class="aside-modal">
            <div style="margin: 25px">
              <div style="height: 230px"></div>
              <div>
                <span class="title">{{ref ? '登录以继续' : '登录'}}</span>
                <div style="height: 20px"></div>

                <el-input placeholder="用户名" v-model="username"></el-input>
                <div style="height: 10px"></div>
                <el-input placeholder="密码" v-model="password" show-password></el-input>

                <transition name="el-fade-in">
                  <div v-if="username !== '' && password !== ''">
                    <div style="height: 20px"></div>
                    <el-button icon="el-icon-right" type="info" style="margin-left: 50%;transform: translateX(-50%)" plain circle @click="onLoginButtonClick"></el-button>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-aside>
  </el-container>
</template>

<script>
import api from "@/compose/api";


export default {
  name: "Login",
  setup() {
    const {login, getBackgroundImages} = api()

    return {
      login,
      getBackgroundImages
    }
  },
  data() {
    return {
      username: '',
      password: '',
      backgroundImageUrl: '',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ],
      ref: null
    }
  },
  async mounted() {
    if(localStorage.getItem('Authorization') !== null) {
      this.$router.push('/')
      return
    }

    await this.getBackgroundImages().then(res => {
      if (res.data.code === 0) {
        this.urls = res.data.data
      }
    })


    let index = Math.floor(Math.random() * 6)
    this.backgroundImageUrl = `url("${this.urls[index]}")`

    if(this.$route.query.ref){
      this.ref = this.$route.query.ref
      if(this.ref === '/login') {
        this.ref = null
      }
    }
  },
  methods: {
    onLoginButtonClick: function () {
      this.login(this.username, this.password)
      .then(res => {
        if(res.data.code === 0) {
          this.$store.dispatch('setToken', {Authorization: res.data.data.token})

          this.$router.push(this.ref ? this.ref : '/')
        }
        else {
          this.$store.dispatch('setToken', {Authorization: null})
          this.$notify.error({
            title: '登录失败',
            message: res.data.msg
          })
        }
      })
      .catch(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

@keyframes on-show-fade-in
{
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.title {
  font-weight: normal;
  font-size: 25px;

}

.aside-modal {
  z-index: 5;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
}

.aside-background {
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 350px;
  overflow:hidden;

  opacity: 0;


  animation: on-show-fade-in 1s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
}


.aside-background::after {
  content: '';
  z-index: 1;
  position: absolute;

  top: -10%;
  bottom: -10%;


  height: 120%;
  width: 350px;

  /*background-image: url("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");*/
  background-image: var(--backgroundImageUrl);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  -o-filter: blur(10px);
  filter: blur(10px);

  transition-delay: 10s;
  transition:all 1.0s ease-in-out;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background-image: var(--backgroundImageUrl);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
