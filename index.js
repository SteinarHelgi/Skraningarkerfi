const express = require("express");
const {google} = require("googleapis");
const { name } = require("ejs");
const app = express();
const PORT = process.env.PORT || 1337;
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");



app.get("/",(req,res)=>{
    res.render ("index");
});

app.post("/", async(req, res) => {
    const selectedOption = req.body.dropdown;
    const selectedDate = req.body.datePicker;
    console.log('selected Option :', selectedOption, selectedDate);
    

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes:"https://www.googleapis.com/auth/spreadsheets",
    });
    //create client instance
    const client = await auth.getClient();

    // instance of Google Sheets API
    const googleSheets = google.sheets({version:"v4", auth: client});

    const spreadsheetId ="1cjote9yrdZIww1QW83HA6MsMuGncvw6VHpk3T_ofpaA"
    

    // Write rows to spreadsheet
    
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Sheet1!A:E",
            valueInputOption: "USER_ENTERED",
            resource: {
            values: [[selectedDate,selectedOption[0],selectedOption[1],selectedOption[2],selectedOption[3],selectedOption[4],]],
            }
            
        });
        res.render("index");
    })

    
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});