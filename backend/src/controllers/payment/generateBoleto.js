import { v4 as uuidv4 } from 'uuid';

/**
 * Simula a geração de um boleto com código de barras
 * @param {Object} req - Requisição HTTP
 * @param {Object} res - Resposta HTTP
 */
export async function generateBoleto(req, res) {
    try {
        // Gerar um identificador único para o boleto simulado
        const transactionId = uuidv4();

        // Simular os dados do boleto
        const boletoData = {
            transactionId,
            amount: req.body.amount || 5000, // valor em centavos (exemplo: R$ 50,00)
            beneficiary: req.body.beneficiary || 'Beneficiário Exemplo',
            dueDate: req.body.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // vencimento em 7 dias
            barcode: generateFakeBarcode(), // Código de barras fictício
        };

        // Gerar o código de barras em imagem
        const barcodeImage = await generateBarcodeImage(boletoData.barcode);

        // Log para fins de depuração
        console.log('Boleto Simulado:', boletoData);

        // Retornar os dados do boleto e a imagem do código de barras como resposta
        return res.json({
            boletoData,
            barcodeImage, // Imagem do código de barras em base64
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
    // Gera um código de barras com 47 dígitos numéricos (ou qualquer outro formato)
    let barcode = '';
    for (let i = 0; i < 47; i++) {
        barcode += Math.floor(Math.random() * 10).toString();
    }
    return barcode;
}

/**
 * Gera uma imagem do código de barras em formato base64.
 * @param {string} barcode - O código de barras a ser convertido em imagem
 * @returns {Promise<string>} - A imagem do código de barras em base64
 */
function generateBarcodeImage(barcode) {
    return new Promise((resolve, reject) => {
        bwipjs.toBuffer({
            bcid: 'code128',       // Tipo de código de barras
            text: barcode,         // Texto a ser convertido em código de barras
            scale: 3,              // Escala do código de barras
            height: 10,            // Altura em milímetros
            includetext: true,     // Incluir texto abaixo do código de barras
            textxalign: 'center',  // Centralizar o texto abaixo do código de barras
        }, (err, png) => {
            if (err) {
                return reject(err);
            }
            resolve(`data:image/png;base64,${png.toString('base64')}`);
        });
    });
}