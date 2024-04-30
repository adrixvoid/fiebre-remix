import {mongoConnect} from './services/mongoose';

export async function startServer() {
  console.log('startServer...');
  await mongoConnect();
}
