export default class History {
  private buffer: Array<Array<string>>
  private bufferLimit: number;

  constructor() {
    this.buffer = [];
  }

  public add(blocks: Array<string>) {
    const existingIndex: number = this.buffer.findIndex((historicBlocks: Array<string>) => {
      if (blocks.length !== historicBlocks.length) return false;
      return historicBlocks.every((historicBlock, index) => historicBlock === blocks[index]);
    });

    // Remove it from this.buffer so we can move it to the top
    if (existingIndex > 0) {
      this.buffer.splice(existingIndex, 1);
    }

    // Add to the this.buffer
    if (existingIndex !== 0) {  // index === 0 means it is already at the top
      if (this.buffer.length >= this.bufferLimit) {
        this.buffer.pop();
      }
      this.buffer.unshift(blocks);
    }
  }

  public get(): Array<Array<string>> {
    return this.buffer;
  }

  public clear() {
    this.buffer = [];
  }

  public setBufferLimit(bufferLimit: number) {
    this.bufferLimit = bufferLimit;
    this.buffer = this.buffer.slice(0, bufferLimit);
  }
}