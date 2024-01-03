<script lang="ts">
  import Sidepanel from "@ui/sidepanel.svelte";
  import { sections } from "@store";
  import ComponentLayout from "@src/layout/componentLayout.svelte";
  import SectionComp from "@src/components/sectionComp.svelte"

  function allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }

  function initialDrop(ev: DragEvent) {
    const componentType = ev.dataTransfer?.getData("component-type");
    console.log(componentType);
    if (componentType) {
      sections.addBlock(componentType, 0, `${componentType}-1`);
    }
  }

</script>

<div class="tw-m-2 md:tw-m-12">
  <div
    class="tw-flex tw-m-3 tw-flex-col md:tw-flex-row tw-gap-2"
    role="application"
  >
    <div
      role="document"
      class="tw-border tw-border-solid tw-border-black md:tw-w-3/4 tw-min-h-[13rem] tw-bg-[#E7E7E7]"
      on:dragover={allowDrop}
    >
      <div class="tw-w-96 tw-mx-auto">
        {#each $sections as { component, type, id } (id)}
          <ComponentLayout>
            <svelte:component this={component} slot="content" />
          </ComponentLayout>
        {:else}
          <SectionComp />
        {/each}
      </div>
    </div>

    <Sidepanel />
  </div>
</div>
