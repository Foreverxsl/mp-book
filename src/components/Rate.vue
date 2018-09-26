<template>
  <div class='rate'>
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style='style'>
        <span>★★★★★</span>
    </div>
  </div>
</template>
<script>
// vue-tiny-rate
export default {
  props:{
    value:{type:[Number,String],default:'0'}
  },
 computed:{
    style(){
      return `width:${this.value*1.2*5}px`
      
    }
  }
}
</script>
<style lang='scss'>
.rate{
    width: 60px;
    position: relative;
    display: inline-block;
    color: rgb(219, 219, 22);
    .hollow {
        position: absolute;
        display: inline-block;
        top:0;
        left:0;
        width:0;
        overflow:hidden;
    }
}
</style>


