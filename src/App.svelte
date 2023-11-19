<script lang="ts">
  import Sidepanel from "@ui/sidepanel.svelte";
  import { contentBlocks } from "@store";
  import Main from "@src/layout/main.svelte";
  import ComponentLayout from "@src/layout/componentLayout.svelte";

  function allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }

  function initialDrop(ev: DragEvent) {
    const componentType = ev.dataTransfer?.getData("component-type");
    console.log(componentType);
    if (componentType) {
      contentBlocks.addBlock(componentType, 0, `${componentType}-1`);
    }
  }
</script>

<Main>
  <div
    class="tw-flex tw-m-3 tw-flex-col md:tw-flex-row tw-gap-2"
    role="application"
  >
    <div
      role="document"
      class="tw-border tw-border-solid tw-border-black md:tw-w-3/4 tw-min-h-[13rem] tw-bg-stone-500 tw-bg-opacity-40"
      on:dragover={allowDrop}
    >
      <div id="components" class="tw-border tw-border-black tw-m-2">
        {#each $contentBlocks as { component, type, id } (id)}
          <ComponentLayout>
            <svelte:component this={component} slot="content" />
          </ComponentLayout>
        {:else}
          <div
            id="content-placeholder"
            on:drop|preventDefault={initialDrop}
            role="article"
          >
            <p class="tw-text-center tw-text-gray-500 tw-p-4">
              Drag and drop components here
            </p>
          </div>
        {/each}
      </div>
    </div>

    <Sidepanel />
  </div>
</Main>
