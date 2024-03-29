<!-- src/lib/components/ListingAnalysis.svelte -->
<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
  import { createEventDispatcher } from 'svelte';
  import { Textarea } from "$lib/components/ui/textarea";
  import * as Dialog from "$lib/components/ui/dialog";
  import { buttonVariants } from "$lib/components/ui/button/index";

  export let selectedBoats: any[];
  export let combinedData: { [key: string]: any }[];

  let analysisResults: string[] = Array(selectedBoats.length).fill('');
  let isLoading: boolean[] = Array(selectedBoats.length).fill(false);
  let showComparisonButton = false;
  let comparisonAnalysisResult = '';
  let isComparisonLoading = false;

  $: showComparisonButton = selectedBoats.length >= 2;

  const dispatch = createEventDispatcher();

  async function analyzeListing(index: number) {
    const boatData = combinedData[index];
    console.log('Boat data sent to server:', boatData);

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
      
      // Dispatch the dataUpdated event with the updated data
      dispatch('dataUpdated', { index, data: { ...boatData, analysisResult: result.content[0].text } });
    } else {
      console.error('Error analyzing listing:', response.statusText);
    }

    isLoading[index] = false;
  }

  async function analyzeComparison() {
    const boatDataArray = combinedData.filter((data) => data);

    isComparisonLoading = true;

    const response = await fetch('/compare-boats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: boatDataArray }),
    });

    if (response.ok) {
      const result = await response.json();
      comparisonAnalysisResult = result.content[0].text;
    } else {
      console.error('Error analyzing comparison:', response.statusText);
    }

    isComparisonLoading = false;
  }

  function updateUserData(index: number, field: string, value: string) {
  if (!combinedData[index]) {
    combinedData[index] = {};
  }
  combinedData[index][field] = value;
  dispatch('dataUpdated', { index, data: combinedData[index] });
}
</script>
  
<Table.Header>
  <Table.Row>
    <Table.Head class="bg-gray-500 text-white py-4">
      Listing Text
      <Dialog.Root>
        <Dialog.Trigger class="{buttonVariants({ variant: 'outline' })} mt-2 mx-auto">
          More info
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Providing Listing Text</Dialog.Title>
            <Dialog.Description>
              To provide more information about the boat, please navigate to the boat listing page, copy the relevant text, and paste it into the text area box on the right. The more complete is the information, the better is the analysis.
            </Dialog.Description>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog.Root>
    </Table.Head>
    {#each selectedBoats as _, i}
    <Table.Head class="bg-gray-500 text-white py-4">
        <Textarea placeholder="Paste listing text here" class="w-full" on:input={e => updateUserData(i, 'listingText', e.target.value)} />
      </Table.Head>
    {/each}
  </Table.Row>
</Table.Header>

<Table.Body>
  <Table.Row>
    <Table.Cell class="text-white py-4">Listing Analysis</Table.Cell>
    {#each selectedBoats as _, i}
      <Table.Cell class="md:table-cell block">
        {#if isLoading[i]}
          <span class="text-white">Loading...</span>
        {:else}
          <Button on:click={() => analyzeListing(i)}>
            Expert Report
          </Button>
        {/if}
      </Table.Cell>
    {/each}
  </Table.Row>
  {#if analysisResults.some(result => result !== '')}
    <Table.Row>
      <Table.Cell colspan={selectedBoats.length + 1}>
        <div class="md:hidden">
          {#each selectedBoats as _, i}
            {#if analysisResults[i]}
              <div class="w-full p-4 border rounded whitespace-pre-wrap overflow-auto">
                <div class="font-semibold mb-2">Analysis Result:</div>
                {analysisResults[i]}
              </div>
            {/if}
          {/each}
        </div>
        <div class="hidden md:block">
          <Table.Row>
            <Table.Cell class="font-semibold">Analysis Result</Table.Cell>
            {#each selectedBoats as _, i}
              <Table.Cell>
                {#if analysisResults[i]}
                  <div class="w-full p-4 border rounded whitespace-pre-wrap overflow-auto">
                    {analysisResults[i]}
                  </div>
                {/if}
              </Table.Cell>
            {/each}
          </Table.Row>
        </div>
      </Table.Cell>
    </Table.Row>
  {/if}
</Table.Body>

{#if showComparisonButton}
  <Table.Header>
    <Table.Row>
      <Table.Head class="bg-gray-700 text-white py-4" colspan={selectedBoats.length + 1}>
        {#if isComparisonLoading}
          <span class="text-white">Loading comparison...</span>
        {:else}
          <Button on:click={analyzeComparison}>
            Comparison Analysis
          </Button>
        {/if}
      </Table.Head>
    </Table.Row>
  </Table.Header>

  {#if comparisonAnalysisResult}
    <Table.Body>
      <Table.Row>
        <Table.Cell colspan={selectedBoats.length + 1}>
          <div class="w-full p-4 border rounded whitespace-pre-wrap overflow-auto">
            {comparisonAnalysisResult}
          </div>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  {/if}
{/if}
  
  <style>
    div {
      max-height: 400px;
    }
  </style>