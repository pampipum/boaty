<!-- src/routes/boat/CostOfAcquisition.svelte -->
<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { Input } from "$lib/components/ui/input";
    import TableRow from "./TableRow.svelte";
  
    export let selectedBoats: string[];
    export let costOfAcquisitionData: number[][];
  </script>
  
  <Table.Header>
    <Table.Row>
      <Table.Head class="bg-gray-400">Cost of Acquisition</Table.Head>
      {#each selectedBoats as boatModel}
        <Table.Head class="bg-gray-400"></Table.Head>
      {/each}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <TableRow title="State Tax" bind:rowData={costOfAcquisitionData} />
    <TableRow title="Import Tax" bind:rowData={costOfAcquisitionData} />
    <!-- Render the remaining cost of acquisition rows -->
    <!-- ... -->
  </Table.Body>
