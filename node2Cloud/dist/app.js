import express from 'express';
import { BottomMiddlewares } from '../middlewares/Bottom';
import { TopMiddlewares } from '../middlewares/Top.js';
const app = express();
TopMiddlewares.forEach(mw => app.use(mw));
app.get('/', (req, res) => {
    res.send(`Alive 🚀`);
});
BottomMiddlewares.forEach(mw => app.use(mw));
export default app;
//# sourceMappingURL=app.js.map