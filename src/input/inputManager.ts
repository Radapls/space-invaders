type Key = string;

export class InputManager {
  private pressed = new Set<Key>();

  constructor() {
    window.addEventListener('keydown', e => this.pressed.add(e.code));
    window.addEventListener('keyup',   e => this.pressed.delete(e.code));
  }

  isPressed(key: Key): boolean {
    return this.pressed.has(key);
  }
}
