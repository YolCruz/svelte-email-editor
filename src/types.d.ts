interface Sections {
  type: string;
  columns: number;
  parentId: string;
  children: ContentBlock[];
  //component: import("svelte").ComponentType // svelte component
}

type ContentBlock = ImageBlock | TextBlock;

interface Block {
  type: string;
  styles: any;
}

interface ImageBlock extends Block {
  src: string;
  alt: string;
}

interface TextBlock extends Block {
  text: string;
}