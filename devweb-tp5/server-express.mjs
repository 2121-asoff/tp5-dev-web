import express from "express";
import morgan from "morgan";
import createError from "http-errors";


const host = "localhost";
const port = 8000;

const app = express();

// Activer Morgan pour les environnements de développement
if (app.get("env") === "development") app.use(morgan("dev"));

// Middleware pour servir des fichiers statiques
app.use(express.static("static"));

// Configurer EJS comme moteur de rendu
app.set("view engine", "ejs");

app.get("/random/:nb", async function (request, response, next) {
  const length = parseInt(request.params.nb, 10); // Convertir en entier

   // Vérification si le paramètre n'est pas un nombre
   if (Number.isNaN(length)) {
    return next(createError(400)); // Produit une erreur 400
  }
  const numbers = Array.from({ length })
    .map(() => Math.floor(100 * Math.random())); // Générer un tableau de nombres aléatoires

  const welcome = "Bienvenue sur la page des nombres aléatoires"; // Message de bienvenue

  // Appeler le moteur de rendu avec les données générées
  return response.render("random", { numbers, welcome});
});

const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);
