import {View, ViewOptions} from "./view"
import * as DOM from "./dom"

export class DOMView extends View {

  tagName: keyof HTMLElementTagNameMap

  protected _has_finished: boolean

  el: HTMLElement

  initialize(options: ViewOptions): void {
    super.initialize(options)
    this._has_finished = false
    this.el = this._createElement()
  }

  remove(): void {
    DOM.removeElement(this.el)
    super.remove()
  }

  css_classes(): string[] {
    return []
  }

  cursor(_sx: number, _sy: number): string | null {
    return null
  }

  do_layout(): void {}

  render(): void {}

  renderTo(element: HTMLElement): void {
    element.appendChild(this.el)
    this.do_layout()
  }

  on_hit?(sx: number, sy: number): boolean

  has_finished(): boolean {
    return this._has_finished
  }

  protected get _root_element(): HTMLElement {
    return DOM.parent(this.el, ".bk-root") || document.body
  }

  get is_idle(): boolean {
    return this.has_finished()
  }

  protected _createElement(): HTMLElement {
    return DOM.createElement(this.tagName, {id: this.id, class: this.css_classes()})
  }
}

DOMView.prototype.tagName = "div"
