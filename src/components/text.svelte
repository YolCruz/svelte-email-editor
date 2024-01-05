<script lang="ts">
  import { writable } from "svelte/store";
  import DOMPurify from "dompurify";
  import { selectedBlockId, rows } from "@store/body";

  export let rowId: string;
  export let columnId: string;
  export let childId: string;
  export let text: string;

  const _text = writable(text);

  const blockClick = (ev: MouseEvent) => {
    selectedBlockId.set(childId);
  };

  const handleInput = (ev: Event) => {
    const target = ev.target as HTMLParagraphElement;
    const textString = DOMPurify.sanitize(target.innerText);
    _text.set(textString);
    rows.updateChildText(rowId, columnId, childId, textString);
  };
</script>

<button
  on:click={blockClick}
  class="tw-w-full tw-cursor-text tw-text-left tw-p-2"
>
  <p
    bind:innerHTML={text}
    contenteditable="true"
    class="focus:tw-outline-none tw-m-0"
    on:input={handleInput}
  >
    {text}
  </p>
</button>
