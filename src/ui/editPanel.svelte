<script lang="ts">
  import {
    selectedRowId,
    selectedColumnId,
    selectedChildId,
    selectedChildType,
  } from "@store/body";
  import EditText from "./editText.svelte";

  function done() {
    selectedRowId.set(null);
    selectedColumnId.set(null);
    selectedChildId.set(null);
    selectedChildType.set(null);
  }
</script>

<div class="tw-flex tw-flex-col tw-gap-3">
  {#if $selectedChildType === "text"}
    <EditText />
  {/if}
  <button on:click={done}> Done </button>
</div>
