/**
* 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
* 项目名：sharing-web
* 文件名：borrow-list
* 模块说明：
* 修改历史：
* 2018/5/3 - lihuiming - 创建
*/
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="">
        <el-breadcrumb-item normal>借用单</el-breadcrumb-item>
        <el-breadcrumb-item>借用明细</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-wrap">
      <el-row style="margin-bottom: 15px;">
        <el-col :span="12"><h4 class="new-member-h3">单据编号：{{detail.billNumber}}</h4></el-col>
        <el-col :span="10" style="text-align: right"><h4 class="new-member-h3">状态：{{dealData(detail.stat)}}</h4>
        </el-col>
      </el-row>
      <div>
        <el-row type="flex" justify="space-between" align="middle">
          <h3 class="new-member-h3">支付信息</h3>
        </el-row>
        <el-table
          :data="borrowPayInfo"
          stripe
          style="width: 100%;margin-top: 15px;">
          <!--<el-table-column
            prop="date"
            label="ID" align="center" header-align="center">
          </el-table-column>-->
          <el-table-column
            prop="payUser"
            label="名称" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="payTime"
            label="时间" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="payAmt"
            label="金额" align="center" header-align="center">
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top: 15px">
        <el-row type="flex" justify="space-between" align="middle">
          <h3 class="new-member-h3">借用信息</h3>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col :span="6" align="center">
            <el-carousel :interval="4000" type="card" height="120px" style="margin-top: 50px">
              <el-carousel-item v-for="item in img" :key="item">
                <h3><img
                  :src="item" style="width: 100%;height: 100%"></h3>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="18" class="borrow-msg">
            <el-col :span="12">
              物品名称：{{goodsDtl.goodsName}}
            </el-col>
            <el-col :span="12">
              赔偿金额：{{goodsDtl.compensateAmt }} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <el-button type="text" @click="precompensate()" style="padding: 0"
                         v-if="detail.stat!='backed'&&parseFloat(goodsDtl.compensateAmt)==0">
                修改
              </el-button>
            </el-col>
            <el-col :span="12">
              租用时间：{{detail.borrowDealTime }}
            </el-col>
            <el-col :span="12">
              押金：{{goodsDtl.depositAmt}}
            </el-col>
            <el-col :span="12">
              到期时间：{{detail.planBackTime}}
            </el-col>
            <el-col :span="12">
              租用人：{{custom.nick}}
            </el-col>
            <el-col :span="12">
              &nbsp;
            </el-col>
            <el-col :span="12">
              手机号：{{custom.mobile}}
            </el-col>
          </el-col>
        </el-row>
        <div style="text-align:center;">
          <qf-access :code="'btn_good_1_3'">
            <el-button class="member-list-btn" type="primary" @click=""
                       v-if="detail.stat!='using'&&detail.stat!='backed'&&detail.stat!='new'">退还押金
            </el-button>
          </qf-access>
          <qf-access :code="'btn_good_1_3'">
            <el-button class="member-list-btn" type="primary" @click="gotoCollar()"
                       v-if="detail.stat!='using'&&detail.stat!='backed'&&detail.stat!='compensated'">领用
            </el-button>
          </qf-access>
          <qf-access :code="'btn_good_1_3'">
            <el-button class="member-list-btn" type="primary" @click="gotoBack()"
                       v-if="detail.stat=='using'&&detail.stat!='backed'">归还
            </el-button>
          </qf-access>
          <!--<el-button class="member-list-btn" type="danger" :plain="true" @click="">退还</el-button>-->
        </div>
      </div>
    </div>
    <el-dialog title="赔偿金额" :visible.sync="dialogPayVisible" width="400px">
      <el-form :model="payform">
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="payform.compensateGoods[0].amt" auto-complete="off" style="width: 85%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="gotoPrecompensate()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="物品领用" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form">
        <el-form-item label="受理人" :label-width="formLabelWidth">
          <el-input v-model="form.borrowDealer" auto-complete="off" style="width: 85%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="collar()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="物品归还" :visible.sync="dialogbackVisible" width="400px">
      <el-form :model="backform">
        <el-form-item label="受理人" :label-width="formLabelWidth">
          <el-input v-model="backform.backDealer" auto-complete="off" style="width: 85%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toBack()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        img: ['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2719949837,244093837&fm=27&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2719949837,244093837&fm=27&gp=0.jpg', 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2719949837,244093837&fm=27&gp=0.jpg'],
        value: '',
        searchForm: {
          square: "",
          name: "",
          code: "",
          orgCode: "",
          pageIndex: 0,
          pageSize: 10,
          exchangeMode: "",
          minPoint: "",
          maxPoint: "",
          minTime: "",
          maxTime: ""
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        form: {
          "borrowDealer": "",
          "borrowId": ""
        },
        payform: {
          "borrowId": "",
          "compensateGoods": [
            {
              "amt": 0,
              "goodsUuid": ""
            }
          ]
        },
        backform: {
          "borrowDealer": "",
          "borrowId": ""
        },
        formLabelWidth: '70px',
        dialogFormVisible: false,
        dialogbackVisible: false,
        dialogPayVisible: false,
        detail: {},
        custom: {},
        goodsDtl: {},
        borrowPayInfo: [],
        compensatePayInfo: {},
      }
    },
    methods: {
      /*列表数据处理*/
      dealData(stat){
        let val;
        switch (stat) {
          case'new':
            val = '新增';
            break;
          case 'using':
            val = '已领取';
            break;
          case 'backed':
            val = '已归还';
            break;
          case 'compensated':
            val = '已赔偿';
            break;
        }
        return val;
      },
      getList(id){
        this.$axios({
          url: `/v1/borrow/get/${id}`,
          method: "GET"
        }).then(res => {
          const {data, status} = res.data;
          console.log(data)
          if (status == 0) {
            this.detail = data;
            this.custom = data.custom;
            this.goodsDtl = data.goodsDtl[0];
            this.borrowPayInfo = [data.borrowPayInfo];
            this.compensatePayInfo = data.compensatePayInfo;
            console.log(data)
          }
        }).catch(error => {
          this.$message({
            message: '获取借用明细失败',
            type: 'error'
          })
        });
      },
      gotoCollar(row){
        this.form = {
          "borrowDealer": "",
          "borrowId": ""
        };
        this.dialogFormVisible = true;
        this.form.borrowId = this.detail.uuid;
      },
      /*领用*/
      collar(){
        this.$axios({
          url: "/v1/borrow/collar",
          method: "POST",
          data: this.form
        }).then(response => {
          const {data, status, message} = response.data;
          console.log(data)
          if (status == 0) {
            this.dialogFormVisible = false;
//            this.getList();
            this.getList(this.$route.query.id);
          } else {
            this.$message({
              message: message,
              type: 'error'
            })
          }
        }).catch(error => {
          this.searching = false;
          this.$message({
            message: '领用失败',
            type: 'error'
          })
        });
      },
      gotoBack(row){
        this.backform = {
          "backDealer": "",
          "borrowId": "",
          "payInfoParam": {
            "oriOutTradeNo": "",
            "oriTradeNo": "",
            "outTradeNo": "",
            "payAmt": 0,
            "payId": "",
            "payTime": "",
            "payType": 0,
            "payUser": "",
            "tradeNo": "",
            "transType": 0
          }
        };
        this.dialogbackVisible = true;
        this.backform.borrowId = this.detail.uuid;
      },
      /*归还*/
      toBack(){
        this.$axios({
          url: "/v1/borrow/back",
          method: "POST",
          data: this.backform
        }).then(response => {
          const {data, status, message} = response.data;
          console.log(data)
          if (status == 0) {
            this.dialogbackVisible = false;
//            this.getList();
            this.getList(this.$route.query.id);
          } else {
            this.$message({
              message: message,
              type: 'error'
            })
          }
        }).catch(error => {
          this.searching = false;
          this.$message({
            message: '领用失败',
            type: 'error'
          })
        });
      },
      /*退款*/
      gotoBackMoney(){

      },
      precompensate(){
        this.payform = {
          "borrowId": this.detail.uuid,
          "compensateGoods": [
            {
              "amt": 0,
              "goodsUuid": this.goodsDtl.goodsUuid
            }
          ]
        };
        this.dialogPayVisible = true;
      },
      gotoPrecompensate(){
        this.$axios({
          url: "/v1/borrow/precompensate",
          method: "POST",
          data: this.payform
        }).then(response => {
          const {data, status, message} = response.data;
          if (status == 0) {
            this.dialogPayVisible = false;
            this.getList(this.$route.query.id);
          } else {
            this.$message({
              message: message,
              type: 'error'
            })
          }
        }).catch(error => {
          this.searching = false;
          this.$message({
            message: '发起赔偿失败',
            type: 'error'
          })
        });
      }
    },
    mounted() {
      /*页面加载进来初始事件*/
      console.log(this.$route)
      this.getList(this.$route.query.id);
    }
  }
</script>
<style type="less">
  .borrow-msg {
    padding: 15px 30px;
  }

  .borrow-msg .el-col-12 {
    margin: 15px 0;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    line-height: 200px;
    margin: 0;
    text-align: center;
    img {
      width: 320px;
      height: 320px;
    }
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
