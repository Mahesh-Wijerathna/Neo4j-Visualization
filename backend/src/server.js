const express = require('express');
const cors = require('cors');
const multer = require('multer');
const DeviceRoutes = require('./routes/DeviceRoutes');
const ConnectionRoutes = require('./routes/ConnectionRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(multer().none());

const PORT =  5000;

app.use('/api/devices', DeviceRoutes);
app.use('/api/connections', ConnectionRoutes);

app.get('/', (req, res) => {
        res.send('\tHello World \n\t Express.js server is Working');
    });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
