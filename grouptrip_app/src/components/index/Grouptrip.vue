<template>
  <div>
    <main id="grouptrip-page">
      <div class="tabbar-top">
        <div class="tabbar-title">
          <router-link to="/home" class="grouptrip-back">
            <svg class="zuojiantou_small" aria-hidden="true">
              <use xlink:href="#iconzhixiangzuozuojiantou" />
            </svg>
          </router-link>
          <div class="tabbar-top-bg">
            <img src="../../assets/iconfont/logo-black.png" alt style="width" />
          </div>
          <div @click="jumpchos">
            <router-link to="/choseTheme" class="start-group">发起</router-link>
          </div>
        </div>
        <van-dropdown-menu>
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" class="dropdown-theme" />
          <div role="button" class="van-dropdown-menu__item" @click="showPop">
            <span class="van-dropdown-menu__title">
              <div class="van-ellipsis">{{cityname||'地点'}}</div>
            </span>
          </div>
        </van-dropdown-menu>
        <div class="pop-panel" :style="{top:top+'px',transition:'top .3s linear'}" v-show="pop">
          <div class="pop-top">
            <div class="tabbar-search">
              <svg class="search" aria-hidden="true">
                <use xlink:href="#iconsearch-copy" />
              </svg>
              <input type="text" class="form-text" placeholder="搜索地点" />
            </div>
            <van-button type="default" @click="closePop">取消</van-button>
          </div>
          <div class="pop-panel-title">
            <span>热门地点</span>
          </div>
          <div class="pop-panel-wrap">
            <div @click="bk(city.cid,city.cname)" class="pop-item" v-for="(city,c) of cities" :key="c">
              <div class="pop-item-img">
                <img ref="img" :data-img="city.img" src="" alt />
              </div>
              <h5>{{city.cname}}</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="grouptrip-wrap">
        <div class="grouptrip-wrap-item" v-for="(t,i) of tripsgo" :key="i">
          <mt-swipe :auto="0">
            <mt-swipe-item>
              <img :style="{width:'100%'}" :src="t.bg" alt />
            </mt-swipe-item>
            <mt-swipe-item>
              <img :src="t.img1" alt />
            </mt-swipe-item>
            <mt-swipe-item>
              <img :src="t.img2" alt />
            </mt-swipe-item>
          </mt-swipe>
          <div class="theme-item">
            <div class="theme-icon">
              <img :src="t.timg" alt />
            </div>
            <span>{{t.tname}}</span>
            <p class="theme_details">{{t.content}}</p>
          </div>
          <div class="item-personal-msg">
            <div class="personal-msg-header">
              <div class="msg-header-head">
                <img :src="t.avatar" style=" max-width: 100%;height: auto;" alt />
              </div>
              <div class="msg-header-text">
                <h4 class="msg-header-name">{{t.uname}}</h4>
                <div class="msg-header-person-text">
                  <div
                    class="msg-sex-age"
                    :class="{
                    'msg-male': t.gender===1,
                    'msg-female': t.gender===0,
                    'msg-screct': t.gender===-1,
                    }"
                  >
                    <span v-if="t.gender==-1"></span>
                    <span class="msg-sex" v-else-if="t.gender==1">
                      <svg class="icon_male" aria-hidden="true">
                        <use xlink:href="#iconicon28" />
                      </svg>
                    </span>
                    <span class="msg-sex" v-else>
                      <svg class="icon_female" aria-hidden="true">
                        <use xlink:href="#iconnv" />
                      </svg>
                    </span>
                    <span
                      class="msg-age"
                      :class="{
                    'msg-age-male': t.gender===1,
                    'msg-age-female': t.gender===0,
                    'msg-age-screct': t.gender===-1,
                    }"
                    >{{t.age}}岁</span>
                  </div>
                  <div class="msg-favoriate">
                    <span>喜欢</span>
                    <like></like>
                  </div>
                </div>
              </div>
              <router-link to="/PersonalIndex" class="msg-more">
                <svg class="iconforward" aria-hidden="true">
                  <use xlink:href="#iconforward-purple" />
                </svg>
              </router-link>
            </div>
            <div class="personal-msg-date">
              <svg class="iconshijian" aria-hidden="true">
                <use xlink:href="#iconshijian" />
              </svg>
              <span class="msg-date">日期</span>
              <p>{{t.date}}</p>
            </div>
            <div class="personal-msg-place">
              <svg class="icondidian" aria-hidden="true">
                <use xlink:href="#icondidian" />
              </svg>
              <span class="msg-place">地点</span>
              <p>{{t.area}}</p>
            </div>
            <div class="interest">
              <p>{{t.likes}}</p>
              <span>人感兴趣</span>
              <router-link to>和他聊聊</router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import like from "../common/like.vue";
