<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Textarea } from "$lib/components/ui/textarea";
  import { createEventDispatcher } from 'svelte';
  import { X } from 'lucide-svelte';
  import * as Dialog from "$lib/components/ui/dialog";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Link } from "./ui/pagination";

  export let selectedBoats: any[];

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
    const boatData = selectedBoats[index];
    const combinedData = { ...boatData, ...userEnteredData[index] };
    dispatch('dataUpdated', { model: boatData.model, data: combinedData });
  }
</script>

<Table.Header>
  <Table.Row>
    <Table.Head class="bg-gray-800 text-white py-4">Spec Comparison</Table.Head>
    {#each selectedBoats as boat, i}
      <Table.Head class="bg-gray-800 text-white py-4">
        Boat {i + 1}
        <button class="ml-2 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" on:click={() => removeBoat(i)}>
          <X class="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-100" />
        </button>
      </Table.Head>
    {/each}
  </Table.Row>
</Table.Header>
<Table.Body>
  <Table.Row>
    <Table.Cell class="font-semibold">Model</Table.Cell>
    {#each selectedBoats as boat}
      <Table.Cell>{boat.model}</Table.Cell>
    {/each}
  </Table.Row>
  <Table.Row>
    <Table.Cell class="font-semibold">Link</Table.Cell>
    {#each selectedBoats as boat}
      <Table.Cell>
        <a href="{boat.link}" target="_blank">
          Link
        </a>
      </Table.Cell>
    {/each}
  </Table.Row>
  <Table.Row>
    <Table.Cell class="font-semibold">
      Listing Text
      <Dialog.Root>
        <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>More info</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Providing Listing Text</Dialog.Title>
            <Dialog.Description>
              To provide more information about the boat, please navigate to the boat listing page, copy the relevant text, and paste it into the text area box on the right.
            </Dialog.Description>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog.Root>
    </Table.Cell>
    {#each selectedBoats as _, i}
      <Table.Cell>
        <Textarea placeholder="Paste listing text here" class="w-full" on:input={e => updateUserData(i, 'listingText', e.target.value)} />
      </Table.Cell>
    {/each}
  </Table.Row>
</Table.Body>