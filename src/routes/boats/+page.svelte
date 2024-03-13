<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Input } from "$lib/components/ui/input";

  export let data: { sailboats: any[] } | undefined;

  let searchQuery = '';
  let filteredBoats: any[] = [];
  let selectedBoats: string[] = [];
  let listingPrices: number[] = [];
  let costToSail: number[][] = [];
  let upgrades: number[][] = [];
  let costOfAcquisition: number[][] = [];

  $: totals = selectedBoats.map((boatModel, i) => {
    const boat = data.sailboats.find(b => b.model === boatModel);
    const listingPrice = parseFloat(listingPrices[i] || '0');
    const costToSailTotal = costToSail[i]?.reduce((sum, cost) => sum + parseFloat(cost || '0'), 0) || 0;
    const upgradesTotal = upgrades[i]?.reduce((sum, cost) => sum + parseFloat(cost || '0'), 0) || 0;
    const costOfAcquisitionTotal = costOfAcquisition[i]?.reduce((sum, cost) => sum + parseFloat(cost || '0'), 0) || 0;
    return listingPrice + costToSailTotal + upgradesTotal + costOfAcquisitionTotal;
  });

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
      costToSail = [...costToSail, Array(10).fill(0)];
      upgrades = [...upgrades, Array(10).fill(0)];
      costOfAcquisition = [...costOfAcquisition, Array(8).fill(0)];
    }
    searchQuery = '';
    filteredBoats = [];
  }
</script>

{#if data}
<div class="container mx-auto max-w-7xl px-4 py-8">
  <h1 class="text-4xl font-bold mb-8 text-center">Boat Comparison</h1>

  <div class="mb-8 relative">
    <input
      type="text"
      placeholder="Type to search for a boat model..."
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

  <Table.Root class="shadow-lg rounded-lg overflow-hidden">
    <Table.Header>
      <Table.Row>
        <Table.Head class="bg-gray-800 text-white py-4">Spec Comparison</Table.Head>
        {#each selectedBoats as boatModel, i}
          <Table.Head class="bg-gray-800 text-white py-4">Boat {i + 1}</Table.Head>
        {/each}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="font-semibold">Model</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>{boatModel}</Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Listing URL</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>
            <Input type="text" placeholder="Enter listing URL" class="w-full" />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Listing Price (USD)</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Enter listing price" class="w-full" bind:value={listingPrices[i]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Year</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>
            <Input type="text" placeholder="Enter year" class="w-full" />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">LOA (ft)</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>{data.sailboats.find(boat => boat.model === boatModel)?.loa_imperial || '-'}</Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">LWL (ft)</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>{data.sailboats.find(boat => boat.model === boatModel)?.lwl_imperial || '-'}</Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Beam (ft)</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>{data.sailboats.find(boat => boat.model === boatModel)?.beam_imperial || '-'}</Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Cabins</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>
            <Input type="text" placeholder="Enter cabins" class="w-full" />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Fuel (gal)</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>{data.sailboats.find(boat => boat.model === boatModel)?.fuel_imperial || '-'}</Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Water (gal)</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>{data.sailboats.find(boat => boat.model === boatModel)?.water_imperial || '-'}</Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Max Draft (ft)</Table.Cell>
        {#each selectedBoats as boatModel}
          <Table.Cell>{data.sailboats.find(boat => boat.model === boatModel)?.max_draft_imperial || '-'}</Table.Cell>
        {/each}
      </Table.Row>
    </Table.Body>
    <Table.Header>
      <Table.Row>
        <Table.Head class="bg-gray-200">Cost To Sail</Table.Head>
        {#each selectedBoats as boatModel}
          <Table.Head class="bg-gray-200"></Table.Head>
        {/each}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="font-semibold">Sails</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input
            type="number"
            placeholder="Investment needed on sails"
            class="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            bind:value={costToSail[i][0]}
          />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Standing Rigging</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on standing rigging" class="w-full" bind:value={costToSail[i][1]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Anchors</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on anchors" class="w-full" bind:value={costToSail[i][2]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Running Rigging</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on running rigging" class="w-full" bind:value={costToSail[i][3]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Bottom Job</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on bottom job" class="w-full" bind:value={costToSail[i][4]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Dinghy</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on dinghy" class="w-full" bind:value={costToSail[i][5]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Engine</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on engine" class="w-full" bind:value={costToSail[i][6]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Life Raft</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on life raft" class="w-full" bind:value={costToSail[i][7]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Chain</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on chain" class="w-full" bind:value={costToSail[i][8]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">EPIRB</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on EPIRB" class="w-full" bind:value={costToSail[i][9]} />
          </Table.Cell>
        {/each}
      </Table.Row>
    </Table.Body>
    <Table.Header>
      <Table.Row>
        <Table.Head class="bg-gray-300">Upgrades</Table.Head>
        {#each selectedBoats as boatModel}
          <Table.Head class="bg-gray-300"></Table.Head>
        {/each}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="font-semibold">Autopilot</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on autopilot" class="w-full" bind:value={upgrades[i][0]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Watermaker</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on watermaker" class="w-full" bind:value={upgrades[i][1]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Generator</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on generator" class="w-full" bind:value={upgrades[i][2]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Inverter</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on inverter" class="w-full" bind:value={upgrades[i][3]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Solar</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on solar" class="w-full" bind:value={upgrades[i][4]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Batteries</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on batteries" class="w-full" bind:value={upgrades[i][5]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">AIS</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on AIS" class="w-full" bind:value={upgrades[i][6]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Windvane</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on windvane" class="w-full" bind:value={upgrades[i][7]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Thruster</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on thruster" class="w-full" bind:value={upgrades[i][8]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Radar</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on radar" class="w-full" bind:value={upgrades[i][9]} />
          </Table.Cell>
        {/each}
      </Table.Row>
    </Table.Body>
    <Table.Header>
      <Table.Row>
        <Table.Head class="bg-gray-400">Cost of Acquisition</Table.Head>
        {#each selectedBoats as boatModel}
          <Table.Head class="bg-gray-400"></Table.Head>
        {/each}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="font-semibold">State Tax</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on state tax" class="w-full" bind:value={costOfAcquisition[i][0]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Import Tax</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on import tax" class="w-full" bind:value={costOfAcquisition[i][1]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Registration</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on registration" class="w-full" bind:value={costOfAcquisition[i][2]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Air Fare</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on air fare" class="w-full" bind:value={costOfAcquisition[i][3]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Lodging</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on lodging" class="w-full" bind:value={costOfAcquisition[i][4]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Captain</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on captain" class="w-full" bind:value={costOfAcquisition[i][5]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Insurance</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on insurance" class="w-full" bind:value={costOfAcquisition[i][6]} />
          </Table.Cell>
        {/each}
      </Table.Row>
      <Table.Row>
        <Table.Cell class="font-semibold">Miscellaneous</Table.Cell>
        {#each selectedBoats as _, i}
          <Table.Cell>
            <Input type="number" placeholder="Investment needed on miscellaneous" class="w-full" bind:value={costOfAcquisition[i][7]} />
          </Table.Cell>
        {/each}
      </Table.Row>
    </Table.Body>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="font-semibold">Total Investment</Table.Cell>
        {#each totals as total}
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