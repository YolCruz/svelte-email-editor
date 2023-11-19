interface ContentBlock {
  id: string;
  type: string;
  component: import("svelte").ComponentType // svelte component
  styles: any // css styles
}