import express from 'express';
import { BottomMiddlewares } from './middlewares/Bottom.js';
import { TopMiddlewares } from './middlewares/Top.js';
import { accountModel } from './models/account.model.js';
import { initRoutes } from './routes/initRoutes.js';
const app = express();
TopMiddlewares.forEach(mw => app.use(mw));
app.get('/', async (req, res) => {
    const db = req.app.locals.db;
    const data = await db.select().from(accountModel);
    res.json({ msg: `Alive 🚀 `, data });
});
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
initRoutes(app);
BottomMiddlewares.forEach(mw => app.use(mw));
export default app;
//# sourceMappingURL=app.js.map