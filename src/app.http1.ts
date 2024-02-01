import http from "http"
import fs from "fs"

const servidor = http.createServer((req, res) => {

    //res.writeHead(200, {
    //    "Content-Type": "text/html"
    //})
    //res.write(`<h1>URL ${req.url}</h1>`)
    //res.end()

    //const datos = {
    //    nombre: "yon",
    //    edad: 22,
    //    pais: "Mexico"
    //}

    //res.writeHead(200, {
    //    "Content-Type": "application/json"
    //})
    ////res.write(JSON.stringify(datos))
    ////res.end()
    //// o tambien 
    //res.end(JSON.stringify(datos))


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

    
    const contenidoRespuesta = fs.readFileSync(`./public${req.url}`, "utf-8")
    res.end(contenidoRespuesta)

})

servidor.listen(8080, () => {
    console.log("Servidor corriendo en el puerto 8080");
})