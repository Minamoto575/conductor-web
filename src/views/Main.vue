<template>
  <div>
    <div class="root" :style="{
      '--backgroundImageUrl': backgroundImageUrl
}">
      <div :style="{
      'margin-left': isCollapse ? '60px' : '200px',
      'background-color': $route.path === '/' ?  'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.8)',
      'height': '100%',
    }">
      </div>
    </div>
    <div>
      <el-menu :default-active="$route.path"
               class="nav"
               :style="{'width': isCollapse ? '60px' : '200px'}"
               :collapse-transition="false"
               :collapse="isCollapse"
               @select="onMenuSelected"
      >
        <div class="nav-modal" :style="{'width': isCollapse ? '60px' : '200px'}"></div>
        <template v-for="(item) in $router.options.routes">
          <template v-if="item.path === '/'">
            <el-menu-item
                v-for="child in item.children"
                :index="child.path"
                :key="child.path"
            >
              <i :class="child.icon" :style="{'color' : $route.path === child.path ? '#409EFF' : '#606266'}"></i>
              <template #title>{{child.name}}</template>
            </el-menu-item>
          </template>

        </template>
      </el-menu>

      <transition name="el-fade-in">
        <el-button class="nav-collapse-button" @click="isCollapse = false" v-if="isCollapse" icon="el-icon-right" circle style="position: fixed; bottom: 10px; left: 10px" ></el-button>
      </transition>
      <transition name="el-fade-in">
        <el-button class="nav-collapse-button" @click="isCollapse = true" v-if="!isCollapse" icon="el-icon-back" circle style="position: fixed; bottom: 10px; left: 80px" ></el-button>
      </transition>

      <div :style="{
      'margin-left': isCollapse ? '60px' : '200px',
      'height': '100%',
    }">
        <router-view style="padding: 15px"></router-view>
      </div>

      <div  v-if="$route.path === '/'">
        <div :style="{
      'margin-left': isCollapse ? '60px' : '200px',
      'position': 'absolute',
      'bottom': '5%',
      'left': '3%',
      'z-index': '12'
    }" >
          <div class="index-modal" :style="{
            '--backgroundImageUrl': backgroundImageUrl
}"></div>
          }
          <div class="index-modal-text">
          </div>


        </div>

        <div :style="{
      'margin-left': isCollapse ? '60px' : '200px',
      'position': 'absolute',
      'bottom': '6%',
      'left': '4%',
      'z-index': '12'
    }">
          <span style="font-size: 40px; color: white">{{ greeting }}</span><br>
          <div style="height: 5px"></div>
          <span style="color: white">要开始，请从左侧选择功能</span>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import api from "@/compose/api";
export default {
  name: "Main",
  data() {
    return {
      greeting: '你好',
      isCollapse: true,
      backgroundImageUrl: '',
      urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
      ]
    };
  },
  setup() {
    const {getBackgroundImages} = api()




    return {
      getBackgroundImages
    }
  },
  async mounted() {
    await this.getBackgroundImages().then(res => {
      console.log(res.data)
      if (res.data.code === 0) {
        this.urls = res.data.data
      }
    })


    let index = Math.floor(Math.random() * 6)
    this.backgroundImageUrl = `url("${this.urls[index]}")`

    let hour = new Date().getHours()
    if (7 <= hour && hour < 12) {
      this.greeting = '早上好'
    } else if (12 <= hour && hour < 14) {
      this.greeting = '中午好'
    } else if (14 <= hour && hour < 18) {
      this.greeting = '下午好'
    } else if (18 <= hour && hour < 19) {
      this.greeting = '傍晚好'
    } else if (19 <= hour && hour < 24) {
      this.greeting = '晚上好'
    } else if (6 <= hour) {
      this.greeting = '凌晨好'
    }
  },
  methods: {
    onMenuSelected: function (index) {
      if(index === this.$route.path) {
        this.$router.push('/')
      }
      else {
        this.$router.push(index)
      }
    }
  },

}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;


}

.nav-collapse-button {
  z-index: 10000;
}

.root {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: var(--backgroundImageUrl);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.nav {
  position: fixed;
  display: block;
  width: 200px;
  height: 100%;

  top: 0;
  left: 0;

  z-index: 9999;

  overflow: hidden;

  border: none;
  background-color: rgba(255, 255, 255, 0.6);
}

.index-modal {
  overflow: hidden;
  position: absolute;

  z-index: 10;

  bottom: 5%;
  left: 4%;
  height: 90px;
  width: 250px;

  background: rgba(255, 255, 255, 0.3);


}

.index-modal::after {
  content: '';
  z-index: 9;
  position: absolute;

  margin: -70px;
  height: 1000px;
  width: 1000px;
  background-image: var(--backgroundImageUrl);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  filter: blur(10px);
}

.index-modal-text {
  position: absolute;

  z-index: 10;

  bottom: 5%;
  left: 4%;
  height: 90px;
  width: 250px;

  background: rgba(255, 255, 255, 0.1);
}

</style>
