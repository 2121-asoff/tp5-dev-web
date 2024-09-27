import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
  const urlParts = request.url.split("/");

  switch (urlParts[1]) {
    case "": // Traite la racine "/"
    case "index.html":
      try {
        const contents = await fs.readFile("index.html", "utf8");
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        return response.end(contents);
      } catch (error) {
        console.error(error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        return response.end("500 Internal Server Error: File not found");
      }

    case "random.html": 
      try {
        // Générez un nombre aléatoire
        const randomNumber = Math.floor(Math.random() * 100);
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        return response.end(`Random number: ${randomNumber}`);
      } catch (error) {
        console.error(error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        return response.end("500 Internal Server Error");
      }

      case "random": 
      // Vérifier si l'URL contient un paramètre supplémentaire
      if (urlParts.length > 2 && !isNaN(urlParts[2])) {
        const nb = parseInt(urlParts[2], 10);
        const randomNumbers = Array.from({ length: nb }, () => Math.floor(Math.random() * 100));
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        return response.end(`Random numbers: ${randomNumbers.join(", ")}`);
      } else {
        response.writeHead(400, { "Content-Type": "text/plain" });
        return response.end("400 Bad Request: Invalid number");
      }
    

    default:
      response.writeHead(404, { "Content-Type": "text/plain" });
      return response.end("404 Not Found");
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});