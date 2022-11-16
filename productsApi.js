const express = require("express");
const app = express();
const { Router } = express;

//-------------------------------------------------------------------------------------------------------//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));

//-------------------------------------------------------------------------------------------------------//
const routerProductos = new Router();
const PORT = 8080;
const productos = [
  {
    tittle: "Microndas",
    price: 5000,
    thumbnail:
      "https://www.cetrogar.com.ar/media/catalog/product/h/e/he-bgh-_bhe65m19n_-_front-cerrado.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:%C3%A7",
    id: 1,
  },
  {
    tittle: "Lavarropas",
    price: 6500,
    thumbnail:
      "https://www.cetrogar.com.ar/media/catalog/product/8/k/8kg_-_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
    id: 2,
  },
  {
    tittle: "Maquina de coser",
    price: 3000,
    thumbnail:
      "https://www.cetrogar.com.ar/media/catalog/product/s/0/s0105_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
    id: 3,
  },
  {
    tittle: "Licuadora",
    price: 2000,
    thumbnail:
      "https://www.cetrogar.com.ar/media/catalog/product/l/i/licuadora_1_smartlife_0_cmyk.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:",
    id: 4,
  },
];
//-------------------------------------------------------------------------------------------------------//
function getById(id, data) {
  let i = 0;
  let dataFound = "producto no encontrado";
  while (data[i] !== undefined) {
    data[i].id === id && (dataFound = data[i]);
    i++;
  }
  return dataFound;
}

function deleteById(id, data) {
  let i = 0;
  while (data[i] !== undefined) {
    data[i].id === id && data.splice(i, 1);
    i++;
  }
  return data;
}

function addWithNewId(data) {
  let i = 0;
  let lastId = 0;
  while (data[i] !== undefined) {
    lastId = data[i].id;
    i++;
  }
  return lastId + 1;
}

function changeById(id, data, newData) {
  let i = 0;
  while (data[i] !== undefined) {
    data[i].id === id && (data[i] = { ...newData, id });
    i++;
  }
  return data;
}

//-------------------------------------------------------------------------------------------------------//

routerProductos.get("/", (req, res) => {
  res.json(productos);
});

routerProductos.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const productById = getById(id, productos);
  res.json(productById);
});

routerProductos.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  deleteById(id, productos);
  res.json({ ok: "ok" });
});

routerProductos.post("/", (req, res) => {
  let newProducto = { ...req.body, id: addWithNewId(productos) }
  productos.push(newProducto);
  res.json(newProducto);
});

routerProductos.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  changeById(id, productos, req.body);
  res.json({ ok: "ok" });
});

//-------------------------------------------------------------------------------------------------------//
app.use("/api/productos", routerProductos);

const server = app.listen(PORT, () => {
  console.log("servidor escuchando en el " + PORT);
});
//-------------------------------------------------------------------------------------------------------//
