
declare module 'fabric' {
  export class Canvas {
    constructor(element: HTMLCanvasElement | string, options?: any);
    setDimensions(dimensions: { width: number; height: number; }): void;
    clear(): void;
    renderAll(): void;
    dispose(): void;
    getWidth(): number;
    getHeight(): number;
    add(object: any): any;
    remove(object: any): any;
    setActiveObject(object: any): any;
    getActiveObject(): any;
    getObjects(): any[];
    isDrawingMode: boolean;
    backgroundColor: string;
  }

  export class Object {
    constructor(options?: any);
    set(properties: any): any;
    get(property: string): any;
    scale(value: number): any;
    rotate(angle: number): any;
    toDataURL(options?: any): string;
  }

  export class Rect extends Object {
    constructor(options?: any);
  }

  export class Circle extends Object {
    constructor(options?: any);
  }

  export class Image extends Object {
    static fromURL(url: string, callback: (img: any) => void): void;
    static fromURL(url: string, options?: any): Promise<any>;
  }

  export class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
  }

  export class Text extends Object {
    constructor(text: string, options?: any);
    text: string;
  }
}
