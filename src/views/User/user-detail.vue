/**
* 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
* 项目名：sharing-web
* 文件名：user-detail
* 模块说明：
* 修改历史：
* 2018/5/3 - lihuiming - 创建
*/
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="">
        <el-breadcrumb-item normal>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content-wrap">
      <el-row>
        <el-col :span="18">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="代码：">
                  李虎
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类型：">
                  营业员
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称：">
                  李虎
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码：">
                  ****
                  <el-button type="text" @click="resetPassword">&nbsp;重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号：">
                  15623568956
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：">
                  启用
                  <el-button @click="disabledOperation" type="text">&nbsp;停用</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注">
              就很大方几点回家费很多时间后返回
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <div style="margin-bottom: 15px">
            <el-button type="primary" @click="onSubmit">修改</el-button>
          </div>
          <div>
            <el-button type="primary" @click="onSubmit">权限设置</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="user-view-row">
        <el-col :span="24">
          <div style="border-top: 1px solid #DFE6EC"></div>
        </el-col>
      </el-row>

      <el-row class="user-view-row" :gutter="24">
        <el-col :span="6" class="user-view-row-col">
          <span>创建人：</span>
          <span class="user-view-text" title="小李">小李</span>
        </el-col>
        <el-col :span="6" class="user-view-row-col">
          <span>最后修改人：</span>
          <span class="user-view-text" title="小李">小李</span>
        </el-col>
        <el-col :span="12" class="user-view-row-col">
          <span>最后修改时间：</span>
          <span class="user-view-text" title="2018-01-01">2018-01-01</span>
        </el-col>
      </el-row>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
