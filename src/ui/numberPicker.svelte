<script lang="ts">
  import { writable } from "svelte/store";
  import {
    rows,
    selectedRowIndex,
    selectedColumnIndex,
    selectedChildIndex,
  } from "@store/body";
  import Counter from "@src/components/editor/counter.svelte";

  export let label: "margin" | "padding";
  export let padding: [number, number, number, number];

  const moreOptions = writable(false);

  $: if (
    !$moreOptions &&
    $selectedRowIndex !== null &&
    $selectedColumnIndex !== null &&
    $selectedChildIndex !== null
  ) {
    rows.resetChildSpaces(
      $selectedRowIndex,
      $selectedColumnIndex,
      $selectedChildIndex,
      label
    );
  }

  function updateSpacing(
    side: "Top" | "Right" | "Bottom" | "Left" | "All sides",
    operator: "-" | "+"
  ) {
    rows.updateChildSpaces(
      $selectedRowIndex!,
      $selectedColumnIndex!,
      $selectedChildIndex!,
      label,
      side,
      operator
    );
  }

  function setSpacing(
    side: "Top" | "Right" | "Bottom" | "Left" | "All sides",
    value: number
  ) {
    rows.setChildSpacing(
      $selectedRowIndex!,
      $selectedColumnIndex!,
      $selectedChildIndex!,
      label,
      side,
      value
    );
  }
</script>

<div class="tw-flex tw-flex-col tw-gap-2">
  <div class="tw-flex tw-justify-between tw-items-center">
    <p>{label}</p>
    <div class="tw-form-control">
      <label class="tw-flex tw-gap-2 tw-text-sm tw-label tw-cursor-pointer">
        <span class="tw-label-text">More options</span>
        <input
          type="checkbox"
          class="tw-toggle tw-toggle-sm"
          bind:checked={$moreOptions}
        />
      </label>
    </div>
  </div>
  {#if $moreOptions}
    <div class="tw-grid tw-grid-cols-2 tw-gap-2">
      <Counter
        value={padding[0]}
        direction={"Top"}
        updater={updateSpacing}
        setter={setSpacing}
      />
      <Counter
        value={padding[1]}
        direction={"Right"}
        updater={updateSpacing}
        setter={setSpacing}
      />
      <Counter
        value={padding[2]}
        direction={"Bottom"}
        updater={updateSpacing}
        setter={setSpacing}
      />
      <Counter
        value={padding[3]}
        direction={"Left"}
        updater={updateSpacing}
        setter={setSpacing}
      />
    </div>
  {:else}
    <Counter
      value={padding[0]}
      direction={"All sides"}
      updater={updateSpacing}
      setter={setSpacing}
    />
  {/if}
</div>
