<script lang="ts">
  import { selectedBlockId, isDraggingElement } from "@store";

  function drag(ev: DragEvent) {
    const target = ev.target as HTMLButtonElement;
    ev.dataTransfer?.setData("component-type", target.id);

    isDraggingElement.set(true);
  }

  function dragEnd() {
    isDraggingElement.set(false);
  }
</script>

<div class="tw-p-3 tw-border tw-solid tw-border-black">
  {#if $selectedBlockId}
    <div class="tw-grid tw-grid-cols-2 gap-3">
      <label for="padding">Padding:</label>
      <input name="padding" type="number" />
      <label for="margin">Margin:</label>
      <input name="margin" type="number" />
      <label for="background color">Background Color:</label>
      <input name="background color" type="color" />
      <label for="text color">Text Color:</label>
      <input name="text color" type="color" />
      <button on:click={() => selectedBlockId.set(null)}>Done</button>
    </div>
  {:else}
    <div class="tw-flex tw-flex-col tw-gap-4 tw-select-none">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <h1 class="tw-font-bold tw-text-lg">Content</h1>
        <div class="tw-border-t tw-border-gray-300 tw-pt-2">
          <button
            id="h1"
            draggable="true"
            on:dragstart={drag}
            on:dragend|preventDefault={dragEnd}
          >
            Header
          </button>
          <button
            id="p"
            draggable="true"
            on:dragstart={drag}
            on:dragend|preventDefault={dragEnd}
          >
            Text
          </button>
          <!-- Add more buttons as needed -->
        </div>
      </div>
      <div>
        <h1 class="tw-font-bold tw-text-lg">Blocks</h1>
        <div class="tw-border-t tw-border-gray-300 tw-pt-2 tw-flex tw-gap-2">
          <button
            id="1_section"
            draggable="true"
            on:dragstart={drag}
            on:dragend|preventDefault={dragEnd}
            class="tw-p-1 tw-border tw-border-black tw-rounded-lg"
          >
            Section 1 column
          </button>
          <button
            id="2_sections"
            draggable="true"
            on:dragstart={drag}
            on:dragend|preventDefault={dragEnd}
            class="tw-p-1 tw-border tw-border-black tw-rounded-lg"
          >
            Section 2 columns
          </button>
          <!-- Add more buttons as needed -->
        </div>
      </div>
    </div>
  {/if}
</div>
