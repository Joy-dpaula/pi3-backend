import { v4 as uuidv4 } from 'uuid';

/**
 * Simula a geração de um boleto com código de barras
 * @param {Object} req - Requisição HTTP
 * @param {Object} res - Resposta HTTP
 */
export async function generateBoleto(req, res) {
    try {

        const transactionId = uuidv4();

        const boletoData = {
            transactionId,
            amount: req.body.amount || 5000, 
            beneficiary: req.body.beneficiary || 'Beneficiário Exemplo',
            dueDate: req.body.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
            barcode: generateFakeBarcode(),
        };

        const barcodeImage = await generateBarcodeImage(boletoData.barcode);

        console.log('Boleto Simulado:', boletoData);

        return res.json({
            boletoData,
            barcodeImage, 
        });

    } catch (error) {
        console.error('Erro ao gerar o boleto simulado:', error);
        return res.status(500).json({ error: 'Erro ao gerar o boleto simulado' });
    }
}
/**
 * Gera um código de barras fictício.
 * @returns {string} - Um código de barras fictício
 */
function generateFakeBarcode() {

    let barcode = '';
    for (let i = 0; i < 47; i++) {
        barcode += Math.floor(Math.random() * 10).toString();
    }
    return barcode;
}

/**
 * Gera uma imagem do código de barras em formato base64.
 * @param {string} barcode 
 * @returns {Promise<string>}
 */
function generateBarcodeImage(barcode) {
    return new Promise((resolve, reject) => {
        bwipjs.toBuffer({
            bcid: 'code128',      
            text: barcode,         
            scale: 3,             
            height: 10,            
            includetext: true,    
            textxalign: 'center',  
        }, (err, png) => {
            if (err) {
                return reject(err);
            }
            resolve(`data:image/png;base64,${png.toString('base64')}`);
        });
    });
}