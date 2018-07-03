<template>
  <div class="operation">
    <div class="operator">
      <template v-if="isEqual">
        =
      </template>
      <template v-else>
        <div v-if="!showSelect" class="pointer operator-selected" @click="showSelect = !showSelect">
          {{currentOperation}}
        </div>
        <div v-else class="pointer change-operator" @click="showSelect = !showSelect">
          <div class="op plus" @click="updateOperation('+')">+</div>
          <div class="op minus" @click="updateOperation('-')">-</div>
          <div class="op mult" @click="updateOperation('*')">*</div>
          <div class="op divide" @click="updateOperation('/')">/</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'operation',
    data() {
      return {
        msg: 'Арифметический оператор',
        showSelect: false,
        currentOperation: '+'
      }
    },
    computed: {
      isEqual: function () {
        return this.type === '='
      }
    },
    props: ['type', 'id'],
    mounted(){
      /*console.log('src: ' + this.currentOperation);
      console.log('new: ' + this.type);
      this.currentOperation = this.type*/
    },
    methods: {
      updateOperation(op) {
        if (this.currentOperation === op) return;
        this.currentOperation = op;
        this.$emit('changeOperation',{id: this.id, newOp: op});
      }
    }
  }
</script>

<style scoped>
  .operation {
    font-size: larger;
    width: 50px;
    height: 100px;
    /*    background-color: #800204;*/
    display: inline-block;
    margin: 10px;
    position: relative;
  }

  .operator {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 25px;
    line-height: 50px;
    font-size: 30pt;
  }

  .operator-selected {
    /*    background-color: gray;*/
    width: 50px;
    height: 50px;
    border: 2px solid black;
    border-radius: 5px;
  }

  .change-operator {
    width: 80px;
    height: 80px;
    /*    background-color: yellow;*/
    margin-left: -15px;
    margin-top: -15px;
    position: absolute;
  }

  .pointer {
    cursor: pointer;
  }

  .op {
    width: 35px;
    height: 35px;
    position: absolute;
    line-height: 35px;
    border-radius: 5px;
    border: 2px solid black;
  }

  .plus {
    right: 0;
    top: 0
  }

  .minus {
    right: 0;
    bottom: 0
  }

  .mult {
    left: 0;
    top: 0;
  }

  .divide {
    left: 0;
    bottom: 0;
  }
</style>
