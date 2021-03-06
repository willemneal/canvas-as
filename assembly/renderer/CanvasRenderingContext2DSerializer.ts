import {
  CanvasInstruction,
  Direction,
  FillRule,
  GlobalCompositeOperation,
  ImageSmoothingQuality,
  LineCap,
  LineJoin,
  TextAlign,
  TextBaseline,
} from "../../src/shared";
import { Serializer } from "./Serializer";
import { Image, ImageData } from "../primitives";
import {
  create_string,
  get_image_data,
  put_image_data,
  put_image_data_dirty,
  inspect,
  log,
} from "../linked";
import { CanvasPattern } from "./CanvasPattern";
import { CanvasGradient } from "./CanvasGradient";
import { render } from "../linked";

const HEADER_SIZE = (offsetof<String>() + 1) & ~1;
const FNV_OFFSET: u32 = 2166136261;
const FNV_PRIME: u32 = 16777619;

function hashStr(key: string): u32 {
  var v = FNV_OFFSET;
  for (let i: usize = 0, k: usize = key.length << 1; i < k; ++i) {
    v = (v ^ <u32>load<u8>(changetype<usize>(key) + i, HEADER_SIZE)) * FNV_PRIME;
  }
  return v;
}

export class CanvasRenderingContext2DSerializer extends Serializer<CanvasInstruction> {
  public _id: string = "";
  private _stringHashes: f64[] = new Array<f64>(0);
  private _stringHashIndex: i32 = 0;
  public init(): void {
    super.init();
  }

  public commit(): void {
    if (super.index == 0) return;
    this.write_commit();
    super.index = 0;
    for (var i = 0; i < this._stringHashes.length; i++) {
      unchecked(this._stringHashes[i] = 0.0);
    }
    render(this._id, this.data);
  }

  public inspect(): void {
    this.write_inspect();
    inspect(this.data);
  }

  public getImageData(sx: i32, sy: i32, sw: i32, sh: i32): ImageData {
    var ref: ImageData = new ImageData(1, 2, false);
    get_image_data(this._id, ref, sx, sy, sw, sh);
    return ref;
  }

  public putImageData(imageData: ImageData, dx: i32, dy: i32): void {
    this.commit();
    put_image_data(this._id, imageData, dx, dy);
  }

