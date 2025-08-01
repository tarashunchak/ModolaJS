Modola.memory.heap = {
  memory: [],
  nextPtrAddress: 0,

  allocate(value) {
    const address = this.nextPtrAddress++;
    this.memory[address] = value;
    return address;
  },

  destroy(ptr) {
    if (ptr && ptr < this.nextPtrAddress && ptr > 0) {
      delete this.memory[ptr];
    } else {
      throw new Error("segmenttion fault!!!");
    }
  },

  set(ptr, value) {
    if (ptr && ptr < this.nextPtrAddress && ptr > 0) {
      this.memory[ptr] = value;
    } else {
      throw new Error("segmenttion fault!!!");
    }
  }

};