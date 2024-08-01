const PostalAuction = require('../../models/postalAuction');
const PostalDeficit = require('../../models/postalDeficit');
const PostalRefund = require('../../models/postalRefund');
const PostalBranchShifting = require('../../models/postalBranchShifting');
const PostalMtm = require('../../models/postalMtm');



exports.allData = async (req, res) => {
    const { selectedMonth, state, city, filename, skip, limit } = req.query;

    try {
        // Validate skip and limit
        if (!skip || !limit || isNaN(parseInt(skip)) || isNaN(parseInt(limit))) {
            return res.status(400).json({ error: "Invalid or missing skip/limit parameters" });
        }

        let skipNum = parseInt(skip);
        let limitNum = parseInt(limit);

        let query = {};

        if (selectedMonth) {
            const firstThreeLetters = selectedMonth.slice(0, 3);
            query.DATE = { $regex: new RegExp(firstThreeLetters, 'i') };
        }

        if (state) {
            query.STATE = { $regex: new RegExp(state, 'i') };
        }

        if (filename) {
            query.FILENAME = { $regex: new RegExp(filename, 'i') };
        }

        if (city) {
            query.CITY = { $regex: new RegExp(city, 'i') };
        }

        // Fetch counts in parallel
        let [count1, count2, count3, count4, count5] = await Promise.all([
            PostalAuction.countDocuments(query),
            PostalDeficit.countDocuments(query),
            PostalRefund.countDocuments(query),

            PostalBranchShifting.countDocuments(query),
            PostalMtm.countDocuments(query)
        ]);

        let totalCount = count1 + count2 + count3 + count4 + count5;

        // Determine which collection to query based on skipNum
        let data;
        if (skipNum < count1) {
            data = await PostalAuction.find(query).skip(skipNum).limit(limitNum).select('-date -CITY -STATE -DATE -__v -_id');
        } else if (skipNum < count1 + count2) {
            data = await PostalDeficit.find(query).skip(skipNum - count1).limit(limitNum).select('-date -CITY -STATE -DATE -__v -_id');
        } else if (skipNum < count1 + count2 + count3) {
            data = await PostalRefund.find(query).skip(skipNum - count1 - count2 - count3).limit(limitNum).select('-date -CITY -STATE -DATE -__v -_id');
        } else if (skipNum < count1 + count2 + count3 + count4) {
            data = await PostalBranchShifting.find(query).skip(skipNum - count1 - count2 - count3 - count4).limit(limitNum).select('-date -CITY -STATE -DATE -__v -_id');
        } else {
            data = await PostalMtm.find(query).skip(skipNum - count1 - count2 - count3 - count4 - count5).limit(limitNum).select('-date -CITY -STATE -DATE -__v -_id');
        }

        return res.status(200).json({ count: totalCount, data });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong..." });
    }
};