  public putImageDataDirty(imageData: ImageData,  dx: i32, dy: i32, dirtyX: i32, dirtyY: i32, dirtyWidth: i32, dirtyHeight: i32): void {
    this.commit();
    put_image_data_dirty(this._id, imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
  }

  @inline
  protected write_arc(x: f64, y: f64, radius: f64, startAngle: f64, endAngle: f64, anticlockwise: bool): void {
    this.write_six(
      CanvasInstruction.Arc,
      x,
      y,
      radius,
      startAngle,
      endAngle,
      anticlockwise ? 1.0 : 0.0,
    );
  }

  @inline
  protected write_arc_to(x1: f64, y1: f64, x2: f64, y2: f64, radius: f64): void {
    this.write_five(
      CanvasInstruction.ArcTo,
      x1,
      y1,
      x2,
      y2,
      radius,
    );
  }

  @inline
  protected write_begin_path(): void {
    this.write_zero(CanvasInstruction.BeginPath);
  }

  @inline
  protected write_bezier_curve_to(cp1x: f64, cp1y: f64, cp2x: f64, cp2y: f64, x: f64, y: f64): void {
    this.write_six(
      CanvasInstruction.BezierCurveTo,
      cp1x,
      cp1y,
      cp2x,
      cp2y,
      x,
      y,
    );
  }

  @inline
  protected write_clear_rect(x: f64, y: f64, width: f64, height: f64): void {
    this.write_four(
      CanvasInstruction.ClearRect,
      x,
      y,
      width,
      height,
    );
  }

  @inline
  protected write_clip(fillRule: FillRule): void {
    this.write_one(
      CanvasInstruction.Clip,
      <f64>fillRule,
    );
  }

  @inline
  protected write_close_path(): void {
    this.write_zero(CanvasInstruction.ClosePath);
  }

  @inline
  protected write_direction(value: Direction): void {
    this.write_one(
      CanvasInstruction.Direction,
      <f64>value,
    );
  }

  @inline
  protected write_draw_focus_if_needed(): void {
    this.write_zero(CanvasInstruction.DrawFocusIfNeeded);
  }

  @inline
  protected write_draw_image(img: Image, sx: f64, sy: f64, swidth: f64, sheight: f64, x: f64, y: f64, width: f64, height: f64): void {
    this.write_nine(
      CanvasInstruction.DrawImage,
      <f64>img._index,
      sx,
      sy,
      swidth,
      sheight,
      x,
      y,
      width,
      height,
    );
  }

  @inline
  protected write_ellipse(x: f64, y: f64, radiusX: f64, radiusY: f64, rotation: f64, startAngle: f64, endAngle: f64, anticlockwise: bool): void {
    this.write_eight(
      CanvasInstruction.Ellipse,
      x,
      y,
      radiusX,
      radiusY,
      rotation,
      startAngle,
      endAngle,
      anticlockwise ? 1.0 : 0.0,
    );
  }

  @inline
  protected write_fill(fillRule: FillRule = FillRule.nonzero): void {
    this.write_one(
      CanvasInstruction.Fill,
      <f64>fillRule,
    );
  }

  @inline
  protected write_fill_gradient(fillGradient: CanvasGradient): void {
    this.write_one(
      CanvasInstruction.FillGradient,
      <f64>fillGradient._id,
    );
  }

  @inline
  protected write_fill_pattern(fillPattern: CanvasPattern): void {
    this.write_one(
      CanvasInstruction.FillPattern,
      <f64>fillPattern._id,
    );
  }

  @inline
  protected write_fill_rect(x: f64, y: f64, width: f64, height: f64): void {
    this.write_four(
      CanvasInstruction.FillRect,
      x,
      y,
      width,
      height,
    );
  }

  @inline
  protected write_fill_style(value: string): void {
    this.write_one(
      CanvasInstruction.FillStyle,
      this.send_string(value),
    );
  }

  @inline
  protected write_fill_text(text: string, x: f64, y: f64, maxWidth: f64): void {
    this.write_four(
      CanvasInstruction.FillText,
      this.send_string(text),
      x,
      y,
      maxWidth,
    );
  }

  @inline
  protected write_filter(value: string): void {
    this.write_one(
      CanvasInstruction.Filter,
      this.send_string(value),
    );
  }

  @inline
  protected write_font(value: string): void {
    this.write_one(
      CanvasInstruction.Font,
      this.send_string(value),
    )
  }

  @inline
  protected write_global_alpha(value: f64): void {
    this.write_one(
      CanvasInstruction.GlobalAlpha,
      value,
    );
  }

  @inline
  protected write_global_composite_operation(value: GlobalCompositeOperation): void {
    this.write_one(
      CanvasInstruction.GlobalCompositeOperation,
      <f64>value,
    )
  }

  @inline
  protected write_image_smoothing_enabled(value: bool): void {
    this.write_one(
      CanvasInstruction.ImageSmoothingEnabled,
      value ? 1.0 : 0.0,
    );
  }

  @inline
  protected write_image_smoothing_quality(value: ImageSmoothingQuality): void {
    this.write_one(
      CanvasInstruction.ImageSmoothingQuality,
      <f64>value,
    );
  }

  @inline
  protected write_inspect(): void {
    this.write_zero(CanvasInstruction.Inspect);
  }

  @inline
  protected write_line_cap(value: LineCap): void {
    this.write_one(
      CanvasInstruction.LineCap,
      <f64>value,
    );
  }

  @inline
  protected write_line_dash(lineDash: Float64Array): void {
    this.write_one(
      CanvasInstruction.LineDash,
      <f64>changetype<usize>(lineDash),
    );
  }

  @inline
  protected write_line_dash_offset(value: f64): void {
    this.write_one(
      CanvasInstruction.LineDashOffset,
      <f64>value,
    );
  }

  @inline
  protected write_line_join(value: LineJoin): void {
    this.write_one(
      CanvasInstruction.LineJoin,
      <f64>value,
    );
  }

  @inline
  protected write_line_to(x: f64, y: f64): void {
    this.write_two(
      CanvasInstruction.LineTo,
      x,
      y,
    );
  }

  @inline
  protected write_line_width(value: f64): void {
    this.write_one(
      CanvasInstruction.LineWidth,
      <f64>value,
    );
  }

  @inline
  protected write_miter_limit(value: f64): void {
    this.write_one(
      CanvasInstruction.MiterLimit,
      value,
    );
  }

  @inline
  protected write_move_to(x: f64, y: f64): void {
    this.write_two(
      CanvasInstruction.MoveTo,
      x,
      y,
    );
  }

  @inline
  protected write_quadratic_curve_to(cpx: f64, cpy: f64, x: f64, y: f64): void {
    this.write_four(
      CanvasInstruction.QuadraticCurveTo,
      cpx,
      cpy,
      x,
      y,
    );
  }

  @inline
  protected write_rect(x: f64, y: f64, width: f64, height: f64): void {
    this.write_four(
      CanvasInstruction.Rect,
      x,
      y,
      width,
      height,
    );
  }

  @inline
  protected write_restore(): void {
    this.write_zero(CanvasInstruction.Restore);
  }

  @inline
  protected write_rotate(angle: f64): void {
    this.write_one(
      CanvasInstruction.Rotate,
      angle,
    );
  }

  @inline
  protected write_save(): void {
    this.write_zero(CanvasInstruction.Save);
  }

  @inline
  protected write_scale(x: f64, y: f64): void {
    this.write_two(
      CanvasInstruction.Scale,
      x,
      y,
    );
  }

  @inline
  protected write_set_transform(a: f64, b: f64, c: f64, d: f64, e: f64, f: f64 ): void {
    this.write_six(
      CanvasInstruction.SetTransform,
      a,
      b,
      c,
      d,
      e,
      f,
    );
  }

  @inline
  protected write_shadow_blur(value: f64): void {
    this.write_one(
      CanvasInstruction.ShadowBlur,
      value,
    );
  }

  @inline
  protected write_shadow_color(value: string): void {
    this.write_one(
      CanvasInstruction.ShadowColor,
      this.send_string(value),
    );
  }

  @inline
  protected write_shadow_offset_x(value: f64): void {
    this.write_one(
      CanvasInstruction.ShadowOffsetX,
      value,
    );
  }

  @inline
  protected write_shadow_offset_y(value: f64): void {
    this.write_one(
      CanvasInstruction.ShadowOffsetY,
      value,
    );
  }

  @inline
  protected write_stroke(): void {
    this.write_zero(CanvasInstruction.Stroke);
  }

  @inline
  protected write_stroke_rect(x: f64, y: f64, width: f64, height: f64): void {
    this.write_four(
      CanvasInstruction.StrokeRect,
      x,
      y,
      width,
      height,
    );
  }

  @inline
  protected write_stroke_gradient(strokeGradient: CanvasGradient): void {
    this.write_one(
      CanvasInstruction.StrokeGradient,
      <f64>strokeGradient._id,
    );
  }

  @inline
  protected write_stroke_pattern(strokePattern: CanvasPattern): void {
    this.write_one(
      CanvasInstruction.StrokePattern,
      <f64>strokePattern._id,
    );
  }

  @inline
  protected write_stroke_style(value: string): void {
    this.write_one(
      CanvasInstruction.StrokeStyle,
      this.send_string(value),
    )
  }

  @inline
  protected write_stroke_text(text: string, x: f64, y: f64, maxWidth: f64): void {
    this.write_four(
      CanvasInstruction.StrokeText,
      this.send_string(text),
      x,
      y,
      maxWidth,
    );
  }

  @inline
  protected write_text_align(value: TextAlign): void {
    this.write_one(
      CanvasInstruction.TextAlign,
      <f64>value,
    );
  }

  @inline
  protected write_text_baseline(value: TextBaseline): void {
    this.write_one(
      CanvasInstruction.TextBaseline,
      <f64>value,
    );
  }

  @inline
  protected write_transform(a: f64, b: f64, c: f64, d: f64, e: f64, f: f64): void {
    this.write_six(
      CanvasInstruction.Transform,
      a,
      b,
      c,
      d,
      e,
      f,
    );
  }

  @inline
  protected write_translate(x: f64, y: f64): void {
    this.write_two(
      CanvasInstruction.Translate,
      x,
      y,
    );
  }

  @inline
  protected write_commit(): void {
    this.write_zero(CanvasInstruction.Commit);
    this.index = 0;
  }

  @inline
  protected send_string(value: string): f64 {
    var hash: f64 = <f64>hashStr(value);
    if (this._stringHashes.includes(hash)) return hash;

    if (this._stringHashIndex < this._stringHashes.length) {
      unchecked(this._stringHashes[this._stringHashIndex] = hash);
    } else {
      this._stringHashes.push(hash);
    }
    create_string(hash, value);
    return hash;
  }
}
