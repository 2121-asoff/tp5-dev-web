import express from "express";
import morgan from "morgan";
import createError from "http-errors"; // Importer http-errors
import logger from "loglevel"; // Importer loglevel

const host = "localhost";
const port = 8000;

// Modifier le niveau de verbosité à WARN
logger.setLevel(logger.levels.WARN); // Affichera uniquement les logs de niveau WARN et ERROR


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
    logger.error("Invalid number parameter provided"); // Logger l'erreur
    return next(createError(400)); // Produit une erreur 400
  }

  const numbers = Array.from({ length }).map(() => Math.floor(100 * Math.random())); // Générer un tableau de nombres aléatoires

  const welcome = "Bienvenue sur la page des nombres aléatoires"; // Message de bienvenue

  logger.info(`Generated ${length} random numbers`); // Logger une information

  // Appeler le moteur de rendu avec les données générées
  return response.render("random", { numbers, welcome });
});

// Gestion des routes non trouvées (404)
app.use((request, response, next) => {
  logger.warn(`default route handler : ${request.url}`); // Logger un warning
  return next(createError(404));
});

// Gestion des erreurs
app.use((error, _request, response, _next) => {
  logger.error(`default error handler: ${error.message}`); // Logger l'erreur
  const status = error.status ?? 500;
  const stack = app.get("env") === "development" ? error.stack : "";
  const result = { code: status, message: error.message, stack };
  return response.render("error", result);
});

const server = app.listen(port, host);

server.on("listening", () => {
  logger.info(`HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`);
});

logger.debug(`File ${import.meta.url} executed.`);
