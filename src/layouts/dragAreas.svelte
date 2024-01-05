<script lang="ts">
  import { derived } from "svelte/store";
  import { dragOverTargetId, dragOverTargetDirection } from "@store/drag";

  export let id: string;
  export let isDragging: boolean;
  export let dropHandler: (ev: DragEvent, target: "up" | "down") => void;
  export let isInitial = false;

  const childIsTarget = derived(
    dragOverTargetId,
    ($dragOverTargetId) => $dragOverTargetId === id
  );

</script>

<div
  class="tw-relative tw-w-full"
  role="none"
  on:dragenter={() => isDragging && dragOverTargetId.set(id)}
>
  <!-- Upper drag area -->
  <div
    role="none"
    class={"tw-absolute tw-inset-x-0 tw-top-0 " +
      (isDragging ? "tw-z-30" : "tw-hidden") +
      " " +
      (isInitial ? "tw-bottom-0" : "tw-bottom-1/2")}
    on:drop={(ev) => dropHandler(ev, "up")}
    on:dragenter={() => dragOverTargetDirection.set("up")}
  >
    <div
      class={"tw-absolute tw-w-full tw-h-full tw-border-t-2 tw-border-blue-400 " +
        (isDragging && $childIsTarget && $dragOverTargetDirection === "up"
          ? "tw-z-40"
          : "tw-hidden")}
    >
      <p
        class="tw-bg-blue-400 tw-w-fit tw-mx-auto -tw-translate-y-1/2 tw-py-1 tw-px-2 tw-rounded-full tw-text-white tw-text-xs"
      >
        Drop here
      </p>
    </div>
  </div>
  <slot />
  <!-- Lower drag area -->
  <div
    role="none"
    class={"tw-absolute tw-inset-x-0 tw-top-1/2 tw-bottom-0 " +
      (isDragging && !isInitial ? "tw-z-30" : "tw-hidden")}
    on:drop={(ev) => dropHandler(ev, "down")}
    on:dragenter={() => dragOverTargetDirection.set("down")}
  >
    <div
      class={"tw-relative tw-w-full tw-h-full tw-border-b-2 tw-border-blue-400 " +
        (isDragging && $childIsTarget && $dragOverTargetDirection === "down"
          ? "tw-z-40"
          : "tw-hidden")}
    >
      <p
        class="tw-absolute tw-bg-blue-400 tw-w-fit tw-mx-auto tw-inset-x-0 tw-bottom-0 tw-translate-y-1/2 tw-py-1 tw-px-2 tw-rounded-full tw-text-white tw-text-xs"
      >
        Drop here
      </p>
    </div>
  </div>
</div>
