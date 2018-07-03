<template>
  <div>
    <div class="title">
      {{title}}
    </div>
    <div class="fractions-list">
      <template v-for="(item, index) in fullInputString">
        <template v-if="item.type === 'operand'">
          <fraction
            :id="index"
            :isResult="item.isResult"
            :numenator="item.numenator"
            :denomenator="item.denomenator"
            @fraction-change="onChangeFractions"/>
        </template>
        <template v-else-if="item.type === 'operation'">{{item.isResult}}
          <operation :id="index" :type="item.value" @changeOperation="onChangeOperation"/>
        </template>
      </template>
      <hr/>
      <button class="btn-add-fraction" @click="addFraction">Add fracttion</button>
      <div v-if="showWarning">
        <hr/>
        <span>{{warning}}</span>
      </div>
    </div>

  </div>
</template>

<script>
  import fraction from '../components/calculator/fraction.vue';
  import operation from '../components/calculator/operation.vue';

  import * as rpn from '../helpers/rpn';
  import * as helpers from '../helpers/maths';

  export default {
    name: 'calculator',
    data() {
      return {
        title: 'Калькулятор дробей',
        inputString: [],
        resultString: [],
        showWarning: false
      }
    },

    mounted() {
      this.initComponent();
    },

    computed: {
      /**
       * Возвращеает полное дробное выражение
       */
      fullInputString: function () {
        return this.inputString.concat(this.resultString);
      },

      /**
       * Генерирует текст ошибки выражения
       */
      warning: function () {
        return 'Заполните все поля корректно';
      }
    },
    methods: {
      /**
       * Срабатывает при изменение операции
       */
      onChangeOperation(evt) {
        this.inputString[evt.id].value = evt.newOp;
        this.checkForUpdate();
      },

      /**
       * Срабатыаает при изменение значений в дробях
       */
      onChangeFractions(evt) {

        if (evt.part === 'numenator') {
          this.inputString[evt.id].numenator = evt.newValue;
        } else if (evt.part === 'denomenator') {
          this.inputString[evt.id].denomenator = evt.newValue;
        }
        this.checkForUpdate();
      },

      /**
       * Генерирует дробь. isResult - является ли результирующей дробью
       */
      generateDefaultFraction(isResult = false) {
        return {
          numenator: '',
          denomenator: '',
          type: 'operand',
          isResult: isResult
        };
      },
      /**
       * Генерирует операцию
       */
      generateDefaultOperation(op) {
        return {
          type: 'operation',
          value: op
        };
      },

      /**
       * Добавление новой дроби
       */
      addFraction() {
        this.inputString.push(this.generateDefaultOperation('+'));
        this.inputString.push(this.generateDefaultFraction());
        this.checkForUpdate();
      },

      /**
       * Прооверка необходимости пересчитывать вырадение
       */
      checkForUpdate() {
        const operands = this.inputString.filter(item => item.type === 'operand');
        for (let i = 0; i < operands.length; i++) {
          let isFractionOk =
            helpers.isNumeric(operands[i].numenator)       // числитель - число
            && helpers.isNumeric(operands[i].denomenator)  // знаменатель - число
            && +operands[i].denomenator !== 0;             // знаменатель - не ноль
          if (!isFractionOk) {
            // сброс результатов
            this.reCalcResult();
            return;
          }
          if (i === operands.length - 1) {
            // пересчет результатов
            this.reCalcResult(false);
          }
        }
      },

      /**
       * Пересчет значений выражения или обнуление в случае некорректных данных
       */
      reCalcResult(isReset = true) {
        this.showWarning = isReset;
        if (!isReset) {
          const result = rpn.calculate(this.inputString);
          this.setResult(result.numenator, result.denomenator);
        } else {
          this.setResult();
        }
      },

      /**
       * Устанавливает значения в результат
       * @param numenator
       * @param denomenator
       */
      setResult(numenator = '', denomenator = '') {
        if (numenator !== '' && denomenator !== '' && numenator === denomenator){
          numenator = 1;
          denomenator = 1;
        }
        this.resultString = this.resultString.map(item => {
          if (item.type === 'operand') {
            item.numenator = numenator + '';
            item.denomenator = numenator !== 0 ? denomenator  + '' : '0';
          }
          return item;
        });
      },

      /**
       * Первичная инициализация приложения
       */
      initComponent() {
        this.inputString.push(this.generateDefaultFraction());
        this.inputString.push(this.generateDefaultOperation('+'));
        this.inputString.push(this.generateDefaultFraction());
        this.resultString.push(this.generateDefaultOperation('='));
        this.resultString.push(this.generateDefaultFraction(true));
        this.checkForUpdate();
      }
    },

    components: {
      fraction,
      operation
    }
  }
</script>

<style scoped>
  .fractions-list {
    background-color: white;
    width: 70%;
    border-radius: 4px;
    padding: 10px;
    margin: 10px auto;
    text-align: center;
    display: inline-table;
  }

  .btn-add-fraction {
    display: block;
    margin: 0 auto;
  }
</style>
