<!--多个权限或关系
<qf-slotaccess :code="'btn_memberexpand_1_5_5_2,btn_memberexpand_1_5_5_3'">
    <el-xxx slot="has-right">
      有权限
      ...
    </el-xxx>
    <el-xxx slot="no-right">
      无权限
      ...
    </el-xxx>
</qf-slotaccess>
-->
<template>
  <div v-if="hasRight">
    <slot name="has-right"></slot>
  </div>
  <div v-else>
    <slot name="no-right"></slot>
  </div>
</template>
<style lang="less" scoped>
  div {
    margin: 0;
    padding: 0;
    display: inline;
  }
</style>
<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'slotAccess',
    props: {
      code: {
        default: ''
      },
    },
    data: function () {
      return {
        hasRight: false,
        operations: []
      }
    },
    computed: {
    },
    methods: {
      setOperation() {
        let _code = [];
        if (this.code.indexOf(',') >= 0) {
          _code = this.code.split(',');
        } else {
          _code[0] = this.code;
        }

        if (!this.operations || !this.operations.length) return;
        for (let i = 0; i < this.operations.length; i++) {
          for (let j = 0; j < _code.length; j++) {
            if (_code[j] == this.operations[i]) {
              this.hasRight = true;
              return;
            }
          }
        }
      }
    },
    mounted() {
      this.operations = JSON.parse(localStorage.getItem('operations'));
      this.setOperation();
    },
    watch: {
      code: function (val, oldVal) {
        if (!this.operations || !this.operations.length) return;
        this.hasRight = false;

        let _code = [];
        if (val.indexOf(',') >= 0) {
          _code = val.split(',');
        } else {
          _code[0] = val;
        }
        for (let i = 0; i < this.operations.length; i++) {
          for (let j = 0; j < _code.length; j++) {
            if (_code[j] === this.operations[i]) {
              this.hasRight = true;
              return;
            }
          }
        }
      },
      operations: function () {
        this.hasRight = false;
        this.setOperation();
      }
    }
  }
</script>
