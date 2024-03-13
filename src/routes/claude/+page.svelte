<script lang="ts">
  let pastedText = '';
  let sails = '';
  let standingRigging = '';
  let anchors = '';
  let runningRigging = '';
  let bottomJob = '';
  let dinghy = '';
  let engine = '';
  let lifeRaft = '';
  let chain = '';
  let epirb = '';

  async function extractBoatInfo() {
    try {
      const response = await fetch('/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: pastedText }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);

        // Extract the relevant information from the response
        const extractedText = data.content[0].text;
        const extractedValues = extractedText.split('\n').slice(1);

        // Update the variables with the extracted values
        sails = extractValue(extractedValues, 'Sails');
        standingRigging = extractValue(extractedValues, 'Standing Rigging');
        anchors = extractValue(extractedValues, 'Anchors');
        runningRigging = extractValue(extractedValues, 'Running Rigging');
        bottomJob = extractValue(extractedValues, 'Bottom Job');
        dinghy = extractValue(extractedValues, 'Dinghy');
        engine = extractValue(extractedValues, 'Engine');
        lifeRaft = extractValue(extractedValues, 'Life Raft');
        chain = extractValue(extractedValues, 'Chain');
        epirb = extractValue(extractedValues, 'EPIRB');
      } else {
        console.error('Error extracting boat information');
      }
    } catch (error) {
      console.error('Error extracting boat information:', error);
    }
  }

  function extractValue(values, key) {
    const matchingValue = values.find(value => value.includes(key));
    if (matchingValue) {
      return matchingValue.split(':')[1].trim();
    }
    return '';
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Boat Information Extractor</h1>

  <div class="mb-4">
    <label for="pasted-text" class="block mb-2 font-bold">Paste boat listing information:</label>
    <textarea
      id="pasted-text"
      bind:value={pastedText}
      class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
      rows="6"
      placeholder="Paste boat listing information here"
    ></textarea>
  </div>

  <button
    on:click={extractBoatInfo}
    class="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
  >
    Extract Information
  </button>

  <div class="mt-8">
    <h2 class="text-xl font-bold mb-4">Extracted Information</h2>

    <div class="mb-4">
      <label for="sails" class="block mb-2 font-bold">Sails:</label>
      <input
        type="text"
        id="sails"
        bind:value={sails}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>

    <div class="mb-4">
      <label for="standing-rigging" class="block mb-2 font-bold">Standing Rigging:</label>
      <input
        type="text"
        id="standing-rigging"
        bind:value={standingRigging}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>

    <div class="mb-4">
      <label for="anchors" class="block mb-2 font-bold">Anchors:</label>
      <input
        type="text"
        id="anchors"
        bind:value={anchors}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>

    <div class="mb-4">
      <label for="running-rigging" class="block mb-2 font-bold">Running Rigging:</label>
      <input
        type="text"
        id="running-rigging"
        bind:value={runningRigging}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>

    <div class="mb-4">
      <label for="bottom-job" class="block mb-2 font-bold">Bottom Job:</label>
      <input
        type="text"
        id="bottom-job"
        bind:value={bottomJob}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>

    <div class="mb-4">
      <label for="dinghy" class="block mb-2 font-bold">Dinghy:</label>
      <input
        type="text"
        id="dinghy"
        bind:value={dinghy}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>

    <div class="mb-4">
      <label for="engine" class="block mb-2 font-bold">Engine:</label>
      <input
        type="text"
        id="engine"
        bind:value={engine}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>

    <div class="mb-4">
      <label for="life-raft" class="block mb-2 font-bold">Life Raft:</label>
      <input
        type="text"
        id="life-raft"
        bind:value={lifeRaft}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>

    <div class="mb-4">
      <label for="chain" class="block mb-2 font-bold">Chain:</label>
      <input
        type="text"
        id="chain"
        bind:value={chain}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>

    <div>
      <label for="epirb" class="block mb-2 font-bold">EPIRB:</label>
      <input
        type="text"
        id="epirb"
        bind:value={epirb}
        class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        readonly
      />
    </div>
  </div>
</div>