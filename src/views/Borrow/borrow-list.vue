/**
* 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
* 项目名：sharing-web
* 文件名：borrow-list
* 模块说明：
* 修改历史：
* 2018/5/3 - lihuiming - 创建
*/
<template>
  <div v-title="'借用单'">
    <div class="crumbs">
      <el-breadcrumb separator="">
        <el-breadcrumb-item>借用单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-wrap">
      <div class="search-box">
        <div class="searchBox">
          <el-form :inline="true" ref="searchForm" :data="searchForm" :model="searchForm"
                   label-width="80px">
            <el-form-item label="物品编号:" prop="code">
              <el-input v-model="searchForm.goodsCode" placeholder="请输入物品编号" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="物品名称:" prop="name">
              <el-input v-model="searchForm.goodsName" placeholder="请输入物品名称" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:" prop="name">
              <el-input v-model="searchForm.mobile" placeholder="请输入手机号码" style="width:220px;"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="借用时间:" prop="date">
              <el-date-picker
                v-model="searchForm.dates"
                type="daterange"
                :editable="false"
                @change="changeDate"
                format="yyyy-MM-dd"
                placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="状态:" prop="name">
              <el-select v-model="searchForm.borrowType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="text-align:center;">
            <el-button class="member-list-btn" type="primary" @click="checkList()">查询</el-button>
            <el-button class="member-list-btn" type="danger" :plain="true" @click="reseatData()">重置</el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="billNumber"
          label="借用编号"
          min-width="180" align="center" header-align="center">
          <template scope="scope">
            <qf-slotaccess :code="'btn_borrow_1_2'">
              <a href="#" style="color: #20a0ff" slot="has-right"
                 @click.stop.prevent="gotoMemberDetail(scope.row)">{{scope.row.billNumber}}</a>
              <span slot="no-right">
             {{scope.row.billNumber}}
            </span>
            </qf-slotaccess>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="物品"
          min-width="180" align="center" header-align="center">
          <template scope="scope">
            {{dealData(scope.row, 'goodsName')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="borrowDealer"
          label="受理人"
          min-width="80" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号" min-width="160" align="center" header-align="center">
          <template scope="scope">
            {{dealData(scope.row, 'mobile')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          min-width="180" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="depositAmt"
          label="支付金额"
          min-width="120" align="center" header-align="center">
          <template scope="scope">
            {{dealData(scope.row, 'depositAmt')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="planBackTime"
          label="计划归还时间"
          min-width="180" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="realBackTime"
          label="实际归还时间"
          min-width="180" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="stat"
          label="状态" min-width="120" align="center" header-align="center">
          <template scope="scope">
            {{dealData(scope.row, 'stat')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="memo"
          label="备注"
          min-width="180" align="center" header-align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="180" fixed="right">
          <template scope="scope">
            <qf-access :code="'btn_good_1_3'">
              <el-button type="text" @click="gotoBackMoney(scope.row)" v-if="scope.row.stat!='using'&&scope.row.stat!='backed'&&scope.row.stat!='new'">
                退还押金
              </el-button>
            </qf-access>
            <qf-access :code="'btn_good_1_3'">
              <el-button type="text" @click="gotoCollar(scope.row)" v-if="scope.row.stat!='using'&&scope.row.stat!='backed'&&scope.row.stat!='compensated'">
                领用
              </el-button>
            </qf-access>
            <qf-access :code="'btn_good_1_4'">
              <el-button type="text" @click.native.prevent="gotoBack(scope.row)" v-if="scope.row.stat=='using'&&scope.row.stat!='backed'">
                归还
              </el-button>
            </qf-access>
          </template>
        </el-table-column>
      </el-table>

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
      <div class="bottom-pagination">
        <el-pagination
          @current-change="changePage"
          @size-change="changeSize"
          :current-page="searchForm.page"
          :page-size="searchForm.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, prev, pager, next, sizes, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '租借'
        }, {
          value: '2',
          label: '已领取'
        }, {
          value: '3',
          label: '归还'
        }, {
          value: '4',
          label: '赔偿'
        }],
        value: '',
        searchForm: {
          "beginTime": "",
          "borrowType": '0',
          "endTime": "",
          "goodsCode": "",
          "goodsName": "",
          "mobile": "",
          "page": 1,
          "pageSize": 10,
          "storeId": "",
          dates: []
        },
        tableData: [],
        totalCount: 0,
        form: {
          "borrowDealer": "",
          "borrowId": ""
        },
        backform: {
          "borrowDealer": "",
          "borrowId": ""
        },
        formLabelWidth: '70px',
        dialogFormVisible: false,
        dialogbackVisible: false,
      }
    },
    methods: {
      /*重置事件*/
      reseatData(){
        this.searchForm = {
          "beginTime": "",
          "borrowType": '0',
          "endTime": "",
          "goodsCode": "",
          "goodsName": "",
          "mobile": "",
          "page": 1,
          "pageSize": 10,
          "storeId": "",
          dates: []
        }
      },
      /*查询按钮事件*/
      checkList(){
        this.getList();
      },
      /*列表数据处理*/
      dealData(row, type){
        let val;
        /*物品名称*/
        if (type === 'goodsName') {
          val = row.goodsDtl[0].goodsName
        } else if (type === 'mobile') { //手机号
          val = row.custom.mobile
        } else if (type === 'depositAmt') { //押金
          val = row.goodsDtl[0].depositAmt
        } else if (type === 'stat') { //单据状态
          switch (row.stat) {
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
        }
        return val;
      },
      /*查询列表选择日期处理*/
      changeDate(values) {
        if (values) {
          this.searchForm.beginTime = this.formatDate(values[0]) + ' 00:00:00';
          this.searchForm.endTime = this.formatDate(values[1]) + ' 23:59:59';
        } else {
          this.searchForm.beginTime = '';
          this.searchForm.endTime = '';
        }
      },
      formatDate(value) {
        if (!value) return '';
        let d = new Date(value);
        return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).substr(-2) + '-' +
          ('0' + d.getDate()).substr(-2);
      },
      /*翻页*/
      changePage(newPage) {
        if (this.searchForm.page === newPage) {
          return;
        }
        this.searchForm.page = newPage;
        this.getList();
      },
      /*改变页面条数*/
      changeSize(newSize) {
        this.searchForm.pageSize = newSize;
        this.getList();
      },
      /*跳转详情*/
      gotoMemberDetail(row){
        this.$router.push({
          path: '/borrow/borrowdetail',
          query: {
            id: row.uuid
          }
        })
      },
      /*获取列表*/
      getList(){
        let self = this;
        let searchParams = {};
        Object.assign(searchParams, this.searchForm);
        for (let i in searchParams) {
          /*查询列表数据为空 则不传给后台*/
          if (searchParams[i] === "") {
            delete(searchParams[i]);
          }
        }
        this.$axios({
          url: "/v1/borrow/query",
          method: "POST",
          data: searchParams
        }).then(response => {
          const {data, status,message} = response.data;
          console.log(data)
          if (status == 0) {
            self.tableData = data.item;
            self.totalCount = data.totalCount
          }else{
            this.$message({
              message: message,
              type: 'error'
            })
          }
        }).catch(error => {
          this.searching = false;
          this.$message({
            message: '获取借用列表失败',
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
        this.form.borrowId = row.uuid;
      },
      /*领用*/
      collar(){
        this.$axios({
          url: "/v1/borrow/collar",
          method: "POST",
          data: this.form
        }).then(response => {
          const {data, status,message} = response.data;
          console.log(data)
          if (status == 0) {
            this.dialogFormVisible = false;
            this.getList();
          }else{
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
        this.backform.borrowId = row.uuid;
      },
      /*归还*/
      toBack(){
        this.$axios({
          url: "/v1/borrow/back",
          method: "POST",
          data: this.backform
        }).then(response => {
          const {data, status,message} = response.data;
          console.log(data)
          if (status == 0) {
            this.dialogbackVisible = false;
            this.getList();
          }else{
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

      }
    },
    mounted() {
      /*页面加载进来初始事件*/
      this.getList();
    }
  }
</script>
