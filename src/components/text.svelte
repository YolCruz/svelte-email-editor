<script lang="ts">
  import DOMPurify from "dompurify";
  
  export let content: string = "Text";

  const handleInput = (ev: Event) => {
    const target = ev.target as HTMLParagraphElement;
    content = DOMPurify.sanitize(target.innerText);
  };
</script>

<p
  bind:innerHTML={content}
  contenteditable="true"
  class="focus:tw-outline-none tw-m-0"
  on:input={handleInput}
>
  {content}
</p>
