import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const html = path.join(root, "devenir-partenaire.html");
const out = path.join(root, "assets/devenir-partenaire/_verify-hero.png");

const browser = await puppeteer.launch({
  headless: true,
  args: ["--allow-file-access-from-files", "--disable-web-security"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("file:///" + html.replace(/\\/g, "/"), { waitUntil: "networkidle0", timeout: 60000 });
await page.waitForSelector(".dp-hero");
await new Promise((r) => setTimeout(r, 800));
const hero = await page.$(".dp-hero");
await hero.screenshot({ path: out });
console.log("wrote", out);
await browser.close();
