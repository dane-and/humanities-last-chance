
/**
 * Basic type definitions for the fabric.js library
 * These are simplified definitions to prevent TypeScript errors
 * while maintaining compatibility with our codebase
 */

declare module 'fabric' {
  export class Canvas {
    constructor(
      element: HTMLCanvasElement | string,
      options?: {
        width?: number;
        height?: number;
        backgroundColor?: string;
        preserveObjectStacking?: boolean;
        enableRetinaScaling?: boolean;
        renderOnAddRemove?: boolean;
      }
    );
    
    // Basic canvas methods
    setDimensions(dimensions: { width: number; height: number }): void;
    renderAll(): void;
    clear(): void;
    dispose(): void;
    add(...objects: Object[]): void;
    remove(...objects: Object[]): void;
    getObjects(): Object[];
    getActiveObject(): Object | null;
    setActiveObject(object: Object): void;
    getWidth(): number;
    getHeight(): number;
    
    // Canvas properties
    freeDrawingBrush: {
      color: string;
      width: number;
    };
    isDrawingMode: boolean;
    backgroundColor: string;
  }
  
  export class Object {
    constructor(options?: any);
    
    // Common object properties and methods
    left: number;
    top: number;
    width: number;
    height: number;
    scale(scale: number): void;
    rotate(angle: number): void;
    set(options: any): void;
    toObject(): any;
    
    // Type identifier
    type: string;
    get(prop: string): any;
  }
  
  export class Image extends Object {
    static fromURL(url: string, options?: any): Promise<Image>;
    
    // Image-specific properties
    width: number;
    height: number;
    crossOrigin: string;
  }
  
  export class Rect extends Object {
    constructor(options?: any);
  }
  
  export class Circle extends Object {
    constructor(options?: any);
    radius: number;
  }
  
  export class Text extends Object {
    constructor(text: string, options?: any);
    text: string;
    fontSize: number;
    fontFamily: string;
  }
  
  export class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
  }
}
