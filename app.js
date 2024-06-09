const express = require('express');
const app = express();
const tasks  = require('./routes/tasks');



app.use(express.json());
app.use(express.static('./public'));


//routes

app.use('/api/v1/tasks',tasks);

const port = 3000;


app.listen(port,()=>{
  console.log('server is listening at port 3000...');
})