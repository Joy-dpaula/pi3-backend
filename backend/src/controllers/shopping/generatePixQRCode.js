import express from 'express';
import qrcode from 'qrcode';

const router = express.Router();

router.post('/pix', async (req, res) => {
  const { value } = req.body;

  // Formate o valor para incluir duas casas decimais
  const formattedValue = (value / 100).toFixed(2);

  // Estrutura básica do BR Code para Pix
  const pixData = `
000201
010212
26360014BR.GOV.BCB.PIX0114+556199999999
52040000
5303986
5405${formattedValue}
5802BR
5913Nome do Recebedor
6016Cidade do Recebedor
62070503***6304
`.replace(/\s+/g, '');

  try {
    // Gerar o QR Code a partir do Pix BR Code
    const qrCode = await qrcode.toDataURL(pixData);

    // Retornar o QR Code gerado e o valor
    res.json({
      qrCode,
      value,
    });
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error);
    res.status(500).json({ error: 'Erro ao gerar QR Code' });
  }
});

export default router;
