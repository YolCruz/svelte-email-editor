<script lang="ts">
  import Column from "./columns.svelte";
  import DragAreas from "./dragAreas.svelte";
  import { rows } from "@store/body";
  import { isDraggingBlock } from "@store/drag";

  export let rowId: string;
  export let widths: number[];
  export let columns: EmailColumn[];
  export let position: number;

  $: sizes = widths.map((val) => `${val}%`).join(" ");

  function sectionClick() {
    console.log("section clicked");
  }
  function drop(ev: DragEvent, target: "up" | "down") {
    ev.preventDefault();
    const type = ev.dataTransfer?.getData("component-type");
    const value = ev.dataTransfer?.getData("component-value");
    const numCols = value?.split("_")[0];
    if (type && numCols) {
      rows.addRow(Number(numCols), target === "up" ? position : position + 1);
    }
  }
</script>

<button
  class={"tw-w-full tw-outline hover:tw-outline-blue-200 -tw-outline-offset-1 tw-z-10 " +
    ($isDraggingBlock ? "tw-outline-gray-300" : " tw-outline-none")}
  on:click={sectionClick}
>
  <DragAreas id={rowId} isDragging={$isDraggingBlock} dropHandler={drop}>
    <div
      class="tw-w-10/12 tw-mx-auto tw-grid"
      style={`grid-template-columns: ${sizes};`}
    >
      {#each columns as { id: columnId, children } (columnId)}
        <Column {rowId} {columnId} {children} />
      {/each}
    </div>
  </DragAreas>
</button>
