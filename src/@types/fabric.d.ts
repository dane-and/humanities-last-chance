
declare module 'fabric' {
  export class Canvas {
    add(...objects: Object[]): Canvas;
    clear(): Canvas;
    dispose(): void;
    getWidth(): number;
    getHeight(): number;
    setWidth(value: number): void;
    setHeight(value: number): void;
    renderAll(): void;
    getObjects(): Object[];
    getActiveObject(): Object | null;
    setActiveObject(object: Object): Canvas;
    remove(object: Object): Canvas;
    getElement(): HTMLCanvasElement;
    getCenter(): { top: number, left: number };
    setViewportTransform(transform: number[]): Canvas;
    zoomToPoint(point: Point, value: number): Canvas;
    getZoom(): number;
    toObject(): any;
  }

  export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
  }

  export class Object {
    set(key: string | object, value?: any): Object;
    get(key: string): any;
    setCoords(): void;
    getBoundingRect(): { top: number, left: number, width: number, height: number };
    toObject(): any;
    on(event: string, callback: Function): Object;
    setControlsVisibility(options: object): Object;
    remove(): void;
  }

  export class Image extends Object {
    static fromURL(url: string, callback: (image: Image) => void, options?: object): void;
    width: number;
    height: number;
    scaleX: number;
    scaleY: number;
    clipPath: Object | null;
  }

  export class Rect extends Object {
    width: number;
    height: number;
    left: number;
    top: number;
  }

  export interface FabricObject extends Object {}
  export interface FabricCanvas extends Canvas {}
  export interface FabricImage extends Image {}
}
