const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('checkout/view-checkout', {})
})

router.post('/', async (req, res) => {
    try {
        
    } catch (error) {
        console.log('Error saving checkout information:', error);
    }
});

module.exports = router;