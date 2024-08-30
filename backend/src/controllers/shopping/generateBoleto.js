const generateBarcode = require('barcode-generator');

exports.generateBoleto = (req, res) => {
    const { value } = req.body;

    const barcodeData = `0019050095401448160690680935031433737000000${value.toFixed(2).replace('.', '')}`;

    const barcodeImageUrl = generateBarcode(barcodeData, {
        format: 'CODE128',
        width: 400,
        height: 100,
    });

    return res.status(200).json({ barcodeImageUrl });
};
