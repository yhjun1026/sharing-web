<template>
  <div v-title="'物品列表'" class="deal-account-page ffan-style">
    <div class="crumbs">
      <el-breadcrumb separator="">
        <el-breadcrumb-item>物品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-wrap">
      <el-row type="flex" justify="end">
        <qf-access :code="'btn_good_1_1'">
          <el-button class="largeBtn" @click="gotoNew">
            新增物品
          </el-button>
        </qf-access>
      </el-row>
      <div class="search-box">
        <div class="searchBox">
          <el-form :inline="true" ref="searchForm" :data="searchForm" :model="searchForm"
                   label-width="80px">
            <el-form-item label="物品编号:" prop="code">
              <el-input v-model="searchForm.code" placeholder="请输入物品编号" style="width:220px;"></el-input>
            </el-form-item>
            <el-form-item label="物品名称:" prop="name">
              <el-input v-model="searchForm.name" placeholder="请输入物品名称" style="width:220px;"></el-input>
            </el-form-item>
            <!--<el-form-item label="创建时间:" prop="date">
              <el-date-picker
                v-model="searchForm.date"
                type="daterange"
                :editable="false"
                @change="changeDate"
                format="yyyy-MM-dd"
                placeholder="选择日期范围">
              </el-date-picker>
            </el-form-item>-->
          </el-form>
          <div style="text-align:center;">
            <el-button class="member-list-btn" type="primary" @click="checkAndSearch()">查询</el-button>
            <el-button class="member-list-btn" type="danger" :plain="true" @click="resetForm">重置</el-button>
          </div>
        </div>
      </div>
      <el-table :data="giftList" stripe style="width: 100%">
        <el-table-column prop="code" label="物品编号" width="180" align="center">
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
        <!--<el-table-column prop="code" label="物品编号" min-width="180" align="center">
          <template scope="scope">{{scope.row.code}}</template>
        </el-table-column>-->
        <el-table-column prop="name" label="物品名称" width="180" align="center"></el-table-column>
        <!--<el-table-column prop="createTime" label="创建时间" align="center" width="180">
          <template scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>-->
        <el-table-column prop="currentQuantity" label="剩余库存" width="180" align="center">
        </el-table-column>
        <el-table-column prop="costPrice" label="成本价格" width="180" align="center">
        </el-table-column>
        <el-table-column prop="price" label="单价（赔偿价格）" width="180" align="center">
        </el-table-column>
        <el-table-column prop="rentPrice" label="租用价格" width="180" align="center">
        </el-table-column>
        <el-table-column prop="repayamt" label="租用价格" width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="180" fixed="right">
          <template scope="scope">
            <qf-access :code="'btn_good_1_3'">
              <el-button type="text" @click="gotoUpdate(scope.row)">
                修改
              </el-button>
            </qf-access>
            <qf-access :code="'btn_good_1_4'">
              <el-button type="text" @click.native.prevent="gotoDel( scope,giftList)">
                删除
              </el-button>
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
    components: {},
    data()  {
      return {
        searchForm: {
          "code": "",
          "name": "",
          "page": 1,
          "pageSize": 10,
          "storeId": "",
          date: []
        },
        totalCount: 0,
        searching: false,
        giftList: [],
      }
    },
    methods: {
      gotoUpdate(row){
        this.$router.push({
          path: 'article-new',
          query: {
            id: row.uuid,
          }
        })
      },
      gotoNew(){
        this.$router.push({
          path: 'article-new'
        })
      },
      gotoDetail(row){
        this.$router.push({
          path: 'article-detail',
          query: {
            id: row.uuid
          }
        })
      },
      gotoDel(scope, giftList){
        this.$confirm('是否确认删除该信息', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '再想想',
          customClass: 'member-confirm-class',
        }).then(() => {
          this.sendDelApi(scope.row.uuid, (res) => {
            if (res.data) {
              giftList.splice(scope.$index, 1);
              this.totalCount--;
            }
            this.$message(res);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      sendDelApi(id, callback){
        this.axios.get(`/sail/gifts/${id}/deleteById`)
          .then((res) => {
            if (res.status === "0000" && res.data === true) {
              callback({
                type: "success",
                data: res.data,
                message: '删除成功!'
              });
            } else {
              callback({
                type: "error",
                message: res.message
              })
            }
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
      changeDate(date) {
        const values = date.split(' - ');
        this.searchForm.minTime = +new Date(values[0] + " 00:00:00");
        this.searchForm.maxTime = +new Date(values[1] + " 24:00:00");
      },
      resetForm(){
        this.searchForm = {
          "code": "",
          "name": "",
          "page": 1,
          "pageSize": 10,
          "storeId": "",
          date: []
        }
      },
      checkAndSearch(){
        this.searchForm.pageIndex = 0;
        this.getList();
      },
      getList() {
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
          url: "/v1/goods/get/rent/all",
          method: "POST",
          data: searchParams
        }).then(response => {
          const {status, message, data} = response.data;
          if (status == '0') {
            if (data.item && data.item.length > 0) {
              self.giftList = data.item;
              self.totalCount = data.totalCount;
            }
          } else {
            self.$message.error(message);
          }
          self.searching = false;
        }).catch(error => {
          this.searching = false;
        });
      },
    },
    mounted() {
      this.getList();
    }
  }
</script>
<style lang="less">
  .deal-account-page {
    .el-cascader--small .el-cascader__label {
      line-height: 36px;
    }
  }
</style>
