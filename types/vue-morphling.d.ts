import type { Directive } from 'vue';

/** A Vue plugin that works with both `Vue.use()` (Vue 2) and `app.use()` (Vue 3). */
export interface MorphPlugin {
  install (app: any): void;
}

/** Options forwarded to filesize (https://github.com/avoidwork/filesize.js). */
export type FileSizeOptions = Record<string, unknown>;

/** Keys of T whose values are numbers (arrSort compares with `a[key] - b[key]`). */
type NumericKeys<T> = { [K in keyof T]: T[K] extends number ? K : never }[keyof T];

/** The plain functions behind every filter. */
export interface MorphFilters {
  age (date: Date | number | string): number;
  arrReverse<T> (value: T[]): T[];
  arrSort<T> (value: T[], key: NumericKeys<T>, direction: 'asc' | 'desc'): T[];
  capitalize (value: unknown): string;
  chop (value: unknown, length: number, location?: 'start' | 'end'): string;
  currency (value: unknown, code?: string): string;
  dateFormat (value: Date | number | string, format: string): string;
  /** `undefined` (with a console warning) when `value` is not numeric. */
  fileSize (value: number | string, options?: FileSizeOptions): string | undefined;
  json (value: unknown, indent?: number | string): string;
  lowercase (value: unknown): string;
  objectSize (value: unknown, options?: FileSizeOptions): string;
  placeholder<T> (value: unknown, placeholder: T): T;
  replace (value: string, search: string | RegExp, replacement: string): string;
  reverse (value: unknown): string;
  sandwich (value: unknown, start?: string, end?: string): string;
  truncate (value: string, length: number): string;
  uppercase (value: unknown): string;
}

export declare const morphFilters: MorphFilters;

export declare const VueMorphling: MorphPlugin;

export declare const morphAge: MorphPlugin;
export declare const morphArrReverse: MorphPlugin;
export declare const morphArrSort: MorphPlugin;
export declare const morphCapitalize: MorphPlugin;
export declare const morphChop: MorphPlugin;
export declare const morphCurrency: MorphPlugin;
export declare const morphDateFormat: MorphPlugin;
export declare const morphFileSize: MorphPlugin;
export declare const morphJson: MorphPlugin;
export declare const morphLowerCase: MorphPlugin;
export declare const morphObjectSize: MorphPlugin;
export declare const morphPlaceholder: MorphPlugin;
export declare const morphReplace: MorphPlugin;
export declare const morphReverse: MorphPlugin;
export declare const morphSandwich: MorphPlugin;
export declare const morphTruncate: MorphPlugin;
export declare const morphUpperCase: MorphPlugin;

export declare const vMorphUrl: MorphPlugin;
export declare const vMorphEmail: MorphPlugin;
export declare const vMorphHighlight: MorphPlugin;

type MorphGlobals = {
  [K in keyof MorphFilters as `$morph${Capitalize<K & string>}`]: MorphFilters[K];
};

// `this.$morph*` / `{{ $morph*() }}` in templates (Vue 3, and Vue 2.7).
declare module 'vue' {
  interface ComponentCustomProperties extends MorphGlobals {}

  interface GlobalDirectives {
    /** Turns http(s)/ftp URLs in the element's text into links. Value: inline style for the links. */
    vMorphUrl: Directive<HTMLElement, string | undefined>;
    /** Turns email addresses in the element's text into mailto links. */
    vMorphEmail: Directive<HTMLElement, undefined>;
    /** Highlights a term. Value: `'term::color'`. */
    vMorphHighlight: Directive<HTMLElement, string>;
  }
}
