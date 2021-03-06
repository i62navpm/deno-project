import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const books = new Map<string, any>();
books.set("1", {
  id: "1",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Author"
});

const router = new Router();
router
  .get("/", context => {
    context.response.body = "Hello world!";
  })
  .get("/books", context => {
    context.response.body = [...books.values()];
  })
  .get("/books/:id", context => {
    if (context.params && books.has(context.params.id)) {
      context.response.body = books.get(context.params.id);
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen("127.0.0.1:8000");