exports.postalDataDownload = async (req, res) => {
    const { type, selectedMonth, state, city, filename } = req.query;

    try {
        let query = {};

        if (selectedMonth) {
            const regexMonth = new RegExp(selectedMonth.slice(0, 3), 'i');
            query.NOTICE_DATE = { $regex: regexMonth };
        }

        if (state) {
            query.STATE = { $regex: new RegExp(state, 'i') };
        }

        if (filename) {
            query.FILENAME = { $regex: new RegExp(filename, 'i') };
        }

        if (city) {
            query.CITY = { $regex: new RegExp(city, 'i') };
        }

        const fetchDataAndCount = async (model) => {
            const [count, data] = await Promise.all([
                model.countDocuments(query),
                model.find(query)
            ]);
            return { count, data };
        };

        let result;

        if (type) {
            switch (type) {
                case "auction":
                    result = await fetchDataAndCount(PostalAuction);
                    break;
                case "deficit":
                    result = await fetchDataAndCount(PostalDeficit);
                    break;
                case "refund":
                    result = await fetchDataAndCount(PostalRefund);
                    break;
                case "mtm":
                    result = await fetchDataAndCount(PostalMtm);
                    break;
                case "branchshifting":
                    result = await fetchDataAndCount(PostalBranchShifting);
                    break;
                default:
                    return res.status(400).json({ error: "Please enter a valid type (auction, deficit, refund)." });
            }
        } else {
            const [result1, result2, result3, result4, result5] = await Promise.all([
                fetchDataAndCount(PostalAuction),
                fetchDataAndCount(PostalDeficit),
                fetchDataAndCount(PostalRefund),
                fetchDataAndCount(PostalMtm),
                fetchDataAndCount(PostalBranchShifting)
            ]);

            const count = result1.count + result2.count + result3.count + result4.count + result5.count;
            const data = [...result1.data, ...result2.data, ...result3.data, ...result4.data, ...result5.data];
            result = { count, data };
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error processing request', error);
        return res.status(500).send('An error occurred');
    }
};



// get state
exports.findState = async (req, res) => {
    const { type } = req.query;

    try {
        let allStates;
        if(type){
            if (type === 'auction') {
                const data2 = await PostalAuction.distinct('STATE');
                allStates = [ ...data2, ];
               
            }else if(type==='deficit'){
                const data2 = await PostalDeficit.distinct('STATE');                
                allStates = [...data2];
              
            }else if(type==='refund'){              
                const data4 = await PostalRefund.distinct('STATE');                
                allStates = [ ...data4, ];
              
            }else if(type==='mtm'){
                const data5 = await PostalMtm.distinct('STATE');
                allStates = [ ...data5];
               
            }else if(type==='branchshifting'){
                const data5 = await PostalBranchShifting.distinct('STATE');
                allStates = [ ...data5];
            }else if(type==='all'){
                const data1 = await PostalAuction.distinct('STATE');
                const data2 = await PostalDeficit.distinct('STATE');
                const data4 = await PostalRefund.distinct('STATE');
                const data3 = await PostalBranchShifting.distinct('STATE');
                const data5 = await PostalMtm.distinct('STATE');
                
                allStates = [...data1, ...data2, ...data3, ...data4, ...data5];
            }else{
                allStates = [ ];
            }
         
        }else{

            const data1 = await PostalAuction.distinct('STATE');
            const data2 = await PostalDeficit.distinct('STATE');
            const data4 = await PostalRefund.distinct('STATE');
            const data3 = await PostalBranchShifting.distinct('STATE');
            const data5 = await PostalMtm.distinct('STATE');
            
            allStates = [...data1, ...data2, ...data3, ...data4, ...data5];
        }   
        const data = [...new Set(allStates)];
       

        // Send response with unique values
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some thing went worng..." });
    }
}

// get state my city
exports.findCity = async (req, res) => {

    const { state,type } = req.query;
    try {
        let allStates;
        let query = { STATE: state };
        if(type){
            if (type === 'auction') {
                const data1 = await PostalAuction.distinct('CITY', query);
                allStates = [ ...data1, ];
               
            }else if(type==='deficit'){
                const data2 = await PostalDeficit.distinct('CITY', query);      
                allStates = [...data2];
              
            }else if(type==='refund'){              
                const data3 = await PostalRefund.distinct('CITY', query);               
                allStates = [ ...data3, ];
              
            }else if(type==='mtm'){
                const data5 = await PostalMtm.distinct('CITY', query);
                allStates = [ ...data5];
               
            }else if(type==='branchshifting'){
                const data4 = await PostalBranchShifting.distinct('CITY', query);
                allStates = [ ...data4];
            }else if(type==='all'){
                const data1 = await PostalAuction.distinct('CITY', query);
                const data2 = await PostalDeficit.distinct('CITY', query);
                const data3 = await PostalRefund.distinct('CITY', query);
                const data4 = await PostalBranchShifting.distinct('CITY', query);
                const data5 = await PostalMtm.distinct('CITY', query);
                
                allStates = [...data1, ...data2, ...data3, ...data4, ...data5];
            }else{
                allStates = [ ];
            }
         
        }else{

            const data1 = await PostalAuction.distinct('CITY', query);
            const data2 = await PostalDeficit.distinct('CITY', query);
            const data3 = await PostalRefund.distinct('CITY', query);
            const data4 = await PostalBranchShifting.distinct('CITY', query);
            const data5 = await PostalMtm.distinct('CITY', query);
            
            allStates = [...data1, ...data2, ...data3, ...data4, ...data5];
        }
        // Use Set to get unique values
        const data = [...new Set(allStates)];

        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some thing went worng..." });
    }
}


// Chart data
exports.chartData = async (req, res) => {

    const { state,type } = req.query;
    try {
        let limit = 10

        // Aggregate pipeline to group by STATE, count documents, sort by count in descending order
        const topStatesPipeline = [
            {
                $group: {
                    _id: '$STATE', // Group by STATE field
                    count: { $sum: 1 } // Count documents in each group
                }
            },
            {
                $sort: { count: -1 } // Sort by count in descending order
            },
            {
                $limit: limit // Limit results to top N states
            }
        ];

        const topStates = await PostalAuction.aggregate(topStatesPipeline);

        // Aggregate pipeline to calculate the "Others" count
        const othersPipeline = [
            {
                $group: {
                    _id: '$STATE',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $skip: limit // Skip the top N states
            },
            {
                $group: {
                    _id: 'Other', // Group remaining states as "Other"
                    count: { $sum: '$count' } // Sum their counts
                }
            }
        ];

        const others = await PostalAuction.aggregate(othersPipeline);

        // Combine the top states and the "Others" entry
        const result = topStates.concat(others);

        const pipeline = [
            {
                $group: {
                    _id: '$STATUS', // Group by STATUS field
                    count: { $sum: 1 } // Count documents in each group
                }
            },
            {
                $sort: { count: -1 } // Optional: Sort by count in descending order
            }
        ];

        // Execute aggregation pipeline
        const statusCounts = await PostalAuction.aggregate(pipeline);



        return res.status(200).json({topStates:result,deliver:statusCounts})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "some thing went worng..." });
    }
}
