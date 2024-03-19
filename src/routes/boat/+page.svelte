<!-- src/routes/boat/+page.svelte -->
<script lang="ts">
  import * as Table from "$lib/components/ui/table";

  import SpecComparison from "$lib/components/SpecComparison.svelte";
  import ListingAnalysis from "$lib/components/ListingAnalysis.svelte";
  import ComparisonChart from "$lib/components/ComparisonChart.svelte";

  export let data: { sailboatModels: any[] } | undefined;
  

  let searchQuery = '';
  let filteredBoats: any[] = [];
  let selectedBoats: any[] = [];
  let combinedData: { [key: string]: any }[] = [];

  // Function to filter the sailboats based on the search query
  function filterBoats(query: string) {
    searchQuery = query;
    filteredBoats = data?.sailboatModels.filter((boat) =>
      boat.model.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  }

  // Function to handle boat selection
  async function selectBoat(model: string) {
  try {
    const response = await fetch(`/boat?model=${encodeURIComponent(model)}`);
    if (response.ok) {
      const sailboat = await response.json();
      selectedBoats = [...selectedBoats, sailboat];
      data = { ...data, [model]: sailboat };
      combinedData = [...combinedData, sailboat];
      searchQuery = '';
      filteredBoats = [];
    } else {
      console.error('Failed to fetch boat data');
    }
  } catch (error) {
    console.error('Error fetching boat data:', error);
  }
}

  // Function to remove a boat from the comparison
  function removeBoat(index: number) {
  selectedBoats.splice(index, 1);
  selectedBoats = [...selectedBoats];
  combinedData.splice(index, 1);
  combinedData = [...combinedData];
}

  function handleDataUpdated(event: CustomEvent<{ index: number; data: any }>) {
    const { index, data } = event.detail;
    
    combinedData[index] = data;
    combinedData = [...combinedData];
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
        <ul class="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-auto dropdown-menu">
          {#each filteredBoats as boat (boat.model)}
            <li>
              <button
                type="button"
                on:click={() => selectBoat(boat.model)}
                class="block w-full text-left p-2 hover:bg-muted hover:text-muted-foreground"
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
      <SpecComparison {selectedBoats} on:removeBoat={(e) => removeBoat(e.detail)} on:dataUpdated={handleDataUpdated}/>

      <!-- Add the ComparisonChart component -->
      <Table.Row>
        <Table.Cell colspan={selectedBoats.length + 1}>
          <div class="p-4">
            <ComparisonChart {selectedBoats} />
          </div>
        </Table.Cell>
      </Table.Row>

      <ListingAnalysis {selectedBoats} {combinedData} />
    </Table.Root>
  </div>
{:else}
  <div class="container mx-auto max-w-7xl px-4 py-8">
    <p>Loading...</p>
  </div>
{/if}