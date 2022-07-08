import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/cabinet', (req, res) => {
    res.render('cabinet')
})

router.get('/register', (req, res) => {
    res.render('register')
})

export default router