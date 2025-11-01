import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const config = {
    responseType: 'json'
};

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/',async (req, res) => {
    try {
        let baseName = ['EUR','USD','AUD', 'BGN', 'BRL', 'CAD'];
        let allData = [];
        for(let i =0;i<baseName.length;i++){
        const response = await axios.get(`https://api.frankfurter.dev/v1/latest?base=${baseName[i]}`,config);
        allData.push(response.data);
        }
        res.render('index.ejs',{allData});
    } catch (error) {
        res.send(error);
    }
});

app.get('/historical',(req,res)=>{
    res.render('historical.ejs');
});

app.post('/historical', async (req,res)=>{
    try{
        const currencyName = req.body.type;
        const dateIs = req.body.historicalDate;
        const response = await axios.get(`https://api.frankfurter.dev/v1/${dateIs}?base=${currencyName}&symbols`);
        const historicalData= response.data;
        res.render('historical.ejs',{historicalData});
    }catch(error){
        res.send(error);
    }
});

app.get('/about', (req, res) => {
    res.sendFile('/Users/apple/VS Code/Backend/Currency/public/about.html');
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});