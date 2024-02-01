import { envs } from "./config/envs"
import { Servidor } from "./presentation/servidor"

(() => {
    main()
})()


function main() {
    const servidor = new Servidor({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    })
    servidor.iniciar()
}