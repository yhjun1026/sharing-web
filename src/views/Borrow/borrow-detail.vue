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
        <el-col :span="12"><h4 class="new-member-h3">单据编号：454545454545</h4></el-col>
        <el-col :span="10" style="text-align: right"><h4 class="new-member-h3">状态：使用中</h4></el-col>
      </el-row>
      <div>
        <el-row type="flex" justify="space-between" align="middle">
          <h3 class="new-member-h3">支付信息</h3>
        </el-row>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;margin-top: 15px;">
          <el-table-column
            prop="date"
            label="ID" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="时间" align="center" header-align="center">
          </el-table-column>
          <el-table-column
            prop="date"
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
              物品名称：虾米充电宝
            </el-col>
            <el-col :span="12">
              赔偿金额：10 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
            </el-col>
            <el-col :span="12">
              租用时间：1天
            </el-col>
            <el-col :span="12">
              押金：200
            </el-col>
            <el-col :span="12">
              到期时间：2018-5-3
            </el-col>
            <el-col :span="12">
              租用人：小李
            </el-col>
            <el-col :span="12">
              &nbsp;
            </el-col>
            <el-col :span="12">
              手机号：15623568956
            </el-col>
          </el-col>
        </el-row>
        <div style="text-align:center;">
          <el-button class="member-list-btn" type="primary" @click="">退还</el-button>
          <!--<el-button class="member-list-btn" type="danger" :plain="true" @click="">退还</el-button>-->
        </div>
      </div>
    </div>
    <el-dialog title="赔偿金额" :visible.sync="dialogFormVisible" width="400px">
      <el-form :model="form">
        <el-form-item label="金额" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '70px'
      }
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
