<script lang="ts">
  import {
    isDraggingContent,
    isDraggingBlock,
    dragOverTargetId,
    dragOverTargetDirection,
  } from "@store/drag";
  import { selectedBlockId } from "@store/body";

  function drag(ev: DragEvent) {
    const target = ev.target as HTMLButtonElement;
    const type = target.getAttribute("data-type");
    const value = target.getAttribute("data-value");

    if (type && value) {
      ev.dataTransfer?.setData("component-type", type);
      ev.dataTransfer?.setData("component-value", value);

      type === "row" ? isDraggingBlock.set(true) : isDraggingContent.set(true);
    }
  }

  function dragEnd() {
    isDraggingContent.set(false);
    isDraggingBlock.set(false);
    dragOverTargetId.set("");
    dragOverTargetDirection.set(null)
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
            data-type="content"
            data-value="header"
            draggable="true"
            on:dragstart={drag}
            on:dragend|preventDefault={dragEnd}
          >
            Header
          </button>
          <button
            data-type="content"
            data-value="text"
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
        <h1 class="tw-font-bold tw-text-lg">Rows</h1>
        <div class="tw-border-t tw-border-gray-300 tw-pt-2 tw-flex tw-gap-2">
          <button
            data-type="row"
            data-value="1_section"
            draggable="true"
            on:dragstart={drag}
            on:dragend|preventDefault={dragEnd}
            class="tw-p-1 tw-border tw-border-black tw-rounded-lg"
          >
            1 column
          </button>
          <button
            data-type="row"
            data-value="2_sections"
            draggable="true"
            on:dragstart={drag}
            on:dragend|preventDefault={dragEnd}
            class="tw-p-1 tw-border tw-border-black tw-rounded-lg"
          >
            2 columns
          </button>
          <!-- Add more buttons as needed -->
        </div>
      </div>
    </div>
  {/if}
</div>
