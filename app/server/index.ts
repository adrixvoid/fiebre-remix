import {mongoConnect} from './utils/mongoose';

export async function startServer() {
  const MONGO_URL = process.env.MONGO_URL;
  await mongoConnect();
}
