export interface PageItem {
  title: string;
  path?: string;
  hasChildren?: boolean;
  icon?: string;
  children?: PageItem[];
}
