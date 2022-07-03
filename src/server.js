import express from 'express'
const PORT = process.env.PORT || 4000
import { join } from 'path'
import modules from './modules/main.js'
import ejs from 'ejs'

!async function(){
    const app = express()
    app.engine('html', ejs.renderFile)
    app.set('view engine', 'html')
    app.set('views', join(process.cwd(), 'src', 'views'))
    app.use(express.static('src'))
    
    app.use(express.static(join(process.cwd(), 'src', 'public')))

    app.use(modules)

    app.listen(PORT, () => console.log('=>4000'))
}()