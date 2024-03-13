<!-- src/routes/boat/Upgrades.svelte -->
<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { Input } from "$lib/components/ui/input";
    import TableRow from "./TableRow.svelte";
  
    export let selectedBoats: string[];
    export let upgradesData: number[][];
  </script>
  
  <Table.Header>
    <Table.Row>
      <Table.Head class="bg-gray-300">Upgrades</Table.Head>
      {#each selectedBoats as boatModel}
        <Table.Head class="bg-gray-300"></Table.Head>
      {/each}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <TableRow title="Autopilot" bind:rowData={upgradesData} />
    <TableRow title="Watermaker" bind:rowData={upgradesData} />
    <!-- Render the remaining upgrades rows -->
    <!-- ... -->
  </Table.Body>