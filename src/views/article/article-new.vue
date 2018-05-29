<template>
  <div v-title="'物品管理'" class="new-gift-box ffan-style">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-edit"></i>&nbsp;&nbsp;
        <span v-if="isEdit">物品修改</span>
        <span v-if="!isEdit">物品新增</span>
      </div>
      <div class="content-wrap">
        <el-form :inline="true" ref="sGoods" :model="sGoods" :rules="rules" style="padding-left:20px">
          <div>
            <el-form-item label="物品编码:" prop="code">
              <el-input v-model="sGoods.code" :disabled="isEdit" placeholder="物品编码" style="width:211px;"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="物品名称:" prop="name">
              <el-input type="textarea" resize="none" :rows="2" placeholder="请输入物品名称"
                        v-model="sGoods.name"
                        style="width:460px;"></el-input>
              <div style="z-index: 100;margin-left: 90%;margin-top: -35px;color:  #e6e6e6">{{edit}}</div>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="总库存:" prop="quantity">
              <el-input v-model="sGoods.quantity" placeholder="总库存" style="width:211px;"></el-input>
            </el-form-item>
            <el-form-item label="剩余库存:" prop="currentQuantity" style="margin-left: 10px">
              <el-input v-model="sGoods.currentQuantity" placeholder="剩余库存" style="width:211px;"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="单价:" prop="price">
              <el-input v-model="sGoods.price" placeholder="单价" style="width:211px;"></el-input>
              <span class="yuan">元</span>
            </el-form-item>
            <el-form-item label="成本价格:" prop="costPrice" style="margin-left: 10px">
              <el-input v-model="sGoods.costPrice" placeholder="成本价格" style="width:211px;"></el-input>
              <span class="yuan">元</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="押金金额:" prop="depositamt">
              <el-input v-model="sGoods.depositamt" placeholder="单价" style="width:211px;"></el-input>
              <span class="yuan">元</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="赔偿金额:" prop="costPrice">
              <el-input v-model="sGoods.repayamt" placeholder="赔偿金额" style="width:211px;"></el-input>
              <span class="yuan">元</span>
            </el-form-item>
            <el-form-item label="租用价格:" prop="rentPrice" style="margin-left: 10px">
              <el-input v-model="sGoods.rentPrice" placeholder="租用价格" style="width:211px;"></el-input>
              <span class="yuan">元</span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="物品图片:" prop="picture">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-upload
                    class="avatar-uploader"
                    action="/sharing/api/v1/file/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-model="sGoods.picture" v-if="sGoods.picture" :src="sGoods.picture"
                         class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>

                </el-col>
                <el-col :span="12">
                  <div class="grid-right">
                    <p>上传须知：</p>
                    <p>1.格式：JPG、JPEG、PNG</p>
                    <p>2.图片大小：不超过5M</p>
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
        </el-form>
        <div slot="my-dialog-footer" style="text-align:center;">
          <el-button type="primary" @click="submit('sGoods')" v-if="!isEdit">保存</el-button>
          <el-button type="primary" @click="update('sGoods')" v-if="isEdit">修改</el-button>
          <el-button @click="cancel('sGoods')">取 消</el-button>
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
        sGoods: {
          "code": "",
          "costPrice": '',
          "currentQuantity": '',
          "depositamt": '',
          "description": "",
          "laster": "",
          "memo": "",
          "name": "",
          "picture": "",
          "price": '',
          "quantity": '',
          "rentPrice": '',
          "repayamt": '',
          "state": '0',
          "storeUuid": "",
          "type": "",
          "uuid": ""
        },
        changed: 0,
        type: '',
        orgCodeSquare: false,
        squareName: "",
        checkList: ['', ''],
        checked: true,
        defaultData: {
          //quantity: 0,
          currentQuantity: 0
        },
        unit: [],
        searchForm: {
          quantity: 0,
          //总库存
          currentQuantity: 0,
          //当前库存
          orgCode: "",
          //广场编号
          code: '',
          //物品代码
          name: '',
          //物品名字
          price: 0,
          //物品价格
          costPrice: 0,
          //成本价格
          rentPrice: 0,
          //租用价格
          unit: '',
          //规格
          picture: '',
          //物品图片
          plazaName: '',
          //广场名字
          remark: ''
          //字数限制
        },
        edit: "0/100",
        inputDisabled: true,
        rules: {
          code: [
            {
              required: true,
              message: '请输入物品编码', trigger: 'change,blur'
            }
          ],
          quantity: [
            {required: true, message: '请输入总库存'},
            {pattern: /^(?:0|[1-9]{1}\d{0,5})$/, message: '请输入1~999999之间的整数'}
          ],
          currentQuantity: [
            {required: true, message: '请输入剩余库存'},
            {pattern: /^(?:0|[1-9]{1}\d{0,5})$/, message: '请输入1~999999之间的整数'}
          ],
          name: [
            {required: true, message: '请输入物品名称', trigger: 'blur'},
            {validator: checkRemark, trigger: 'change,blur'}
          ],
          unit: [
            {
              required: true,
              message: '请选择规格', trigger: 'change'
            }
          ],
          price: [
            {
              required: true,
              pattern: /^(?:0|[1-9]{1}\d{0,5})(\.\d{0,2})?$/,
              message: '请输入0~999999之间的数值',
              trigger: 'change,blur'
            }
          ],
          depositamt: [
            {
              required: true,
              pattern: /^(?:0|[1-9]{1}\d{0,5})(\.\d{0,2})?$/,
              message: '请输入0~999999之间的数值',
              trigger: 'change,blur'
            }
          ],
          costPrice: [
            {
              required: true,
              pattern: /^(?:0|[1-9]{1}\d{0,5})(\.\d{0,2})?$/,
              message: '请输入0~999999之间的数值',
              trigger: 'change,blur'
            }
          ],
          rentPrice: [
            {
              required: true,
              pattern: /^(?:0|[1-9]{1}\d{0,5})(\.\d{0,2})?$/,
              message: '请输入0~999999之间的数值',
              trigger: 'change,blur'
            }
          ]
        },
        square: [],
        //判断是编辑还是新建
        isEdit: false,
        pointClass: "point-el"
      }
    },
    methods: {
      submit(searchForm){
        this.$refs[searchForm].validate((vaild) => {
          if (vaild) {
            this.save();
          } else {
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        this.sGoods.picture = 'http://www.xuemeiwanan.com/sharing/api/v1/file/'+res.data.fileId+'/';
        console.log(this.searchForm.picture)
      },
      beforeAvatarUpload(file) {
        const isPic = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isPic) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isPic && isLt5M;
      },
      save(){
        let fetchUrl = "/v1/goods/add";
        this.$axios({
          url: fetchUrl,
          method: "POST",
          data: this.sGoods
        }).then((res) => {
          const {data, message, status} = res.data;
          console.log(res)
          if (status == "0") {
            this.changed = 1;
            this.$router.push({
              path: 'article-list'
            })
          } else {
            this.$message.error(message)
          }
        });
      },
      update(searchForm){
        this.$refs[searchForm].validate((vaild) => {
          if (vaild) {
            let fetchUrl = "/v1/goods/update";
            this.$axios({
              url: fetchUrl,
              method: "POST",
              data: this.sGoods
            }).then((res) => {
              const {data, message, status} = res.data;
              console.log(res)
              if (status == "0") {
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                });
                this.changed = 1;
                this.$router.push({
                  path: 'article-list'
                })
              } else {
                this.$message.error(message)
              }
            });
          } else {
            return false;
          }
        });
      },
      cancel(){
        this.$router.push({
          path: 'article-list'
        })
      },
      search(){
        const id = this.$route.query.id;
        this.$axios({
          url: `/v1/goods/get/${id}`,
          method: "GET"
        }).then(response => {
          const {data, status} = response.data;
          if (status === 0) {
            this.sGoods = data;
          }
        }).catch(error => {
          this.$message({
            message: '获取物品明细失败',
            type: 'error'
          })
        });
      },
    },
    mounted(){
      if (this.$route.query.id) {
        this.isEdit = true;
        this.search();
      }
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

