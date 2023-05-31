import { app } from './app';

(async (): Promise<void> => {
  try {
    const port = 3001;
    const serverApp = await app();
    serverApp.listen(port, () => {
      console.log('Server is running on port %d', port);
    });
  } catch (error) {
    console.log('Error when starting the server.', error);
  }

})();
