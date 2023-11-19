<script lang="ts">
  import DOMPurify from "dompurify";
  
  export let content: string = "Header";

  const handleInput = (ev: Event) => {
    const target = ev.target as HTMLParagraphElement;
    content = DOMPurify.sanitize(target.innerText);
  };
</script>

<h1
  bind:innerHTML={content}
  contenteditable="true"
  class="focus:tw-outline-none tw-m-0"
  on:input={handleInput}
>
  {content}
</h1>
