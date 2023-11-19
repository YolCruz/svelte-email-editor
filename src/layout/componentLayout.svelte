<script lang="ts">
  import { selectedBlockId, isDraggingElement } from "@store";

  export let id: string = "text-1";
  export let padding: number = 15;
  export let backgroundColor: string = "#ffffff";
  export let color: string = "#000000";

  const textStyle = {
    padding: `${padding}px`,
    backgroundColor,
    color,
  };

  /**
   * When the block is clicked, focus the inner text with the carret at the end of it
   */
  const blockClick = (ev: MouseEvent) => {
    selectedBlockId.set(id);
    const element = ev.target as HTMLButtonElement;
    const child = element.firstChild as HTMLParagraphElement;

    if (child && child.nodeName === "P") {
      child.focus();

      // Create a range and select the node
      const range = document.createRange();
      range.selectNodeContents(child);

      // Collapse the range to the end point of the selection
      range.collapse(false);

      // Get the selection object
      const selection = window.getSelection();

      // Remove any current selections and add the new range
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const drop = (ev: DragEvent) => {
    ev.preventDefault();
    console.log("drop");
  };
</script>

<div
  style:padding={textStyle.padding}
  style:backgroundColor={textStyle.backgroundColor}
  style:color={textStyle.color}
  id="drag-area"
  class="tw-relative tw-w-full"
>
  <div
    id="drag-upper-area"
    role="none"
    class={"tw-absolute tw-inset-x-0 tw-top-0 tw-bottom-1/2 tw-bg-rose-300 tw-bg-opacity-50 " +
      ($isDraggingElement ? "tw-z-20" : "-tw-z-10")}
    on:drop|preventDefault={(ev) => {
      console.log("upper");
    }}
  />
  <button
    id="text-container"
    tabindex="0"
    on:click={blockClick}
    class="tw-flex tw-z-10 tw-cursor-text tw-w-full tw-text-left tw-border tw-border-black"
  >
    <slot name="content"/>    
  </button>
  <div
    id="drag-lower-area"
    role="none"
    class={"tw-absolute tw-inset-x-0 tw-top-1/2 tw-bottom-0 tw-bg-blue-300 tw-bg-opacity-50 " +
      ($isDraggingElement ? "tw-z-20" : "-tw-z-10")}
    on:drop|preventDefault={(ev) => {
      console.log("lower");
    }}
  />
</div>