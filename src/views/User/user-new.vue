/**
* 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
* 项目名：sharing-web
* 文件名：user-new
* 模块说明：
* 修改历史：
* 2018/5/3 - lihuiming - 创建
*/
<template>
  <div v-title="'用户管理'" class="new-gift-box ffan-style">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span v-if="isEdit">用户修改</span>
        <span v-if="!isEdit">用户新增</span>
      </div>
      <div class="content-wrap">
        <el-form :inline="true" ref="user" :model="user" :rules="rules" style="padding-left:20px">
          <div>
            <el-form-item label="用户编码:" prop="code">
              <el-input v-model="user.code" :disabled="isEdit" placeholder="用户编码" style="width:211px;"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="用户名称:" prop="name">
              <el-input type="textarea" resize="none" :rows="2" placeholder="请输入用户名称"
                        v-model="user.name"
                        style="width:460px;"></el-input>
              <div style="z-index: 100;margin-left: 90%;margin-top: -35px;color:  #e6e6e6">{{edit}}</div>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="用户类型:" prop="type">
              <el-select v-model="user.type" placeholder="请选择用户类型">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="营业员" value="employ"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="联系方式:" prop="mobile">
              <el-input v-model="user.mobile" placeholder="联系方式" style="width:211px;"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="状态:" prop="stat" :required="true">
              <el-radio-group v-model="user.stat">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-if="!isEdit">
            <el-form-item label="密码:" prop="password">
              <el-input type="password" v-model="user.password" placeholder="密码" style="width:211px;"></el-input>
              (初始密码88888888)
            </el-form-item>
          </div>
          <div>
            <el-form-item label="备注：" prop="memo">
              <el-input size="small" style="width:500px;" type="textarea" v-model="user.memo" :rows="4"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div slot="my-dialog-footer" style="text-align:center;">
          <el-button type="primary" @click="submit('user')" v-if="!isEdit">保存</el-button>
          <el-button type="primary" @click="update('user')" v-if="isEdit">修改</el-button>
          <el-button @click="cancel('user')">取 消</el-button>
        </div>
      </div>
    </el-card>

  </div>
</template>
<script>
  export default {
    name: "articles",
    data(){
      let checkRemark = (rule, value, callback) => {
        this.edit = value.length + '/100';
        if (value.length >= 101) {
          callback(new Error('请输入100字以内的名称'));
        } else {
          callback();
        }
      };
      return {
        user: {
          "code": "",
          "groupUuid": "",
          "memo": "",
          "mobile": "",
          "name": "",
          "password": "88888888",
          "stat": '1',
          "storeuuid": "",
          "type": "",
          "uuid": ""
        },
        edit: "0/100",
        rules: {
          code: [
            {
              required: true,
              message: '请输入用户编码', trigger: 'change,blur'
            }
          ],
          name: [
            {required: true, message: '请输入用户名称', trigger: 'blur'},
            {validator: checkRemark, trigger: 'change,blur'}
          ],
          mobile: [
            {required: true, max: 11, message: "请输入手机号", trigger: "change"},
            {max: 11, message: "请输入正确手机号格式", trigger: "change"},
            {validator: this.phoneValidator, trigger: "change"}
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'change,blur'
            }
          ],
          type: [
            {
              required: true,
              message: '请选择用户类型',
              trigger: 'change'
            }
          ]
        },
        square: [],
        //判断是编辑还是新建
        isEdit: false,
        changed: 0,
        pointClass: "point-el"
      }
    },
    methods: {
      phoneValidator(rule, value, callback){
        let regex = /^1(3|4|5|7|8)\d{9}$/
        if (value == '' || null) {
          callback();
        } else if (value != ('' || null) && !regex.test(value)) {
          callback(new Error("请输入正确手机号格式"));
        } else {
          callback();
        }
      },
      submit(searchForm){
        this.$refs[searchForm].validate((vaild) => {
          if (vaild) {
            this.save('add');
          } else {
            return false;
          }
        });
      },
      update(searchForm){
        this.$refs[searchForm].validate((vaild) => {
          if (vaild) {
            this.save('update');
          } else {
            return false;
          }
        });
      },
      save(type){
        let fetchUrl = "";
        if (type === 'add') {
          fetchUrl = "/user/add";
        } else {
          fetchUrl = "/user/update";
        }
        this.$axios({
          url: fetchUrl,
          method: "POST",
          data: this.user
        }).then((res) => {
          const {data, message, status} = res.data;
          console.log(res)
          if (status == "0") {
            this.changed = 1;
            this.$router.push({
              path: '/user/userlist'
            })
          } else {
            this.$message.error(message)
          }
        });
      },
      cancel(){
        this.$router.push({
          path: '/user/userlist'
        })
      },
      getData(id){
        this.$axios({
          url: `/user/get/${id}`,
          method: "GET"
        }).then(res => {
          const {data, status} = res.data;
          if (status == 0) {
            this.user = data;
            this.user.stat = this.user.stat.toString();
          }
        }).catch(error => {
          this.$message({
            message: '获取用户明细失败',
            type: 'error'
          })
        });
      }
    },
    mounted(){
      if (this.$route.query.id) {
        this.isEdit = true
      }
      this.getData(this.$route.query.id);
    },
    beforeRouteLeave(to, from, next) {
      // 判断是否是退出登录
      if (to.path != '/') {
        if (this.changed <= 0) {
          this.$confirm('离开该页面后您编辑的所有数据将丢失，确定离开吗?', '提示', {
            confirmButtonText: '去意已决',
            cancelButtonText: '再想想',
            customClass: 'member-confirm-class',
          }).then(() => {
            // 离开当前页面
            next();
          }).catch((error) => {
            // 留在当前页面
            next(false);
          });
        } else {
          next()
        }
      } else {
        next()
      }
    }
  };
</script>
<style lang="less">
  .new-gift-box {
    .grid-content {
      width: 150px;
      height: 100px;
      border: 1px solid #e6e6e6;
      position: relative;
    }
    .el-form-item__label {
      position: relative;
      width: 90px;
    }
    .el-form-item__label:before {
      position: absolute;
      left: -2px;
    }
    .left-label {
      margin-left: 1.5em;
    }
    .readonly-item {
      display: block;
      //padding-left: 10px;
    }
    .grid-right p {
      width: 170px;
      line-height: 25px;
    }
    .grid-content .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -7px;
      margin-top: -7px;
    }
    .yuan {
      position: absolute;
      top: 0;
      left: 213px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #20a0ff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .point-el {
      .el-form-item__error {
        left: 100px;
        width: 200px;
        display: none;
      }
      &.point-el-vali .el-form-item__error {
        display: block;
      }
      .el-input__inner {
        border-color: #bfcbd9;
      }
      &.point-el-vali.is-error .el-input__inner {
        border-color: #ff4949;
      }
    }

  }

  .new-gift-confirmButtonClass {
    float: left;
    margin-left: 120px !important;
  }

  .new-gift-cancelButtonClass {
    margin-right: 90px;
    /* color: #fff;
     background-color: #20a0ff;
     border-color: #20a0ff;*/
  }
</style>

