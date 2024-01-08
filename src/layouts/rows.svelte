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

<DragAreas
  id={rowId}
  isDragging={$isDraggingBlock}
  dropHandler={drop}
  showArea={$isDraggingBlock}
  name="Row"
>
  <div
    class="tw-w-10/12 tw-mx-auto tw-grid"
    style={`grid-template-columns: ${sizes};`}
  >
    {#each columns as { id: columnId, children } (columnId)}
      <Column {rowId} {columnId} {children} />
    {/each}
  </div>
</DragAreas>
