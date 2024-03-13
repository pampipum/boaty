<!-- src/routes/boat/TableRow.svelte -->
<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { Input } from "$lib/components/ui/input";
  
    export let title: string;
    export let rowData: number[][];
  </script>
  
  <Table.Row>
    <Table.Cell class="font-semibold">{title}</Table.Cell>
    {#each rowData as _, i}
      <Table.Cell>
        <Input
          type="number"
          placeholder="Investment needed"
          class="w-full"
          bind:value={rowData[i][0]}
        />
      </Table.Cell>
    {/each}
  </Table.Row>