const express = require('express');
const router = express.Router();
const validation = require('../validation/validate');
const file = require("../fileUtil/fileIO"); // Updated to use Firestore-based utility

router.post('/', async (req, res) => {
    try {

        const { program, solution, hint, count } = req.body;

        // Validate input fields
        if (validation.isEmpty(program)) {
            return res.status(400).json({ error: 'Program is required' });
        }
        if (validation.isEmpty(solution)) {
            return res.status(400).json({ error: 'Solution is required' });
        }
        if (validation.isEmpty(hint)) {
            return res.status(400).json({ error: 'Hint is required' });
        }
        if (!count || isNaN(count) || parseInt(count) < 1) {
            return res.status(400).json({ error: 'Count must be a number greater than 0' });
        }

        const key = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit key

        const data = {
            key: key.toString(),
            program,
            solution,
            hint,
            count: parseInt(count)
        };

        await file.writeJson(data);

        return res.status(200).json({ message: 'Successfully added', key });

    } catch (error) {
        console.error("Error while processing request:", error.message);

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
});


router.get("/", async (req, res) => {
    try {
        const { key } = req.query;
        console.log(key);

        // Validate key
        if (!key || validation.isEmpty(key)) {
            return res.status(400).json({ error: 'Key is required' });
        }

        // Search for the JSON data
        const data = await file.getJsonDataByKey(key);
        if (!data) {
            return res.status(404).json({ error: 'Wrong key' });
        }

        // Check count value
        if (parseInt(data.count) <= 0) {
            return res.status(400).json({ error: 'You came last here' });
        }

        // Prepare response data
        const responseData = {
            program: data.program,
            key: key
        };

        return res.status(200).json(responseData);

    } catch (err) {
        console.error("Error in GET request:", err.message);
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});


router.post("/validate-solution", async (req, res) => {
    try {
        const { key, solution } = req.body;


        // Validate request parameters
        if (!key || validation.isEmpty(key)) {
            return res.status(400).json({ error: 'Key is required' });
        }
        if (!solution || validation.isEmpty(solution)) {
            return res.status(400).json({ error: 'Solution is required' });
        }

        // Fetch data by key
        const data = await file.getJsonDataByKey(key);
        if (!data) {
            return res.status(404).json({ error: 'Wrong key' });
        }

        // Check if the count is 0
        if (parseInt(data.count) <= 0) {
            return res.status(400).json({ error: 'Someone already cracked the code.' });
        }

        // Validate solution
        if (solution.toString().trim() === data.solution.toString().trim()) {
            console.log("Solved");

            // Update count
            const updateSuccess = await file.updateCount(key);
            if (!updateSuccess) {
                return res.status(500).json({ error: 'Failed to update count' });
            }

            return res.status(200).json({ message: data.hint });
        } else {
            return res.status(200).json({ message: 'Wrong solution' });
        }

    } catch (err) {
        console.error("Error in POST request validate-solution:", err.message);
        return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
});

module.exports = router;
