/**
* 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
* 项目名：sharing-web
* 文件名：user-detail
* 模块说明：
* 修改历史：
* 2018/5/3 - lihuiming - 创建
*/
<template>
  <div class="user-detail">
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
                  {{detail.code}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类型：">
                  {{detail.type === 'admin' ? '管理员' : '营业员'}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称：">
                  {{detail.name}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码：">
                  ******
                  <qf-access :code="'btn_user_1_3'">
                    <el-button type="text" @click="resetPassword">&nbsp;修改</el-button>
                  </qf-access>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="手机号：">
                  {{detail.mobile}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：">
                  {{detail.stat == 0 ? '停用' : '启用'}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注：">
              {{detail.memo}}
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <div style="margin-bottom: 15px">
            <qf-access :code="'btn_user_1_2'">
              <el-button type="primary" @click="update()">修改</el-button>
            </qf-access>
          </div>
          <!--<div>
            <el-button type="primary" @click="onSubmit">权限设置</el-button>
          </div>-->
        </el-col>
      </el-row>
      <el-row class="user-view-row">
        <el-col :span="24">
          <div style="border-top: 1px solid #DFE6EC"></div>
        </el-col>
      </el-row>

      <!--<el-row class="user-view-row" :gutter="24">
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
      </el-row>-->
      <el-dialog title="密码修改" :visible.sync="dialogFormVisible" width="400px">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="原密码：" :label-width="formLabelWidth" prop="oldPassword">
            <el-input v-model="form.oldPassword" auto-complete="off" style="width: 75%"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" :label-width="formLabelWidth" prop="newPassword">
            <el-input v-model="form.newPassword" auto-complete="off" style="width: 75%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updatePassword('form')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          newPassword: '',
          oldPassword: '',
          userCode: ''
        },
        detail: {},
        rules: {
          newPassword: [
            {required: true, message: '请输入新密码', trigger: 'change,blur'}
          ],
          oldPassword: [
            {required: true, message: '请输入原密码', trigger: 'change,blur'}
          ]
        },
        dialogFormVisible: false,
        formLabelWidth: '120'
      }
    },
    methods: {
      update() {
        this.$router.push({
          path: '/user/usernew',
          query: {
            id: this.detail.uuid
          }
        })
      },
      getDetail(id){
        this.$axios({
          url: `/user/get/${id}`,
          method: "GET"
        }).then(res => {
          const {data, status} = res.data;
          if (status == 0) {
            this.detail = data;
          }
        }).catch(error => {
          this.$message({
            message: '获取用户明细失败',
            type: 'error'
          })
        });
      },
      resetPassword(){
        this.form = {
          newPassword: '',
          oldPassword: '',
          userCode: ''
        };
        this.dialogFormVisible = true;
      },
      updatePassword(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(localStorage.getItem('userCode'))
            this.form.userCode = localStorage.getItem('userCode');
            this.$axios({
              url: `/user/update/password`,
              method: "POST",
              data: this.form
            }).then(res => {
              const {data, status} = res.data;
              if (status == 0) {
                this.dialogFormVisible = false;
              }
            }).catch(error => {
              this.$message({
                message: '修改密码失败',
                type: 'error'
              })
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    mounted() {
      this.getDetail(this.$route.query.id);
    }
  }
</script>
<style lang="less">
  .user-detail {
    .el-form-item__error {
      left: 76px;
    }
    .el-dialog__footer {
      padding: 0 0;
    }
  }

</style>
