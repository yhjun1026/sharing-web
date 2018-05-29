<template>
  <div class="gift-detail-box ffan-style">
    <div class="crumbs">
      <el-breadcrumb separator="">
        <el-breadcrumb-item :to="{path: 'article-list'}">物品列表</el-breadcrumb-item>
        <el-breadcrumb-item>物品详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-wrap">
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">礼品编号：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{giftList.code}}</div>
        </el-col>
        <el-col :span="2" class="edit-btn">
          <qf-access :code="'btn_good_1_3'">
            <el-button type="primary" @click="edit(giftList.uuid)" class="compile">修改</el-button>
          </qf-access>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">礼品名称：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{giftList.name}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">总库存：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{giftList.quantity}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">剩余库存：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{giftList.currentQuantity}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">单价：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{giftList.price}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">押金金额：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{giftList.depositamt}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">租用价格：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{giftList.rentPrice}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">赔偿金额：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{giftList.repayamt }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="grid-content bg-purple">状态：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">{{giftList.state == '0' ? '正常' : '不正常' }}</div>
        </el-col>
      </el-row>
      <el-row>
        <div class="picture">
          <el-col :span="2">
            <div class="grid-content bg-purple">礼品图片：</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light"><img v-if="giftList.picture" :src="giftList.picture"></div>
          </el-col>
        </div>
      </el-row>
     <!-- <div class="log">
        <p>操作日志：</p>
        <br>
        <el-table :data="tableData" stripe style="width: 80%">
          <el-table-column align="center" prop="createTime" label="操作时间" width="180">
            <template scope="scope">{{scope.row.createTime | formatDateTime}}</template>
          </el-table-column>
          <el-table-column align="center" prop="operatorName" label="操作人" width="180"></el-table-column>
          <el-table-column align="left" prop="operation" label="操作内容"></el-table-column>
        </el-table>
      </div>-->
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data(){
      return {
        tableData: [{
          createTime: 1493795882000,
          name: "testGift1",
        }],
        giftList: {},
      }
    },
    methods: {
      search(){
        const id = this.$route.query.id;
        this.$axios({
          url: `/v1/goods/get/${id}`,
          method: "GET"
        }).then(response => {
          const {data, status} = response.data;
          if (status === 0) {
            this.giftList = data;
            console.log(this.giftList)
          }
        }).catch(error => {
          this.$message({
            message: '获取物品明细失败',
            type: 'error'
          })
        });
      },
      edit(id){
        this.$router.push({
          path: 'article-new',
          query: {
            id: id,
          }
        })
      }
    },
    mounted(){
      this.search();
    }
  }
</script>


<style lang="less">

  .gift-detail-box {
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .compile {
      position: absolute;
      right: 0;
    }
    .bg-purple {
      text-align: right;
    }
    .bg-purple-light img {
      width: 250px;
    }
    .editor-btn {
      position: absolute;
      right: 0px;
      .el-button {
        font-size: 16px;
        width: 80px;
      }
    }
    .grid-content {
      border-radius: 4px;
      /*min-height: 36px;*/
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .log {
      margin-top: 50px;
    }
    .content-wrap {
      position: relative;
    }
    .butBox {
      position: absolute;
      top: 20px;
      right: 60px;
    }
  }

</style>
