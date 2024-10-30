import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (e) => {
  console.error(`DB connection error: ${e}`);
});

export async function mongoConnect() {
  mongoose.connect(MONGO_URL as string).catch((e) => {
    console.error(`DB connect error: ${e}`);
    process.exit(1);
  });
}

export async function mongoDisconnect() {
  mongoose.disconnect();
}

export const toObjectId = (str: string) => {
  if (str.length > 0) {
    return new mongoose.Types.ObjectId(str);
  }
  return null;
};
