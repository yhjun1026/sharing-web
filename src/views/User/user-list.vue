/**
* 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
* 项目名：sharing-web
* 文件名：user-list
* 模块说明：
* 修改历史：
* 2018/5/3 - lihuiming - 创建
*/
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="">
        <el-breadcrumb-item normal>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-wrap">
      <el-row type="flex" justify="end">
        <el-button class="largeBtn" @click="gotoNew">
          新增用户
        </el-button>
      </el-row>
      <div class="search-box">
        <div class="searchBox">
          <el-form :inline="true" ref="searchForm" :rules="rules" :data="searchForm" :model="searchForm"
                   label-width="80px">
            <el-form-item label="用户代码:" prop="code">
              <el-input v-model="searchForm.code" placeholder="请输入物品编号" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="searchForm.name" placeholder="请输入物品名称" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="手机号码:" prop="name">
              <el-input v-model="searchForm.name" placeholder="请输入手机号码" style="width:220px;"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="类型:" prop="name">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态:" prop="name">
              <el-select v-model="value" placeholder="请选择">
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
            <el-button class="member-list-btn" type="primary" @click="">查询</el-button>
            <el-button class="member-list-btn" type="danger" :plain="true" @click="">重置</el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          min-width="90" label="" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="code"
          label="用户代码"
          min-width="180" align="center" header-align="center">
          <template scope="scope">
            <a href="#" style="color: #20a0ff"
               @click.stop.prevent="gotoMemberDetail()">{{scope.row.code}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          min-width="80" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号" min-width="160" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="userType"
          label="类型"
          min-width="180" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态" min-width="120" align="center" header-align="center">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          min-width="180" align="center" header-align="center">
        </el-table-column>
      </el-table>
      <div class="bottom-pagination">
        <el-pagination
          @current-change="changePage"
          @size-change="changeSize"
          :current-page="searchForm.pageIndex"
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
          code: 'wanghu',
          name: '王虎',
          phone: '15623568956',
          userType: '营业员',
          state: '使用中',
          remark: '超时'
        }, {
          code: 'wanghu',
          name: '王虎',
          phone: '15623568956',
          userType: '营业员',
          state: '使用中',
          remark: '超时'
        }, {
          code: 'wanghu',
          name: '王虎',
          phone: '15623568956',
          userType: '营业员',
          state: '使用中',
          remark: '超时'
        }, {
          code: 'wanghu',
          name: '王虎',
          phone: '15623568956',
          userType: '营业员',
          state: '使用中',
          remark: '超时'
        }],
        totalCount: 0,
      }
    },
    methods: {
      gotoMemberDetail(){
        this.$router.push({
          path: '/user/userdetail',
        })
      },
      gotoNew(){
        this.$router.push({
          path: '/user/usernew',
        })
      }
    }
  }
</script>
