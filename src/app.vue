<template>
  <div class='side-box'>
    <h3>Tweaks</h3>
    <label>
      # of processes <b>{{ processCount }}</b>
      <input type='range' min='1' max='100' 
             :valueAsNumber='processCount' @input='processCount = $event.target.valueAsNumber' />
    </label>
    <label>
      sparkline length <b>{{ historyLength }}</b>
      <input type='range' min='1' max='100'
             :valueAsNumber='historyLength' @input='historyLength = $event.target.valueAsNumber' />
    </label>
    <label>
      reactive array
      <label class='radio'><input type='radio' v-model='strategy' :value='0'> default</label>
      <label class='radio'><input type='radio' v-model='strategy' :value='1'> fast</label>
      <label class='radio'><input type='radio' v-model='strategy' :value='2'> faster</label>
    </label>
  </div>

  <div class='box'>
    <h2>Process Explorer</h2>
    <table>
      <tbody>
        <tr v-for='p in processes'>
          <td>{{ p.name }}</td>
          <td>{{ p.last }} %</td>
          <td><Sparkline :data='p.history' /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { reactive, ref, watch } from 'vue';
  import { fastArray } from './fast-array';
  import Process from './process';
  import Sparkline from './sparkline.vue';
  import Timer from './timer';

  export default {
    components: {
      Sparkline
    },

    setup() {
      const data = reactive({
        strategy: 0,
        processCount: 20,
        historyLength: 60,
        processes: null,
      });

      watch(() => {
        let array = Array.from({ length: data.processCount }, 
                               (_, i) => new Process('Process #' + i, data.historyLength, data.strategy));        
        data.processes = fastArray(array, data.strategy);
      });
      
      const timer = new Timer(500, () => {
        for (let p of data.processes)
          p.tick();
      });
      
      return data;
    }
  };
</script>