import user from "../index/PersonalIndex";
export default {
  created() {
    this.axios.get("/group/api/v1/grouplist").then(res => {
      this.tripsgo=res.data.data;
      console.log(res.data.data)
    });
  },
  mounted() {
    this.axios.get("/group/api/v1/allcity").then(res => {
      this.cities = res.data.data;
    });
    // this.axios.get(`/group/api/v1/grouplist/${this.page}`).then(res => {
    //   this.tripsgo = this.tripsgo.concat(res.data.data);
    // });
  },
  data() {
    return {
      //下拉菜单
      cityname:'',
      page: 1,
      cid: "",
      tripsgo: [],
      qiehuan: {
        useropa: 0,
        userdis: "none",
        mainopa: 1,
        maindis: "block"
      },
      top: 550,
      pop: false,
      value1: 0,
      value2: 0,
      option1: [{ text: "开始日期", value: 0 }, { text: "结束日期", value: 1 }],
      option2: [
        { text: "主题", value: 0 },
        { text: "一起去冒险", value: 1 },
        { text: "要甜甜的浪漫", value: 2 },
        { text: "走！探店去", value: 3 },
        { text: "寻觅美食", value: 4 },
        { text: "看展才是正经事", value: 5 },
        { text: "约你去看音乐剧", value: 6 },
        { text: "其他活动", value: 7 }
      ],
      trips: [
        {
          details:
            "12月25日－1月2日，东京自由行，上海出发，主要去富士山，还会去镰仓和迪士尼海洋，可拼房或者单独住，合适直接出票，有兴趣的伙伴联系我。",
          theme: "一起去冒险",
          name: "维多利亚",
          age: "20",
          date: "12月23日~2020年1月8日",
          gender: 0,
          place: "日本•大阪•京都",
          fans: "87",
          themepic: require("../../assets/theme/explore.png"),
          personalhead: require("../../assets/citypics/heimen.jpg")
        },
        {
          details:
            "12月25日－1月2日，东京自由行，上海出发，主要去富士山，还会去镰仓和迪士尼海洋，可拼房或者单独住，合适直接出票，有兴趣的伙伴联系我。",
          theme: "一起去冒险",
          name: "维多利亚",
          age: "20",
          date: "12月23日~2020年1月8日",
          gender: 0,
          place: "日本•大阪•京都",
          fans: "87",
          themepic: require("../../assets/theme/explore.png"),
          personalhead: require("../../assets/citypics/heimen.jpg")
        }
      ],
      show: false, //底部弹出层
      cities: [
        // { cityimg: require("../../assets/citypics/city11.jpg"), name: "台湾" },
        // { cityimg: require("../../assets/citypics/city6.jpg"), name: "香港" },
        // { cityimg: require("../../assets/citypics/city11.jpg"), name: "东京" },
        // { cityimg: require("../../assets/citypics/city6.jpg"), name: "京都" },
        // { cityimg: require("../../assets/citypics/city11.jpg"), name: "大阪" },
        // { cityimg: require("../../assets/citypics/city6.jpg"), name: "普吉岛" },
        // {
        //   cityimg: require("../../assets/citypics/city11.jpg"),
        //   name: "巴厘岛"
        // },
        // { cityimg: require("../../assets/citypics/city6.jpg"), name: "新西兰" },
        // { cityimg: require("../../assets/citypics/city11.jpg"), name: "美国" },
        // { cityimg: require("../../assets/citypics/city6.jpg"), name: "法国" },
        // {
        //   cityimg: require("../../assets/citypics/city11.jpg"),
        //   name: "西班牙"
        // },
        // { cityimg: require("../../assets/citypics/city6.jpg"), name: "北京" },
        // { cityimg: require("../../assets/citypics/city11.jpg"), name: "上海" },
        // { cityimg: require("../../assets/citypics/city6.jpg"), name: "广州" },
        // { cityimg: require("../../assets/citypics/city11.jpg"), name: "成都" },
        // { cityimg: require("../../assets/citypics/city6.jpg"), name: "南极" }
      ]
    };
  },
  components: {
    like,
    user
  },
  methods: {
    bk(city,cityname) {
      this.cid = city;
      this.cityname=cityname;
      for (var i = 0; i < 800; i++) {
        setTimeout(() => {
          this.top = i;
        }, 10);
      }
      setTimeout(() => {
        this.pop = false;
      }, 300);
      if (this.value2) {
        this.axios
          .get(
            "/group/api/v1/grouplist?cid=" + this.cid + "&tid=" + this.value2
          )
          .then(res => {
             this.tripsgo=res.data.data;
          });
      } else {
        this.axios.get("/group/api/v1/grouplist?cid=" + this.cid).then(res => {
           this.tripsgo=res.data.data;
        });
      }
    },
    fh(data) {
      this.qiehuan.useropa = 0;
      setTimeout(() => {
        this.qiehuan.userdis = "none";
        this.qiehuan.maindis = "block";
        setTimeout(() => {
          this.qiehuan.mainopa = 1;
        }, 50);
      }, 300);
    },
    jt() {
      this.qiehuan.mainopa = 0;
      setTimeout(() => {
        this.qiehuan.maindis = "none";
        this.qiehuan.userdis = "block";
        setTimeout(() => {
          this.qiehuan.useropa = 1;
        }, 50);
      }, 300);
    },
    jumpchos() {
      this.$emit("Gjc", { chosopa: 1, chosdis: "block", go: "none", opa: 0 });
    },
    jumphome() {
      this.$emit("Child", { opa: 1, gos: "none", go: "block", copa: 0 });
    },
    showPop() {
      this.pop = true;
      for (var i = 550; i >= 0; i--) {
        setTimeout(() => {
          this.top = i;
        }, 10);
      }
      setTimeout(() => {
           for(let item of this.$refs.img){
        setTimeout(() => {
          item.src=item.dataset.img;
        }, 80);
      }
      }, 600);
   
    },
    closePop() {
      for (var i = 0; i < 800; i++) {
        setTimeout(() => {
          this.top = i;
        }, 10);
      }
      setTimeout(() => {
        this.pop = false;
      }, 300);
    }
  },
  watch: {
    value2(newval, oldval) {
      if (newval) {
        if (this.cid) {
          this.axios
            .get("/group/api/v1/grouplist?cid=" + this.cid + "&tid=" + newval)
            .then(res => {
               this.tripsgo=res.data.data;
            });
        } else {
          this.axios
            .get("/group/api/v1/grouplist?" + "&tid=" + newval)
            .then(res => {
               this.tripsgo=res.data.data;
            });
        }
      } else {
        this.axios.get("/group/api/v1/grouplist").then(res => {
           this.tripsgo=res.data.data;
        });
      }
    }
  }
};
</script>
<style>
#grouptrip-page {
  position: relative;
}
#grouptrip-page .tabbar-top {
  position: relative;
  top: 0;
  height: 90px;
}
#grouptrip-page .tabbar-top .tabbar-title {
  width: 100%;
  display: flex;
  height: 35px;
  justify-content: space-between;
}
#grouptrip-page .tabbar-top .tabbar-title .tabbar-top-bg {
  width: 100px;
  height: 30px;
  margin-top: 6px;
  margin-left: 25px;
}
#grouptrip-page .tabbar-top .tabbar-title .tabbar-top-bg img {
  width: 100%;
}
#grouptrip-page .tabbar-top .grouptrip-back {
  height: 35px;
}
#grouptrip-page .tabbar-top a,
#note-page .tabbar-top a {
  text-decoration: none;
  display: block;
  width: 45px;
  font-size: 12px;
  height: 20px;
}
#grouptrip-page .tabbar-top .tabbar-title .start-group,
#note-page .tabbar-top .start-group {
  background-color: #b689b6;
  color: #fff;
  border-radius: 30px;
  text-align: center;
  line-height: 20px;
  margin-top: 8px;
  margin-right: 15px;
}
#grouptrip-page .tabbar-top .dropdown-theme .van-cell:not(:last-child)::after {
  border: none;
}
#grouptrip-page .tabbar-top .van-dropdown-menu__title,
#grouptrip-page .tabbar-top .van-cell {
  font-weight: bolder;
}
#grouptrip-page .tabbar-top .van-cell {
  font-size: 18px;
}
#grouptrip-page .van-dropdown-item__option--active,
#grouptrip-page .van-dropdown-menu__title--active {
  color: #8134af;
}
#grouptrip-page .tabbar-top .van-cell__value {
  display: none;
}
#grouptrip-page .tabbar-top .van-dropdown-item__option {
  text-align: center;
}
.tabbar-options {
  display: flex;
  justify-content: space-around;
}
.tabbar-options .mint-button--default {
  background-color: transparent;
  box-shadow: none;
  color: #111111;
  font-size: 15px;
  font-weight: 800;
}
.grouptrip-wrap {
  position: relative;
  width: 100%;
}
.grouptrip-wrap .theme-item {
  position: absolute;
  width: 300px;
  height: 200px;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grouptrip-wrap .theme-item span {
  color: #fff;
  font-size: 13px;
  margin: 0px 0px 10px 0px;
}
.grouptrip-wrap .theme-item .theme_details {
  color: #fff;
  font-size: 16px;
}
.grouptrip-wrap .theme-item .theme-icon {
  width: 60px;
  height: 60px;
  object-fit: cover;
}
.grouptrip-wrap .theme-item .theme-icon img {
  width: 100%;
}
.grouptrip-wrap .grouptrip-wrap-item {
  height: 570px;
  position: relative;
}
.grouptrip-wrap .grouptrip-wrap-item img {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}
.grouptrip-wrap-item .mint-swipe {
  height: 350px;
}
.item-personal-msg {
  height: 170px;
  padding: 20px 10px;
  box-sizing: border-box;
}
.personal-msg-header {
  height: 60px;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}
.personal-msg-header .msg-header-head {
  width: 60px;
  height: 60px;
}
.personal-msg-header .msg-header-head img {
  width: 100%;
  border-radius: 30px;
}
.personal-msg-header .msg-header-text {
  display: flex;
  flex-direction: column;
  width: 300px;
}
.personal-msg-header .msg-header-text h4 {
  margin: 10px;
}
.personal-msg-header .msg-header-person-text {
  display: flex;
  width: 200px;
}
.msg-header-person-text .msg-sex-age {
  border-radius: 30px;
  width: 50px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  margin-left: 10px;
  margin-right: 10px;
}
.msg-header-person-text .msg-screct {
  border: 1px solid #b689b6;
}
.msg-header-person-text .msg-female {
  border: 1px solid #ffb6b9;
}
.msg-header-person-text .msg-male {
  border: 1px solid #8ac6d1;
}
.msg-header-person-text .msg-sex-age .msg-age {
  font-size: 12px;
  margin-left: 3px;
}
.msg-header-person-text .msg-sex-age .msg-age-screct {
  color: #b689b6;
}
.msg-header-person-text .msg-sex-age .msg-age-female {
  color: #ffb6b9;
}
.msg-header-person-text .msg-sex-age .msg-age-male {
  color: #8ac6d1;
}
.personal-msg-header .msg-more {
  height: 60px;
  line-height: 60px;
}
.personal-msg-date,
.personal-msg-place {
  margin-bottom: 10px;
}
.item-personal-msg .msg-date,
.item-personal-msg .msg-place {
  margin: 0 10px;
  font-size: 14px;
}
.item-personal-msg p,
.item-personal-msg p {
  display: inline;
  font-weight: 500;
  font-size: 14px;
}
.msg-header-person-text .msg-favoriate {
  border: 1px solid #b689b6;
  border-radius: 30px;
  width: 50px;
  height: 16px;
  align-items: center;
  text-decoration: none;
  display: flex;
  justify-content: space-around;
}
.msg-header-person-text .msg-favoriate span {
  font-size: 12px;
  color: #b689b6;
  margin-left: 3px;
}
.item-personal-msg .interest {
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-around;
}
.item-personal-msg .interest p {
  margin: 0px;
  font-size: 20px;
  font-weight: bolder;
}
.item-personal-msg .interest span {
  font-size: 13px;
  margin-left: -15px;
  font-weight: 500;
}
.item-personal-msg .interest a {
  width: 230px;
  height: 40px;
  background-color: #8134af;
  border-radius: 30px;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
/* 弹出组件 */
.tabbar-top .van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: none;
}
.pop-panel {
  position: fixed;
  max-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  height: 100%;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2000;
}
.pop-panel .pop-top {
  width: 100%;
  display: flex;
  padding: 15px 5px;
  box-sizing: border-box;
}
.pop-panel .tabbar-search {
  margin-left: 10px;
  width: 80%;
  display: flex;
  position: relative;
  border-radius: 30px;
  background-color: #e4e4e47c;
}
.pop-panel .pop-top .van-button {
  height: 30px;
  line-height: 30px;
}
.pop-panel .pop-top .van-button--default {
  border: none;
}
.pop-panel .pop-panel-title {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #ececec;
  color: #dddddd;
  line-height: 40px;
}
.pop-panel .pop-panel-title span {
  margin-left: 15px;
  font-size: 15px;
  font-weight: lighter;
}
.pop-panel .pop-panel-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.pop-panel .pop-panel-wrap .pop-item {
  width: 25%;
  text-align: center;
}
.pop-panel .pop-panel-wrap .pop-item .pop-item-img {
  width: 60px;
  height: 60px;
  margin: 15px auto 5px auto;
}
.pop-panel .pop-panel-wrap .pop-item .pop-item-img img {
  width: 100%;
  border-radius: 50px;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}
.pop-panel .pop-panel-wrap .pop-item h5 {
  margin: 0px 0px 10px 0px;
}
.note-tabs .collection {
  margin-left: 15px;
}
</style>