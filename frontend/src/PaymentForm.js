import React, { useState } from 'react';
import api from '../services/api';
import visalogo from '../assets/visalogo.png';
import mastercardlogo from '../assets/mastercardlogo.png';
import amexlogo from '../assets/amexlogo.png';
import defaultCardLogo from '../assets/logo.svg'; // Usei o logo padrão para cartões não reconhecidos

const cardLogos = {
  visa: visalogo,
  mastercard: mastercardlogo,
  amex: amexlogo,
  default: defaultCardLogo,
};

const getCardType = (number) => {
  const cardNumber = number.replace(/\s+/g, ''); // Remover espaços
  if (/^4[0-9]{0,}$/.test(cardNumber)) {
    return 'visa';
  } else if (/^5[1-5][0-9]{0,}$/.test(cardNumber)) {
    return 'mastercard';
  } else if (/^3[47][0-9]{0,}$/.test(cardNumber)) {
    return 'amex';
  } else {
    return 'default'; // Se não identificar, retorna o logo padrão
  }
};

const PaymentForm = () => {
  const [value, setValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [qrCode, setQrCode] = useState('');
  const [pixValue, setPixValue] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('default'); // Tipo de cartão padrão

  const handlePayment = async () => {
    try {
      setError(null); // Limpa o erro antes de fazer uma nova tentativa de pagamento
      let res;

      if (paymentMethod === 'pix') {
        res = await api.post('/api/payment/pix', { value: parseFloat(value) });
        setQrCode(res.data.qrCodeURL);
        setPixValue((res.data.value / 100).toFixed(2)); // Converte o valor para exibir em reais
      } else if (paymentMethod === 'credit-card') {
        res = await api.post('/api/payment/credit-card', {
          cardNumber,
          expiryDate: '12/25',
          cvv: '123',
          holderName: 'Test User',
          amount: parseFloat(value), // Adiciona o valor à requisição
        });
      } else if (paymentMethod === 'boleto') {
        res = await api.post('/api/payment/boleto', { value: parseFloat(value) });
      }

      setResponse(res.data);
    } catch (error) {
      console.error('Payment error', error);
      setError('Ocorreu um erro ao processar o pagamento. Tente novamente.');
    }
  };

  const handleCardNumberChange = (e) => {
    const number = e.target.value;
    setCardNumber(number);
    const type = getCardType(number);
    setCardType(type);
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

      {paymentMethod === 'credit-card' && (
        <div>
          <label>
            Número do Cartão:
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Digite o número do cartão"
            />
          </label>
          <div>
            <img src={cardLogos[cardType]} alt={`${cardType} logo`} width="50" />
          </div>
        </div>
      )}

      <button onClick={handlePayment}>Pagar</button>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <p>{error}</p>
        </div>
      )}

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
          {paymentMethod === 'boleto' ? (
            <div>
              <p>Boleto gerado com sucesso!</p>
              <p><a href={response.boletoUrl} target="_blank" rel="noopener noreferrer">Clique aqui para ver o boleto</a></p>
            </div>
          ) : (
            <pre>{JSON.stringify(response, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;