import app from './core/app'
import {PORT} from './config/initializer'


app.listen(PORT, () => console.log(`Juanjo server is running on the port: ${PORT}`))