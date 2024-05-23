import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

export async function mongoConnect() {
  mongoose.connect(MONGO_URL as string).catch((e) => {
    console.log(e);
    process.exit(1);
  });
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
}

export const toObjectId = (str: string) => {
  if (str.length > 0) {
    return new mongoose.Types.ObjectId(str);
  }
  return null;
};
