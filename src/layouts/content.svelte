<script lang="ts">
  import DragAreas from "./dragAreas.svelte";
  import {
    rows,
    selectedRowId,
    selectedColumnId,
    selectedChildId,
    selectedChildType,
  } from "@store/body";
  import { isDraggingContent } from "@store/drag";
  import { generateRandomSequence, ID_LENGTH } from "@src/helpers";

  export let rowId: string;
  export let columnId: string;
  export let childId: string | undefined = undefined;
  export let childType: BlockType | undefined = undefined;
  export let position: number;
  export let isInitial = false;

  function drop(ev: DragEvent, target: "up" | "down") {
    ev.preventDefault();
    const componentType = ev.dataTransfer?.getData("component-type");
    const value = ev.dataTransfer?.getData("component-value");
    if (componentType && value) {
      let newChild: Children;
      switch (value) {
        case "text":
          newChild = {
            id: generateRandomSequence(ID_LENGTH),
            type: "text",
            text: "New text",
            styles: {
              padding: [10, 10, 10, 10],
              margin: [0, 0, 0, 0],
            },
          } satisfies TextBlock;
          break;
        case "header":
          newChild = {
            id: generateRandomSequence(ID_LENGTH),
            type: "header",
            text: "New header",
            styles: {
              padding: [10, 10, 10, 10],
              margin: [0, 0, 0, 0],
            },
          } satisfies HeaderBlock;
          break;
        case "image":
          newChild = {
            id: generateRandomSequence(ID_LENGTH),
            type: "image",
            src: "",
            alt: "",
            styles: {
              padding: [10, 10, 10, 10],
              margin: [0, 0, 0, 0],
            },
          } satisfies ImageBlock;
          break;
        default:
          newChild = {
            id: generateRandomSequence(ID_LENGTH),
            type: "text",
            text: "New text",
            styles: {
              padding: [10, 10, 10, 10],
              margin: [0, 0, 0, 0],
            },
          } satisfies TextBlock;
          break;
      }
      rows.addChild(
        rowId,
        columnId,
        target === "up" ? position : position + 1,
        newChild
      );
    }
  }

  function selectBlock() {
    if (childId && childType) {
      selectedRowId.set(rowId);
      selectedColumnId.set(columnId);
      selectedChildId.set(childId);
      selectedChildType.set(childType);
    }
  }
</script>

<DragAreas
  id={childId ? childId : columnId}
  isDragging={$isDraggingContent}
  dropHandler={drop}
  {isInitial}
  name="Content"
>
  <button class="tw-w-full" on:click={selectBlock}>
    <slot />
  </button>
</DragAreas>
