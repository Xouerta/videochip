<template>
    <div class="vod-detail" style="margin: 20px 0; width: 90%; overflow: hidden;">
        <el-row class="vod-detail">
            <el-col :xs="24" :sm="6" class="vod-detail">
                <div class="vod-detail">
                    <img :src="mov_detail.vod_pic" alt=""/>
                </div>
                
            </el-col>
            <el-col  :sm="18" style="padding: 0 10px">
                <el-row style="margin: 0 0 15px 0">
                    <p style="margin: 0; font-size: 18px;">{{ mov_detail.vod_name }}</p>
                </el-row>

                <el-row v-if="mov_detail.vod_sub">
                    <span class="des-name">
                        又名:&nbsp; &nbsp; 
                        <p class="des-content">{{ mov_detail.vod_sub }}</p>
                    </span>
                    
                </el-row>

                <el-row>
                    <span class="des-name">地区:&nbsp;&nbsp;</span>
                    <p class="des-content"> {{ mov_detail.vod_area }}</p>
                </el-row>

                <el-row>
                    <span class="des-name">
                        语言:&nbsp;&nbsp;
                        <p class="des-content"> {{ mov_detail.vod_lang }}</p>
                    </span>
                    
                </el-row>

                <el-row>
                    <span class="des-name">
                        类型:&nbsp;&nbsp;
                        <p class="des-content"> {{ mov_detail.type_name }}</p>
                    </span>
                    
                </el-row>

                <el-row>
                    <span class="des-name">
                        上映:&nbsp;&nbsp;
                        <p class="des-content"> {{ mov_detail.vod_year }}</p>
                    </span>
                    
                </el-row>

                <el-row>
                    <span class="des-name">
                        集数:&nbsp; &nbsp;
                        <p class="des-content">{{ mov_detail.vod_remark }}</p>
                    </span>
                    
                </el-row>

                <el-row>
                    <span class="des-name">
                        导演:&nbsp;&nbsp;
                        <p class="des-content"> {{ mov_detail.vod_director }}</p>
                    </span>
                    
                </el-row>

                <el-row>
                    <span class="des-name">
                        更新时间:&nbsp;&nbsp;
                        <p class="des-content"> {{ mov_detail.vod_time }}</p>
                    </span>
                    
                </el-row>

                <el-row>
                    <span class="des-name">
                        收藏:&nbsp;&nbsp;
                        <p class="des-content"> 
                            <el-icon :size="26" style="vertical-align: middle;" v-if="!isCollect" color="#999" @click="addCollect"><StarFilled /></el-icon>
                            <el-icon :size="26" style="vertical-align: middle" v-else color="yellow" @click="removeCollect"><StarFilled /></el-icon>  
                        </p>
                    </span>
                    
                </el-row>

                <el-row>
                    <span class="des-name">
                        主演:&nbsp;&nbsp;
                        <p class="des-content"> {{ mov_detail.vod_actor }}</p>
                    </span>
                    
                </el-row>

                <el-row class="detail3">
                    <span class="des-name">
                        详情:&nbsp;&nbsp; 
                        <p class="des-content" style="font-size:15px" v-if="checkHtml(mov_detail.vod_content)" v-html="mov_detail.vod_content"/>
                        <p class="des-content" style="font-size:15px" v-else>{{ mov_detail.vod_content }}</p>
                    </span>  
                    
                </el-row>

            </el-col>  
        </el-row>

        <el-row class="vod-play-url">
            <el-col class="vod-play-url"
                v-for="v, k in mov_detail.vod_play_url" 
                :key="k"
                :href="v"
                :xs="8" :sm="3"
                style="margin: 5px 0;"
                >
                <el-button 
                class="vod-play-url" 
                style="float: left;" 
                @click="videoPlay" 
                :class="[{active: activeName == v}]"
                :href="v">{{ k }}
                </el-button>
            </el-col>
        </el-row>
        
        <el-row class="video-play" v-if="video_play" style="margin: 40px  0">
            <myVideoPlay :src="video_play_url"/>
        </el-row>
    </div>
</template>

<script>
// 视频详情
import apiGetMovDetail from '../apis/getMovDetail'
import myVideoPlay from './VideoPlay.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { isCollectVideo, addCollectVideo, removeCollectVideo } from '../apis/videoCollection'

