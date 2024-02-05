export interface PageItem {
  title: string;
  name: string;
  path?: string;
  hasChildren?: boolean;
  icon?: string;
  children?: PageItem[];
}
