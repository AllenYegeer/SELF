<template>
  <el-carousel indicator-position="none" height="100vh" interval="1500" >
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <div class="pic_item">
        <img
          :src="item.idView"
          class="imagess"
          style="width: 100%; height: 100%; object-fit: over"
        />
        <div class="eb">
          <el-button
            type="primary"
            round
            bg="true"
            text="true"
            style="width: 300px; font-size: 20px; height: 50px"
            @click="enter"
          >
            点击进入SLEF<el-icon><Pointer /></el-icon>
          </el-button>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { replace } from 'lodash';

export default {
  data() {
    return {
      imgList: [
        { id: 0, idView: "./src/assets/img/lunbo1.png" },
        {
          id: 1,
          idView: "./src/assets/img/v2-4cc61328707b6e0df365397514702855_r.jpg",
        },
        {
          id: 2,
          idView: "./src/assets/img/v2-862bce394ae8102d9c9ffd353202b9ec_r.jpg",
        },
        {
          id: 3,
          idView: "./src/assets/img/v2-ab2c4922f39697d8583464a5e8d401ad_r.jpg",
        },
      ],
    };
  },
  methods: {
    enter(){
        this.$router.push('/waitting',replace)
    }
  }
};
</script>
<style  scoped>
.el-carousel__item .eb {
  color: white;
  opacity: 0.75;
  margin: 0;
  font-size: 0.8rem;
}
.imagess {
  width: 100%;
  height: 100%;
  position: relative;
}
.pic_item {
  position: relative;
  height: 100%;
}
.pic_item:hover {
  cursor: pointer;
}
.pic_item img {
  width: 100%;
  height: 100%;
}
.pic_item .eb {
  position: absolute;
  margin-left: 40%;
  margin-right: 40%;
  bottom: 50%;
}
</style>
  