export default {
  name: 'MovDetail',

  setup() {
    const store = useStore()
    return {
        store
    }
  },

  components: {
    myVideoPlay
  },

  props: {
        vod_id: String
    },
  data() {
    return {
        mov_detail: {},
        video_play: false,
        video_play_url: '',  // 此时正在播放的 视频url
        activeName: '',
        isCollect: 0  // 此视频是否被收藏
    }
  },

  methods: {
    getMovDetail() {
        var param = {
            vod_id: this.vod_id
        }
        console.log(param)
        apiGetMovDetail(param).then(
            (res) => {
                if (res.code == 200) {
                    this.mov_detail = res.data
                } else {
                    console.log('failed', res)
                }
            }
        )
    },

    addCollect() {
        // 将此视频添加收藏
        console.log("add collect")
        if (this.store.state.appStore.isLogining) {
            var params = {
                vod_id: this.vod_id,
                user_id: this.store.state.appStore.user.id
            }
            addCollectVideo(params).then(
                (res) => {
                    if (res.data.code == 200) {
                        this.isCollect = 1
                    } else {
                        ElMessage({
                                message: res.data.message,
                                type: 'warning',
                            })
                    }
                }
            )
        } else {
            ElMessage({
                        message: '请先登录',
                        type: 'warning',
                            })
        }
    },

    removeCollect() {
        console.log("remove collect")
        if (this.store.state.appStore.isLogining) {
            var params = {
                vod_id: this.vod_id,
                user_id: this.store.state.appStore.user.id
            }
            removeCollectVideo(params).then(
                (res) => {
                    if (res.data.code == 200) {
                        this.isCollect = 0
                    } else {
                        ElMessage({
                                message: res.data.message,
                                type: 'warning',
                            })
                    }
                }
            )
        } else {
            ElMessage({
                        message: '请先登录',
                        type: 'warning',
                            })
        }
    },

    showIsCollect() {
        // 显示此视频是否被收藏
        if (this.store.state.appStore.isLogining) {
            var params = {
                vod_id: this.vod_id,
                user_id: this.store.state.appStore.user.id
            }
            isCollectVideo(params).then(
                (res) => {
                    if (res.data.code == 200) {
                        this.isCollect = res.data.data
                        console.log(this.isCollect)
                    } else {
                        ElMessage({
                                message: res.data.message,
                                type: 'warning',
                            })
                    }
                }
            )
        }
    },

    videoPlay(v) {
        // 点击按钮时修改 视频播放的链接
        var play_url = v.currentTarget.attributes.href.value
        console.log(play_url)
        if (play_url) {
            this.video_play = true
            this.video_play_url = play_url
            this.activeName = play_url
        } else {
            ElMessage({
                message: '导入视频失败',
                type: 'warning',
                })
        }
        
    },

    checkHtml(s) {
        // 判断它是否是html
        if (typeof(s) == 'string') {
            if (s.indexOf('<p>')>-1) {
                return true
            } else if (s.indexOf('<span>')>-1) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
  },

   watch: {
      // user出现变化后 请求数据 查看是视频是否被收藏
      moniterUser() {
        return this.store.state.appStore.user.id
      }
    },

    computed: {
      moniterUser() {
        this.showIsCollect()
      }
    },


  created() {
    this.getMovDetail()
  }

}

</script>

<style>

div.vod-detail .el-row {
    margin: 0 0 10px;
}

span.des-name {
    line-height: 20px;
    margin: 0;
    color: #999;
    font-weight: 400;
    display: inline;
    text-align: left;
}

p.des-content {
    margin: 0;
    line-height: 20px;
    text-align: left;
    display: inline;
    color:black;
}


.el-col.vod-detail div.vod-detail {
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 130%;
}

.el-col.vod-detail div img {
    width: 95%;
    height: auto;
    display: block;
    margin: 0 auto;
    /* aspect-ratio: 70/89;  */
    object-fit: cover;
}

.el-button.vod-play-url.active {
  background-color: rgb(55,99,20);
  color: white;
  border-radius: 4px;
}
/* p {
    margin: 0;
    padding: 0;
} */
</style>


