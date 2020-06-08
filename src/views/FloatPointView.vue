<template>
    <div class="page">
      <h1>浮点数内存查看器</h1>
      <span v-for="(bit, index) in bits" :key="index">
        <input type="number" :class="bit > 0 ? v > 11 ? 'fraction' : 'exponent' : 'sign'" min="0" max="1" v-model="bits[index]">
        <input type="text" v-if="bit === 31">
        <br v-if="bit === 31" />
      </span>
      <br>
      <input type="text" style="width: 5em;" v-model="value">
    </div>
</template>

<script>
export default {
  name: 'FloatPointView',
  data() {
    return {
      bits: new Array(64).fill(0),
      value: 0
    }
  },
  watch: {
    value(val) {
      const bytes = new Uint8Array(8);
      const memory = new Float64Array(bytes.buffer);
      memory[0] = (val);
      for (let i = 0; i < 8; i++) {
        let byte = bytes[i];
        for (let j = 0; j < 8; j++) {
          this.bits[(8 - i) * 8 - j - 1] = byte & 1;
          byte = byte >> 1;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    font-size: 18px;
    width: 800px;
    margin: 0 auto;
    padding-bottom: 150px;
    font-family: 'Open Sans', sans-serif, Arial, "Helvetica Neue", Helvetica;

    h1 {
      height: 50px;
      line-height: 50px;
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .container input[type='number']{
    -moz-appearance: textfield;
  }
  span {
    padding:0;
    margin:0;
  }
  input {
    width:1em;
    height:2em;
    text-align:center;
  }
  .sign {
    background-color: lightblue;
  }
  .exponent {
    background-color: orange;
  }
</style>
