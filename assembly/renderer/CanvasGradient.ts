import { add_color_stop, remove_gradient } from "../linked";
var id: i32 = 0;

export class CanvasGradient {
  _id: i32 = id++;

  public addColorStop(point: f64, color: string): void {
    add_color_stop(this._id, point, color);
  }

  public dispose(): void {
    remove_gradient(this._id);
  }
}