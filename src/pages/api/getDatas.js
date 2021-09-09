import Cors from 'cors'
import initMiddleware from 'pages/api/initMiddleware'
import database from 'pages/api/database'

const cors = initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

export default async (req, res) => {
    await cors(req, res)
    res.send(database.get())
}
