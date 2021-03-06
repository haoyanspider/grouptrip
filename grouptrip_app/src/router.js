import Vue from 'vue'
import Router from 'vue-router'
// 导入页面组件
// 首页
import Home from '@/views/Home.vue'
import Grouptrip from './components/index/Grouptrip.vue'
import PersonalIndex from './components/index/PersonalIndex.vue'
// 个人中心
import Personal from '@/views/Personal.vue'
// 攻略
import Strategy from '@/views/Strategy.vue'
// 游记
import Note from '@/views/Note.vue'
import Login from '@/components/login/login'
// 设置个人信息
import Settings from '@/components/settings/settings'
import Detail from '@/components/settings/persondetail/persondetail'
import go from '@/components/common/go'
import more from '@/components/strategy/morecity'
// 发布group trip
import uploadImg from '@/components/publish/uploadImg'
import groupDetail from '@/components/publish/groupDetail'
import choseTheme from '@/components/publish/choseTheme'
import Guan from '@/components/common/guanzhu.vue'
import Changeavatar from '@/components/settings/changeAvatar/changeAvatar'
import fans from "@/components/home/fanList"
Vue.use(Router)

export default new Router({
  routes: [
    {path:'/more',component:more},
    {path:'/fans',component:fans},
    {path:'/guan',component:Guan},
    { path: '/', redirect: '/home',component: Home },
    { path: '/Home', component: Home },
    { path:'/Grouptrip',component:Grouptrip },
    { path: '/Personal', component: Personal },
    { path: '/Strategy', component: Strategy },
    { path: '/Note', component: Note },
    { path: '/login', component: Login },
    { path: '/Settings', component: Settings },
    { path: '/Detail', component: Detail },
    { path: '/Login', component: Login },
    { path: '/uploadimg', component: uploadImg },
    { path: '/Chosetheme', component: choseTheme },
    { path: '/groupdetail', component: groupDetail },
    { path: '/go', component: go},
    { path: '/Changeavatar', component: Changeavatar },
    { path: '/PersonalIndex', component:PersonalIndex }
  ]
})
