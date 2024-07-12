const multer = require('multer')
const upload = multer({ dest: '/tmp' })
const XLSX = require("xlsx");
const Post = require('../../models/post');



// working..,
exports.addPost = async (req, res) => {


    upload.single("excelFile")(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error uploading the file" });
        }

        const { path: filePath } = req.file;
        const { dataType } = req.body;
        console.log(dataType);

        try {
            // Read the Excel file using your preferred library
            // For example, you can use 'xlsx' library like this:
            const workbook = XLSX.readFile(filePath);
            const sheetName = workbook.SheetNames[0]; // Assuming you want to read the first sheet
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet); // Convert the sheet to JSON

            const post = await Post.create({
                dataType: dataType,
                postData: data,

            })

            // Return the response with the processed data
            return res.status(200).json({ message: "Success"});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error reading the Excel file" });
        }
    });

};


// All data according to the datatype
exports.typePost = async (req, res) => {

    const { dataType } = req.query;

    let user = await Post.find({ dataType: dataType })
    var result = [];

    for (let index = 0; index < user.length; index++) {

        const element = user[index];
        for (let newIndex = 0; newIndex < element.postData.length; newIndex++) {
            const newElement = element.postData[newIndex];

            result.push(newElement);

        }
    }

    return res.status(200).json(result)
};



//Filter by state according to the datatype
exports.fstate = async (req, res) => {

    const { dataType, state } = req.query;

    let user = await Post.find({ dataType: dataType })
    var result = [];

    for (let index = 0; index < user.length; index++) {

        const element = user[index];
        for (let newIndex = 0; newIndex < element.postData.length; newIndex++) {
            const newElement = element.postData[newIndex];

            if (newElement.State === state) {
                result.push(newElement);
            }

        }
    }

    return res.status(200).json(result)
};



//Filter by mounth according to the datatype
exports.fmonth = async (req, res) => {

    const { dataType, myMonth } = req.query;

    let user = await Post.find({ dataType: dataType })
    var result = [];

    for (let index = 0; index < user.length; index++) {

        const element = user[index];
        for (let newIndex = 0; newIndex < element.postData.length; newIndex++) {
            const newElement = element.postData[newIndex];

            const dateStr = newElement.Notice_Date;
            const [day, month, year] = dateStr.split('-');
            const dateObj = new Date(`${month} ${day}, ${year}`);
            const monthName = dateObj.toLocaleString('default', { month: 'long' });


            if (monthName === myMonth) {
                result.push(newElement);
            }

        }
    }

    return res.status(200).json(result)
};



//Filter by mounth according to the datatype
exports.fAll = async (req, res) => {



    // try {

    const { type, selectedMonth, state, city } = req.query;
    let mymonth = selectedMonth

    var result = [];

    if (type) {

        var user = await Post.find({ dataType: type })

    } else {

        var user = await Post.find({})

    }




    for (let index = 0; index < user.length; index++) {

        const element = user[index];
        for (let newIndex = 0; newIndex < element.postData.length; newIndex++) {
            const newElement = element.postData[newIndex];





            if (mymonth) {

                const dateStr = newElement.Notice_Date;
                const [day, month, year] = dateStr.split('-');
                const dateObj = new Date(`${month} ${day}, ${year}`);
                const monthName = dateObj.toLocaleString('default', { month: 'long' });


                if (state) {

                    if (city) {

                        if (monthName.toLowerCase() === mymonth.toLowerCase() && newElement.State === state.toUpperCase() && newElement.City.toUpperCase() === city.toUpperCase()) {
                            result.push(newElement);
                        }

                    } else {

                        if (monthName.toLowerCase() === mymonth.toLowerCase() && newElement.State === state.toUpperCase()) {
                            result.push(newElement);
                        }

                    }



                } else {

                    if (city) {

                        if (monthName.toLowerCase() === mymonth.toLowerCase() && newElement.City.toUpperCase() === city.toUpperCase()) {
                            result.push(newElement);
                        }

                    } else {

                        if (monthName.toLowerCase() === mymonth.toLowerCase()) {
                            result.push(newElement);
                        }

                    }



                }



            } else {

                if (state) {

                    if (city) {

                        if (newElement.State === state.toUpperCase() && newElement.City === city.toUpperCase()) {
                            result.push(newElement);
                        }


                    } else {

                        if (newElement.State.toUpperCase() === state.toUpperCase()) {
                            result.push(newElement);
                        }

                    }



                } else {

                    if (city) {

                        if (newElement.City.toUpperCase() === city.toUpperCase()) {
                            result.push(newElement);
                        }

                    } else {

                        result.push(newElement);

                    }

                }

            }

        }
    }



    return res.status(200).json(result)

    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ error: "Error to find Data." });
    // }



};






