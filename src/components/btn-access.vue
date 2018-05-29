<template>
  <div v-if="showBtn">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
  div{
    margin: 0;
    padding: 0;
    display: inline;
  }
</style>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'btnAccess',
    props: {
        code: {
            default: ''
        },
    },
    data: function() {
        return {
            showBtn: false
        }
    },
    computed: {
    },
    methods: {
      setOperation() {
        if(!this.operations || !this.operations.length) return;
        for(let i = 0; i < this.operations.length; i++) {
          if(this.code === this.operations[i]) {
            this.showBtn = true;
            return;
          }
        }
      }
    },
    mounted() {
      this.operations = JSON.parse(localStorage.getItem('operations'))
      this.setOperation();
    },
    watch: {
      code: function(val, oldVal) {
        if(!this.operations || !this.operations.length) return;
        this.showBtn = false;
        for(let i = 0; i < this.operations.length; i++){
          if(val === this.operations[i]){
            this.showBtn = true;
            return;
          }
        }
      },
      operations: function() {
        this.showBtn = false;
        this.setOperation();
      }
    }
}
</script>
