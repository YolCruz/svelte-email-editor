<script lang="ts">
  import Sidepanel from "@ui/sidepanel.svelte";
  import { rows } from "@store/body";
  import Row from "@src/layouts/rows.svelte";
  import { dragOverTargetId } from "@store/drag";

  function allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }
</script>

<div
  class="tw-flex tw-mx-3 tw-my-5 tw-flex-col md:tw-flex-row tw-gap-2 md:tw-m-12"
  role="application"
>
  <div
    role="document"
    class=" md:tw-w-3/4 tw-min-h-[13rem] tw-bg-[#E7E7E7]"
    on:dragover={allowDrop}
  >
    {#each $rows as { id: rowId, widths, columns }, index (`row-${rowId}`)}
      <Row {rowId} {widths} {columns} position={index} />
    {/each}
  </div>

  <Sidepanel />
  <p>Selected: {$dragOverTargetId}</p>
</div>
