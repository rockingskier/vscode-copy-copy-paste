import { Memento } from "vscode";

type Buffer = string[][];
export type HistoryItem = string[];

export default class History {
  private buffer: Buffer;
  private bufferLimit: number = 25;

  constructor(private storage?: Memento) {
    this.buffer = this.storage?.get("history") || [];
  }

  public add(blocks: HistoryItem) {
    const existingIndex: number = this.buffer.findIndex(
      (historicBlocks: Array<string>) => {
        if (blocks.length !== historicBlocks.length) {
          return false;
        }
        return historicBlocks.every(
          (historicBlock, index) => historicBlock === blocks[index]
        );
      }
    );

    // Remove it from this.buffer so we can move it to the top
    if (existingIndex > 0) {
      this.buffer.splice(existingIndex, 1);
    }

    // Add to the this.buffer
    if (existingIndex !== 0) {
      // index === 0 means it is already at the top
      if (this.buffer.length >= this.bufferLimit) {
        this.buffer.pop();
      }
      this.buffer.unshift(blocks);
    }

    this.storage?.update("history", this.buffer);
  }

  public get(): Buffer {
    return this.buffer;
  }

  public clear() {
    this.buffer = [];
    this.storage?.update("history", this.buffer);
  }

  public setBufferLimit(bufferLimit: number) {
    this.bufferLimit = bufferLimit;
    this.buffer = this.buffer.slice(0, bufferLimit);
    this.storage?.update("history", this.buffer);
  }
}
