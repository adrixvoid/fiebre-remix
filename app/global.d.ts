import type mongoose from 'mongoose';

declare global {
  namespace globalThis {
    var mongooseClient: typeof mongoose | null;
  }
}

declare global {
  namespace NodeJS {
    interface Global {
      mongooseClient: typeof mongoose;
    }
  }
}

export {};
