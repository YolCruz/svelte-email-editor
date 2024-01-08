<script lang="ts">
  import { derived } from "svelte/store";
  import {
    rows,
    selectedRowIndex,
    selectedColumnIndex,
    selectedChildIndex,
  } from "@store/body";
  import NumberPicker from "./numberPicker.svelte";

  const styles = derived(
    [rows, selectedRowIndex, selectedColumnIndex, selectedChildIndex],
    ([$rows, $selectedRowIndex, $selectedColumnIndex, $selectedChildIndex]) => {
      if (
        $selectedRowIndex !== null &&
        $selectedColumnIndex !== null &&
        $selectedChildIndex !== null
      ) {
        return $rows[$selectedRowIndex].columns[$selectedColumnIndex].children[
          $selectedChildIndex
        ].styles;
      } else {
        return null;
      }
    }
  );
</script>

{#if $styles}
  <div class="tw-flex tw-flex-col tw-gap-2">
    <NumberPicker label="padding" padding={$styles.padding} />
  </div>
{:else}
  <p class="tw-text-center">No styles found</p>
{/if}
