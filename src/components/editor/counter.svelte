<script lang="ts">
  export let direction: "Left" | "Right" | "Top" | "Bottom" | "All sides" =
    "All sides";
  export let value: number;

  export let updater: (
    side: "Top" | "Right" | "Bottom" | "Left" | "All sides",
    operator: "-" | "+"
  ) => void;
  export let setter: (
    side: "Top" | "Right" | "Bottom" | "Left" | "All sides",
    value: number
  ) => void;

  function setValue(ev: Event) {
    const target = ev.target as HTMLInputElement;
    const newValue = parseInt(target.value, 10);
    setter(direction, newValue);
  }
</script>

<div>
  <p>{direction}</p>
  <div>
    <button
      on:click={() => updater(direction, "-")}
      class="tw-h-full tw-px-2 tw-border">-</button
    >
    <input
      inputmode="numeric"
      type="number"
      min="0"
      max="100"
      bind:value
      class="tw-outline-blue-300"
      on:input={setValue}
    />
    <button
      on:click={() => updater(direction, "+")}
      class="tw-h-full tw-px-2 tw-border">+</button
    >
  </div>
</div>

<style>
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
    text-align: center;
  }
</style>
