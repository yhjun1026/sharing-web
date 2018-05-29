/**
* 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
* 项目名：sharing-web
* 文件名：user-list
* 模块说明：
* 修改历史：
* 2018/5/3 - lihuiming - 创建
*/
<template>
  <div class="user-list" v-title="'用户管理'">
    <div class="crumbs">
      <el-breadcrumb separator="">
        <el-breadcrumb-item normal>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-wrap">
      <el-row type="flex" justify="end">
        <qf-access :code="'btn_user_1_1'">
          <el-button class="largeBtn" @click="gotoNew">
            新增用户
          </el-button>
        </qf-access>
      </el-row>
      <div class="search-box">
        <div class="searchBox">
          <el-form :inline="true" ref="searchForm" :data="searchForm" :model="searchForm"
                   label-width="80px">
            <el-form-item label="用户代码:" prop="code">
              <el-input v-model="searchForm.userCode" placeholder="请输入物品编号" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="searchForm.userName" placeholder="请输入物品名称" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:" prop="name">
              <el-input v-model="searchForm.mobile" placeholder="请输入手机号码" style="width:220px;"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="类型:" prop="name">
              <el-select v-model="searchForm.userType" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态:" prop="name">
              <el-select v-model="searchForm.stat" placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div style="text-align:center;">
            <el-button class="member-list-btn" type="primary" @click="search()">查询</el-button>
            <el-button class="member-list-btn" type="danger" :plain="true" @click="reseatData()">重置</el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <!--   <el-table-column
             type="index"
             min-width="90" label="" align="center" header-align="center">
           </el-table-column>-->
        <el-table-column
          prop="code"
          label="用户代码"
          min-width="100" align="center" header-align="center">
          <template scope="scope">
            <qf-slotaccess :code="'btn_borrow_1_2'">
              <a href="#" style="color: #20a0ff" slot="has-right"
                 @click.stop.prevent="gotoDetail(scope.row)">{{scope.row.code}}</a>
              <span slot="no-right">
             {{scope.row.code}}
            </span>
            </qf-slotaccess>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          min-width="80" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号" min-width="160" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          min-width="180" align="center" header-align="center">
          <template scope="scope">
            {{scope.row.type === 'admin' ? '管理员' : '营业员'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="stat"
          label="状态" min-width="120" align="center" header-align="center">
          <template scope="scope">
            {{scope.row.stat == 0 ? '停用' : '启用'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="memo"
          label="备注"
          min-width="120" align="center" header-align="center">
          <template scope="scope">
            <div :title="scope.row.memo" class="table-long-hidden">{{scope.row.memo}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <qf-access :code="'btn_user_1_2'">
              <el-button @click="update(scope.row)" type="text" size="small">修改</el-button>
            </qf-access>
          </template>
        </el-table-column>
      </el-table>
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
          value: 'admin',
          label: '管理员'
        }, {
          value: 'employ',
          label: '营业员'
        }],
        options1: [{
          value: '0',
          label: '停用'
        }, {
          value: '1',
          label: '启用'
        }],
        value: '',
        searchForm: {
          "mobile": "",
          "page": 1,
          "pageSize": 10,
          "stat": '',
          "storeId": "",
          "userCode": "",
          "userName": "",
          "userType": ""
        },
        tableData: [],
        totalCount: 0,
      }
    },
    methods: {
      update(row) {
        this.$router.push({
          path: '/user/usernew',
          query: {
            id: row.uuid
          }
        })
      },
      /*重置事件*/
      reseatData(){
        this.searchForm = {
          "mobile": "",
          "page": 1,
          "pageSize": 10,
          "stat": '',
          "storeId": "",
          "userCode": "",
          "userName": "",
          "userType": ""
        }
      },
      search(){
        this.getList();
      },
      gotoDetail(row){
        this.$router.push({
          path: '/user/userdetail',
          query: {
            id: row.uuid
          }
        })
      },
      gotoNew(){
        this.$router.push({
          path: '/user/usernew',
        })
      },
      changeSize(newSize) {
        this.searchForm.pageSize = newSize;
        this.getList();
      },
      changePage(newPage) {
        if (this.searchForm.page === newPage) {
          return;
        }
        this.searchForm.page = newPage;
        this.getList();
      },
      getList(){
        let self = this;
        this.searching = true;
        let searchParams = {};
        Object.assign(searchParams, this.searchForm);
        for (let i in searchParams) {
          if (searchParams[i] === "") {
            delete(searchParams[i]);
          }
        }
        this.$axios({
          url: "/user/query",
          method: "POST",
          data: searchParams
        }).then(response => {
          const {status, message, data} = response.data;
          if (status == '0') {
            if (data.item && data.item.length > 0) {
              self.tableData = data.item;
              self.totalCount = data.totalCount;
            }
          } else {
            self.$message.error(message);
          }
          self.searching = false;
        }).catch(error => {
          this.searching = false;
        });
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>
<style lang="less">
  .user-list {
    .table-long-hidden {
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
