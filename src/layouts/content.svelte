<script lang="ts">
  import DragAreas from "./dragAreas.svelte";
  import { rows } from "@store/body";
  import { isDraggingContent } from "@store/drag";
  import { generateRandomSequence, ID_LENGTH } from "@src/helpers";

  export let rowId: string;
  export let columnId: string;
  export let childId: string | undefined = undefined;
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
            styles: {},
          } satisfies TextBlock;
          break;
        case "header":
          newChild = {
            id: generateRandomSequence(ID_LENGTH),
            type: "header",
            text: "New header",
            styles: {},
          } satisfies HeaderBlock;
          break;
        case "image":
          newChild = {
            id: generateRandomSequence(ID_LENGTH),
            type: "image",
            src: "",
            alt: "",
            styles: {},
          } satisfies ImageBlock;
          break;
        default:
          newChild = {
            id: generateRandomSequence(ID_LENGTH),
            type: "text",
            text: "New text",
            styles: {},
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
</script>

<DragAreas
  id={childId ? childId : columnId}
  isDragging={$isDraggingContent}
  dropHandler={drop}
  {isInitial}
>
  <slot />
</DragAreas>
