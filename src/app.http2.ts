//NOTA: 
// HTTP/2 forzosamente requiere de una conexion a traves de https
// para implementarse

import http2 from "http2"
import fs from "fs"

const servidor = http2.createSecureServer({
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt")
}, (req, res) => {


    if (req.url === "/") {

        const archivoHtml = fs.readFileSync("./public/index.html", "utf-8")
        res.writeHead(200, {
            "Content-Type": "text/html"
        })

        res.end(archivoHtml)

        return
    }

    if (req.url?.includes(".js")) {

        res.writeHead(200, {
            "Content-Type": "application/javascript"
        })

    } else if (req.url?.endsWith(".css")) {

        res.writeHead(200, {
            "Content-Type": "text/css"
        })
    }


    try {
        const contenidoRespuesta = fs.readFileSync(`./public${req.url}`, "utf-8")
        res.end(contenidoRespuesta)
    } catch (error) {
        res.writeHead(404, {
            "Content-Type": "text/html"
        })
        res.end()
    }

})

servidor.listen(8080, () => {
    console.log("Servidor corriendo en el puerto 8080");
})