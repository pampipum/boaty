<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Input } from "$lib/components/ui/input";
  import { createEventDispatcher } from 'svelte';
  import { X } from 'lucide-svelte';
  import * as Dialog from "$lib/components/ui/dialog";
  import {
    buttonVariants
  } from "$lib/components/ui/button/index.js";
  

  export let selectedBoats: string[];
  export let data: { sailboats: any[] } | undefined;

  const dispatch = createEventDispatcher();

  function removeBoat(index: number) {
    dispatch('removeBoat', index);
  }

  let userEnteredData: { [key: string]: string }[] = selectedBoats.map(() => ({}));

  function updateUserData(index: number, field: string, value: string) {
    if (!userEnteredData[index]) {
      userEnteredData[index] = {};
    }
    userEnteredData[index][field] = value;
    const boatData = data.sailboats.find(boat => boat.model === selectedBoats[index]);
    const combinedData = { ...boatData, ...userEnteredData[index] };
    dispatch('dataUpdated', { index, data: combinedData });
  }
</script>

<Table.Header>
  <Table.Row>
    <Table.Head class="bg-gray-800 text-white py-4">Spec Comparison</Table.Head>
    {#each selectedBoats as boatModel, i}
      <Table.Head class="bg-gray-800 text-white py-4">
        Boat {i + 1}
        <button class="ml-2 text-red-500" on:click={() => removeBoat(i)}>
          <X
          class="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
        </button>
      </Table.Head>
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
    <Table.Cell class="font-semibold">
      Listing Text
      <Dialog.Root>
        <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
    >More info</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Providing Listing Text</Dialog.Title>
            <Dialog.Description>
              To provide more information about the boat, please navigate to the boat listing page, copy the relevant text, and paste it into the text area box below.
            </Dialog.Description>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog.Root>
    </Table.Cell>
    {#each selectedBoats as boatModel, i}
      <Table.Cell>
        <Textarea placeholder="Paste listing text here" class="w-full" on:input={e => updateUserData(i, 'listingText', e.target.value)} />
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