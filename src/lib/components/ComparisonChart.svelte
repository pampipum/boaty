
<!-- src/lib/components/ComparisonChart.svelte -->
<script lang="ts">
  import Chart from 'chart.js/auto';
  import * as Accordion from '$lib/components/ui/accordion';

  export let selectedBoats: any[];

  let chartElement: HTMLCanvasElement;
  let chart: Chart;
  
    const metricRanges = [
    {
      name: 'Sail Power Ratio (S.A./Displ.)',
      ranges: [
        { min: 0, max: 15, color: 'red', description: 'Low; slower, requires stronger winds' },
        { min: 15, max: 20, color: 'yellow', description: 'Moderate; good balance for general cruising' },
        { min: 20, max: Infinity, color: 'green', description: 'High; fast and responsive, suitable for racing' }
      ]
    },
    {
      name: 'Stability Factor (Bal./Displ.)',
      ranges: [
        { min: 0, max: 35, color: 'red', description: 'Lower stability; suitable for light, performance-oriented boats' },
        { min: 35, max: 45, color: 'yellow', description: 'Moderate stability; good balance for most cruising sailboats' },
        { min: 45, max: Infinity, color: 'green', description: 'High stability; designed for heavy weather and ocean sailing' }
      ]
    },
    {
      name: 'Heaviness Index (Disp./Len.)',
      ranges: [
        { min: 0, max: 100, color: 'red', description: 'Very light; typically fast boats with less comfort in rough seas' },
        { min: 100, max: 200, color: 'yellow', description: 'Moderate; a balanced design suitable for a variety of conditions' },
        { min: 200, max: Infinity, color: 'green', description: 'Heavy; slower but more comfortable and seaworthy' }
      ]
    },
    {
      name: 'Sea Comfort Measure (Comfort Ratio)',
      ranges: [
        { min: 0, max: 20, color: 'red', description: 'Less comfortable; more lively motion in rough seas' },
        { min: 20, max: 30, color: 'yellow', description: 'Moderate comfort; a good compromise for many cruisers' },
        { min: 30, max: Infinity, color: 'green', description: 'High comfort; gentler motion in heavy seas' }
      ]
    },
    {
      name: 'Safety Index (Capsize Screening Formula)',
      ranges: [
        { min: 0, max: 2, color: 'green', description: 'Generally safer and more stable, less likely to capsize' },
        { min: 2, max: 3, color: 'yellow', description: 'Moderate risk; suitable for coastal cruising with precautions' },
        { min: 3, max: Infinity, color: 'red', description: 'Higher risk; requires careful handling in rough conditions' }
      ]
    },
    {
      name: 'Speed Potential (Hull Speed)',
      ranges: [
        { min: 0, max: 6, color: 'red', description: 'Suitable for small or traditional boats' },
        { min: 6, max: 8, color: 'yellow', description: 'Average for cruising sailboats' },
        { min: 8, max: Infinity, color: 'green', description: 'High for monohull cruising sailboats, faster passages' }
      ]
    }
  ];
  
  $: {
    if (selectedBoats.length > 0 && chartElement) {
      const radarData = {
        labels: metricRanges.map(metric => metric.name),
        datasets: selectedBoats.map((boat, index) => ({
          label: boat.model || '',
          data: [
            parseFloat(boat.sa_displ) || 0,
            parseFloat(boat.bal_displ) || 0,
            parseFloat(boat.disp_len) || 0,
            parseFloat(boat.comfort_ratio) || 0,
            parseFloat(boat.capsize_screening_formula) || 0,
            parseFloat(boat.hull_speed) || 0
          ],
          fill: true
        }))
      };

      if (chart) {
        chart.data = radarData;
        chart.update();
      } else {
        chart = new Chart(chartElement, {
          type: 'radar',
          data: radarData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              r: {
                grid: {
                  color: '#4a5568', // Adjust grid color for dark mode
                },
                ticks: {
                  color: '#e2e8f0',
                  backdropColor: 'transparent', // Adjust tick color for dark mode
                },
                pointLabels: {
                  color: '#e2e8f0', // Adjust point label color for dark mode
                },
                angleLines: {
                  color: '#4a5568', // Adjust angle line color for dark mode
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: '#e2e8f0', // Adjust legend label color for dark mode
                  
                },
              },
            },
          },
        });
      }
    }
  }
</script>
  
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  {#if selectedBoats.length > 0}
    <div class="md:col-span-2">
      <canvas bind:this={chartElement}></canvas>
    </div>
    <div>
      <h3 class="font-semibold mb-2">Value Ranges and Meanings:</h3>
      <Accordion.Root class="w-full">
        {#each metricRanges as metric}
          <Accordion.Item value={metric.name}>
            <Accordion.Trigger>{metric.name}</Accordion.Trigger>
            <Accordion.Content>
              <ul class="list-none pl-0">
                {#each metric.ranges as range}
                  <li class="flex items-center mb-1">
                    <span class="w-4 h-4 inline-block mr-2" style="background-color: {range.color};"></span>
                    <span class="text-sm">
                      {range.min} to {range.max === Infinity ? 'more than ' + (range.min + 5) : range.max}: {range.description}
                    </span>
                  </li>
                {/each}
              </ul>
            </Accordion.Content>
          </Accordion.Item>
        {/each}
      </Accordion.Root>
    </div>
  {:else}
    <div class="col-span-3 text-center">
      <p>No boats selected. Please select at least one boat to display the comparison chart.</p>
    </div>
  {/if}
</div>