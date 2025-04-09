
declare module 'fabric' {
  export class Canvas {
    constructor(element: HTMLCanvasElement | string, options?: any);
    setDimensions(dimensions: { width: number; height: number; }): void;
    clear(): void;
    renderAll(): void;
    dispose(): void;
    getWidth(): number;
    getHeight(): number;
    add(object: Object | Object[]): Canvas;
    remove(object: Object | Object[]): Canvas;
    setActiveObject(object: Object): Canvas;
    getActiveObject(): Object | null;
    getObjects(): Object[];
    freeDrawingBrush: {
      color: string;
      width: number;
    };
    isDrawingMode: boolean;
    backgroundColor: string;
  }

  export class Object {
    constructor(options?: any);
    set(properties: any): Object;
    get(property: string): any;
    toObject(): any;
    setCoords(): void;
    scale(value: number): Object;
    rotate(angle: number): Object;
    toDataURL(options?: any): string;
    type?: string;
  }

  export class Rect extends Object {
    constructor(options?: any);
  }

  export class Circle extends Object {
    constructor(options?: any);
  }

  export class Image extends Object {
    static fromURL(url: string, options?: any): Promise<Image>;
    width?: number;
    height?: number;
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
