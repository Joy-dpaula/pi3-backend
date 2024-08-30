import React, { useState } from 'react';
import api from '../services/api';

const PaymentForm = () => {
  const [value, setValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [qrCode, setQrCode] = useState('');
  const [pixValue, setPixValue] = useState('');
  const [response, setResponse] = useState(null);

  const handlePayment = async () => {
    try {
      let res;
      if (paymentMethod === 'pix') {
        res = await api.post('/api/payment/pix', { value: parseFloat(value) });
        setQrCode(res.data.qrCode);
        setPixValue(res.data.value);
      } else if (paymentMethod === 'credit-card') {
        res = await api.post('/api/payment/credit-card', {
          cardNumber: '4111111111111111',
          expiryDate: '12/25',
          cvv: '123',
          holderName: 'Test User',
        });
      } else if (paymentMethod === 'boleto') {
        res = await api.post('/api/payment/boleto', { value: parseFloat(value) });
      }
      setResponse(res.data);
    } catch (error) {
      console.error('Payment error', error);
    }
  };

  return (
    <div>
      <h2>Pagamento</h2>
      <label>
        Valor do Veículo:
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Digite o valor"
        />
      </label>

      <label>
        Método de Pagamento:
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="pix">Pix</option>
          <option value="credit-card">Cartão de Crédito</option>
          <option value="boleto">Boleto</option>
        </select>
      </label>

      <button onClick={handlePayment}>Pagar</button>

      {paymentMethod === 'pix' && qrCode && (
        <div>
          <h3>QR Code para Pagamento Pix</h3>
          <img src={qrCode} alt="QR Code Pix" />
          <p>Valor: R$ {pixValue}</p>
        </div>
      )}

      {response && paymentMethod !== 'pix' && (
        <div>
          <h3>Resultado:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
