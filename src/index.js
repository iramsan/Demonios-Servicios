import express from 'express';
import routes from "./routes/links.js";
import path from 'path'
import { fileURLToPath } from 'url'

const app = express();
const viewsDir = path.join(new URL(import.meta.url).pathname, '..', 'views');
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("port", process.env.PORT || 4000);
app.set('views', viewsDir);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(app.get("port"), (req, res) => {
    console.log(`Port Up on: http://192.168.100.41:${app.get("port")}`);
});
