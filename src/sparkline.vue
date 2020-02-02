<template>
  <canvas ref='canvas' :width='data.length' height='20'></canvas>
</template>

<script>
  import { ref, watch } from 'vue';
  import { fastRead } from './fast-array';

  export default {
    props: {
      data: Array
    },

    setup(props) {
      let canvas = ref(null);

      watch(paint);

      return {
        canvas
      };

      function paint() {
        let data = fastRead(props.data);

        let g = canvas.value.getContext('2d');
        g.clearRect(0, 0, g.canvas.width, g.canvas.height);
        g.strokeStyle = '#05c';
        g.beginPath();
        g.moveTo(0, 20 - data[0] / 5);
        for (let i = 0; i < data.length; i++)
          g.lineTo(i, 20 - data[i] / 5);
        g.stroke();
      }
    }
  };
</script>