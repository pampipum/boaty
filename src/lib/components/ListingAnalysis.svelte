<!-- src/lib/components/ListingAnalysis.svelte -->
<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
  import { createEventDispatcher } from 'svelte';

  export let selectedBoats: string[];
  export let combinedData: { [key: string]: any }[];

  let analysisResults: string[] = Array(selectedBoats.length).fill('');
  let isLoading: boolean[] = Array(selectedBoats.length).fill(false);

  const dispatch = createEventDispatcher();

  async function analyzeListing(index: number) {
    const boatData = combinedData[index];

    if (!boatData) {
      console.error('Combined data not found for the selected boat.');
      return;
    }

    isLoading[index] = true;

    const response = await fetch('/boat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: boatData }),
    });

    if (response.ok) {
      const result = await response.json();
      analysisResults[index] = result.content[0].text;
    } else {
      console.error('Error analyzing listing:', response.statusText);
    }

    isLoading[index] = false;
  }
  </script>
  
  <Table.Header>
    <Table.Row>
      <Table.Head class="bg-gray-700 text-white py-4">Listing Analysis</Table.Head>
      {#each selectedBoats as _, i}
        <Table.Head class="bg-gray-700 text-white py-4">
          {#if isLoading[i]}
            <span class="text-white">Loading...</span>
          {:else}
            <Button on:click={() => analyzeListing(i)}>
              Send Data to LLM
            </Button>
          {/if}
        </Table.Head>
      {/each}
    </Table.Row>
  </Table.Header>
  
  <Table.Body>
    <Table.Row>
      <Table.Cell class="font-semibold">Analysis Result</Table.Cell>
      {#each selectedBoats as _, i}
        <Table.Cell>
          <div class="w-full p-4 border rounded whitespace-pre-wrap overflow-auto">
            {analysisResults[i]}
          </div>
        </Table.Cell>
      {/each}
    </Table.Row>
  </Table.Body>
  
  <style>
    div {
      max-height: 400px;
    }
  </style>