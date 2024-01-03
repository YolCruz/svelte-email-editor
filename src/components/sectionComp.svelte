<script lang="ts">
  import { sections } from "@store";

  function initialDrop(ev: DragEvent) {
    const componentType = ev.dataTransfer?.getData("component-type");
    console.log(componentType);
    if (componentType) {
      sections.addBlock(componentType, 0, `${componentType}-1`);
    }
  }
</script>

<div>
  <slot>
    <div
      id="content-placeholder"
      on:drop|preventDefault={initialDrop}
      role="article"
      class="tw-bg-cyan-100 tw-border-2 tw-border-dashed tw-border-cyan-500"
    >
      <p class="tw-text-center tw-p-4">Drop content here</p>
    </div>
  </slot>
</div>
