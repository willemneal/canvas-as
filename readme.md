# canvas-as

A small canvas rendering framerwork powered by `AssemblyScript` 🎉🎉🎉.

## About

The `canvas-as` framework is a fun project that utilizes a lot of the hard work provided by the AssemblyScript project, which actually turned out to be quite performant! It avoids using repeated function calls over the wasm bridge, and compiles a set of canvas instructions to make drawing onto a canvas much easier from within `AssemblyScript`.  

## Goal

To provide a performant framework for utilizing the `CanvasRenderingContext2D`prototype in the browser, while following the javascript specification as closely as possible, and deviating where it makes sense.

## Current Compatibility

Currently, `canvas-as` supports the following things:

- Rendering and tracking canvas paths
- Optimizing calls to setTransfrom and style properties via `OptimizedCanvasRenderingContext2D`
- fillStyles and strokeStyles: strings, patterns, and gradients
- Loading images from within the browser via the `Image#src` property
- Virtual `ctx#save` and `ctx#restore` function calls which actually modify the assemblyscript canvas context itself

On the roadmap, we plan to support:

- Injecting image references into AssemblyScript (for image loading/preloading)
- modifying style properties on the canvas
- Garbage collection calls to the JS host to do memory cleanup (when AssemblyScript finally supports `@destructor`)
- A declarative renderer (if AssemblyScript allows us to return `struct`s on the stack instead of on the heap via multi-valued parameters)

# Usage

## Installation

First, install `canvas-as` and `assemblyscript`:

```
npm install --save jtenner/canvas-as assemblyscript/assemblyscript
```
or...

```
yarn add jtenner/canvas-as assemblyscript/assemblyscript
```

## Start Assemblyscript

Then we need to create an `assemblyscript` project:

```
npx asinit .
```

or...

```
yarn asinit .
```

## Create the AssemblyScript entry point

Edit `assembly/index.ts` to contain the following things:

1. an import to `"../node_modules/canvas-as/assembly"` because we will consume the library directly
1. an `init(): void` function to be called after the wasm module is properly loaded
1. an `update(): void` function to be called once every time the `CanvasASInterop#update` function is called
1. a `draw(): Float64Array` function to be called once every time the `CanvasASInterop#draw` function is called

For example:

```ts
// You need to import your own allocator
import "allocator/tlsf";

// import CanvasRenderingContext2D and Image
import { CanvasRenderingContext2D, Image } from "./index";

let ctx: CanvasRenderingContext2D = new CanvasRenderingContext2D();
let kitten: Image = new Image();
let rotation: f64 = 0;
let rotValue: f64 = Math.PI / 180.0;

export function init(): void {
  // You cannot load an image until the wasm module has been completely loaded
  kitten.src = "https://placekitten.com/300/300";
  // contexts must be initialized until the `constructor()` bugs are fixed in assemblyscript on the main branch
  ctx.init();
}

export function update(): void {
  // rotate the cat
  rotation += rotValue;
}

export function draw(): Float64Array {
  // perform some simple drawing calls
  ctx.clearRect(0.0, 0.0, 800.0, 600.0);
  ctx.save();
  ctx.translate(150.0, 150.0);
  ctx.rotate(rotation);
  ctx.translate(-150.0, -150.0);
  ctx.drawImagePosition(kitten, 0.0, 0.0);
  ctx.restore();

  // We must always return a reference to a `Float64Array`. The commit function is repurposed for the AssemblyScript context
  return ctx.commit();
}

export { memory }
```

## Glue Code Setup

The setup uses glue code provided by the `AssemblyScript` loader. Currently the only way to instantiate a `canvas-as` module is to use the constructor, and a fetch call.

```ts
// import the canvas interop
import { CanvasASInterop } from "canvas-as";

// create a context
const ctx = document.querySelector("canvas").getContext("2d");
const imports: any = {
  // put your imports here
};

// use an async function to load your module
async function main(): Promise<void> {
  const interop: CanvasASInterop = new CanvasASInterop(ctx, fetch("./path/to/optimized.wasm"), imports);

  // just need to wait for the module to instantiate
  await interop.loaded;

  // init() is called in assemblyscript for you

  // setup a request animation frame loop
  requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);

    // call update() and draw()
    interop.update();

    // draw automatically passes the `Float64Array` reference to the internal `#render()` function
    interop.draw();
  });
}

main();
```

## OptimizedCanvasRenderingContext2D

This renderer is used when you want to minimize the number of javascript function calls. It's an exact drop in replacement for the `CanvasRenderingContext2D` class that only emits `setTransform`s and modified properties when they need to be modified.

For instance, take the following example.

```ts
var ctx = new OptimizedCanvasRenderingContext2D();

ctx.beginPath();
ctx.moveTo(10.0, 10.0);
ctx.translate(100.0, 100.0);
ctx.lineTo(100.0, 100.0);
ctx.rotate(200.0);

// the above instructions are effectively ignored, except for the `rotate` and `translate` functions
ctx.beginPath();
ctx.rect(100.0, 100.0, 100.0, 100.0);
ctx.stroke();
```

In this case, the first path created with `beginPath()` gets effectively ignored by the browser.

There is no reason to actually call those functions when `draw()` is called.

Instead, the `OptimizedCanvasRenderingContext2D` emits *no* instructions and waits until a `fill()` or a `stroke()` is called. Thus when it gets to the `ctx.stroke()` call, it checks to see if the transform changed since the last time the `transform` property was updated, and emits a single `setTransform()` instruction, a `rect()` instruction, and a `stroke()` instruction.

This costs more cpu power from within wasm, but doing cpu intensive things without garbage collection is what wasm does best!

# Roadmap

There are a bunch of problems that `canvas-as` currently does not solve.

- Canvas mouse events
- Canvas touch events
- Canvas keyboard event
- object lifetime management (managed object disposal and re-use with `@deconstructor` when AS supports it)
- Canvas style management (changing the cursor, element size, etc)

These things are all techincally possible with the exception of object lifetime management which is currently under development by the AssemblyScript team. Once destructors are supported, `canvas-as` will automatically perform memory management for you.

As for all the other sort of canvas events and image injection, pull requests are 1000% welcome! Please feel free to contribute.

## Using Parcel?

Note that when using `parcel-bundler`, you must use the `fs.readFileSync()` method to import your wasm into a buffer, since importing the wasm file directly bypasses the `assemblyscript` loader.  The following glue code is unfortunately necessary:

```ts
const fs = require("fs");
const buff = fs.readFileSync("./build/untouched.wasm");
const blob = new Blob([buff], { type: "application/wasm" });
const url = URL.createObjectURL(blob);
const imports = {};

const interop = new CanvasAS.CanvasASInterop(ctx, fetch(url), imports);
```

Loading images using the canvas interop happens like this now:

```ts
// ./src/index.ts
const source: string = require("./path/to/image.png");
interop.injectImage("image-name", fetch(source));
```

Then inside your assemblyscript application:

```ts
// ./assembly/index.ts
if (TextureMap.has("image-name")) {
  // this image may not be loaded yet
  image = TextureMap.get("image-name");
}
```

Don't forget to check to see if the image has been `loaded` before creating a pattern with it.

## License

```
Copyright (c) 2018 Joshua Tenner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
