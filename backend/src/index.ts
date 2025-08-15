import { app } from './server.js';
import { config } from './util/config.js';

app.listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT}`);
});
