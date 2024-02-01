import path from "path";
import express from "express"

interface Opciones {
    port: number;
    public_path?: string;
}

export class Servidor {

    private app = express()
    private readonly port: number
    private readonly publicPath: string

    constructor(opciones: Opciones) {
        const { port, public_path = "public" } = opciones

        this.port = port
        this.publicPath = public_path
    }

    async iniciar() {

        this.app.use(express.static(this.publicPath))

        this.app.get("*", (req, res) => {
            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}