const test = (req, res) => {
    res.status(200).json({
        status:"Success",
        message:"API Works Fine"
    })
}

module.exports = {test}