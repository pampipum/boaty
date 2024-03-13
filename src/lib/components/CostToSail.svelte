<!-- src/routes/boat/CostToSail.svelte -->
<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { Input } from "$lib/components/ui/input";
    import TableRow from "./TableRow.svelte";
  
    export let selectedBoats: string[];
    export let costToSailData: number[][];
  </script>
  
  <Table.Header>
    <Table.Row>
      <Table.Head class="bg-gray-200">Cost To Sail</Table.Head>
      {#each selectedBoats as boatModel}
        <Table.Head class="bg-gray-200"></Table.Head>
      {/each}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <TableRow title="Sails" bind:rowData={costToSailData} />
    <TableRow title="Standing Rigging" bind:rowData={costToSailData} />
    <!-- Render the remaining cost to sail rows -->
    <!-- ... -->
  </Table.Body>