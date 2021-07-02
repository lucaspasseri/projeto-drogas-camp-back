/* import app from './app.js';

const port = process.env.PORT;

app.listen(4000, () => {
    console.log("Server running on port 4000...");
}); */

import app from './app.js';

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
