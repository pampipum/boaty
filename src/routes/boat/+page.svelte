<!-- src/routes/boat/+page.svelte -->
<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Input } from "$lib/components/ui/input";
  import SpecComparison from "$lib/components/SpecComparison.svelte";
  import CostToSail from "$lib/components/CostToSail.svelte";
  import Upgrades from "$lib/components/Upgrades.svelte";
  import CostOfAcquisition from "$lib/components/CostOfAcquisition.svelte";
  import ListingAnalysis from "$lib/components/ListingAnalysis.svelte";

  export let data: { sailboats: any[] } | undefined;

  let searchQuery = '';
  let filteredBoats: any[] = [];
  let selectedBoats: string[] = [];
  let listingPrices: number[] = [];
  let costToSailData: number[][] = [];
  let upgradesData: number[][] = [];
  let costOfAcquisitionData: number[][] = [];
  let combinedData: { [key: string]: any }[] = [];


  // Function to filter the sailboats based on the search query
  function filterBoats(query: string) {
    searchQuery = query;
    filteredBoats = data.sailboats.filter((boat) =>
      boat.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Function to handle boat selection
  function selectBoat(model: string) {
    if (!selectedBoats.includes(model)) {
      selectedBoats = [...selectedBoats, model];
      listingPrices = [...listingPrices, 0];
      costToSailData = [...costToSailData, Array(10).fill(0)];
      upgradesData = [...upgradesData, Array(10).fill(0)];
      costOfAcquisitionData = [...costOfAcquisitionData, Array(8).fill(0)];
    }
    searchQuery = '';
    filteredBoats = [];
  }

  // Function to calculate the total investment for each boat
  function calculateTotals() {
    return selectedBoats.map((boatModel, i) => {
      const boat = data.sailboats.find(b => b.model === boatModel);
      const listingPrice = parseFloat(listingPrices[i] || '0');
      const costToSailTotal = costToSailData[i]?.reduce((sum, cost) => sum + parseFloat(cost || '0'), 0) || 0;
      const upgradesTotal = upgradesData[i]?.reduce((sum, cost) => sum + parseFloat(cost || '0'), 0) || 0;
      const costOfAcquisitionTotal = costOfAcquisitionData[i]?.reduce((sum, cost) => sum + parseFloat(cost || '0'), 0) || 0;
      return listingPrice + costToSailTotal + upgradesTotal + costOfAcquisitionTotal;
    });
  }

    // Function to remove a boat from the comparison
    function removeBoat(index: number) {
    selectedBoats.splice(index, 1);
    listingPrices.splice(index, 1);
    costToSailData.splice(index, 1);
    upgradesData.splice(index, 1);
    costOfAcquisitionData.splice(index, 1);
    selectedBoats = [...selectedBoats];
    listingPrices = [...listingPrices];
    costToSailData = [...costToSailData];
    upgradesData = [...upgradesData];
    costOfAcquisitionData = [...costOfAcquisitionData];
  }

  function handleDataUpdated(event: CustomEvent<{ index: number; data: any }>) {
  const { index, data } = event.detail;
  combinedData[index] = data;
  combinedData = combinedData;
}
</script>

{#if data}
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Boat Comparison</h1>

    <!-- Search and select boats -->
    <div class="mb-8 relative">
      <input
        type="text"
        placeholder="Start Here -> Type to search for a boat model..."
        bind:value={searchQuery}
        on:input={({ target }) => filterBoats(target.value)}
        class="w-full p-2 rounded border shadow-sm"
      />
      {#if filteredBoats.length > 0}
        <ul class="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-auto">
          {#each filteredBoats as boat (boat.id)}
            <li>
              <button
                type="button"
                on:click={() => selectBoat(boat.model)}
                class="block w-full text-left p-2 hover:bg-gray-100"
              >
                {boat.model}
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Render the table -->
    <Table.Root class="shadow-lg rounded-lg overflow-hidden">
      <SpecComparison {selectedBoats} {data} on:removeBoat={(e) => removeBoat(e.detail)} on:dataUpdated={handleDataUpdated}/>
      <ListingAnalysis {selectedBoats} {combinedData}/>
      <CostToSail {selectedBoats} bind:costToSailData />
      <Upgrades {selectedBoats} bind:upgradesData />
      <CostOfAcquisition {selectedBoats} bind:costOfAcquisitionData />

      <!-- Total Investment -->
      <Table.Body>
        <Table.Row>
          <Table.Cell class="font-semibold">Total Investment</Table.Cell>
          {#each calculateTotals() as total}
            <Table.Cell>${total.toLocaleString()}</Table.Cell>
          {/each}
        </Table.Row>
      </Table.Body>
    </Table.Root>
  </div>
{:else}
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <p>Loading...</p>
  </div>
{/if}