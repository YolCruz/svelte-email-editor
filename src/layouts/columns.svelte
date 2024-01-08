<script lang="ts">
  import Content from "./content.svelte";
  import Header from "@components/header.svelte";
  import Text from "@components/text.svelte";

  export let rowId: string;
  export let columnId: string;
  export let children: Children[];
</script>

<div class="tw-w-full">
  {#each children as child, index (child.id)}
    <Content {rowId} {columnId} childId={child.id} position={index} childType={child.type}>
      {#if child.type === "text"}
        <Text {rowId} {columnId} childId={child.id} text={child.text} styles={child.styles} />
      {:else if child.type === "header"}
        <Header {rowId} {columnId} childId={child.id} text={child.text} />
      {:else if child.type === "image"}
        <img src={child.src} alt={child.alt} />
      {:else}
        <p>Unknown type</p>
      {/if}
    </Content>
  {:else}
    <Content {rowId} {columnId} position={0} isInitial={true}>
      <button
        id="content-placeholder"
        class="tw-w-full tw-bg-cyan-100 tw-border tw-border-dashed tw-border-cyan-500 tw-z-20"
        on:click|stopPropagation={() => console.log("clicked")}
      >
        <p class="tw-text-center tw-p-4">Drop content here</p>
      </button>
    </Content>
  {/each}
</div>
