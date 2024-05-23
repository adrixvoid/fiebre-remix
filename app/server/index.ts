import {mongoConnect} from './utils/mongoose';

export async function startServer() {
  console.log('startServer...');
  await mongoConnect();
}
