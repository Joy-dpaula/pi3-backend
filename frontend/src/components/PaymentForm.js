import React, { useState } from 'react';
import api from '../services/api';

const PaymentForm = () => {
  const [value, setValue] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [cardNumber, setCardNumber] = useState('');
  const [cardBrand, setCardBrand] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [holderName, setHolderName] = useState('');
  const [response, setResponse] = useState(null);
  const [cardError, setCardError] = useState('');
  const [cards, setCards] = useState([]); // Lista de cartões
  const [selectedCard, setSelectedCard] = useState(null); // Cartão selecionado para pagamento

  const handlePayment = async () => {
    if (!selectedCard && paymentMethod === 'credit-card') {
      setCardError('Por favor, selecione um cartão para continuar.');
      return;
    }

    setCardError(''); // Limpa o erro se o cartão for válido

    try {
      let res;
      if (paymentMethod === 'pix') {
        res = await api.post('/api/payment/pix', { value: parseFloat(value) });
      } else if (paymentMethod === 'credit-card') {
        res = await api.post('/api/payment/credit-card', {
          cardNumber: selectedCard.cardNumber,
          expiryDate: selectedCard.expiryDate,
          cvv: selectedCard.cvv,
          holderName: selectedCard.holderName,
          cardBrand: selectedCard.cardBrand,
        });
      } else if (paymentMethod === 'boleto') {
        res = await api.post('/api/payment/boleto', { value: parseFloat(value) });
      }
      setResponse(res.data);
    } catch (error) {
      console.error('Payment error', error);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
    setCardNumber(value);
    const brand = getCardBrand(value);
    setCardBrand(brand);
    setCardError(brand ? '' : 'Número de cartão inválido.'); // Exibe erro se a bandeira não for reconhecida
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const getCardBrand = (number) => {
    const visa = /^4[0-9]{6,}$/;
    const mastercard = /^5[1-5][0-9]{5,}$/;
    const amex = /^3[47][0-9]{5,}$/;
    const diners = /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/;
    const discover = /^6(?:011|5[0-9]{2})[0-9]{3,}$/;
    const jcb = /^(?:2131|1800|35\d{3})\d{11}$/;
    const elo = /^(((636368)|(438935)|(504175)|(451416)|(509048)|(509067)|(509049)|(509069)|(509050)|(509074)|(509068)|(509040)|(509045)|(509051)|(509046)|(509066)|(509047)|(509042)|(509052)|(509064)|(509043)|(509058)|(509060)|(36297)|(5067)|(4576)|(4011)|(506699)|(5067)))/;
    
    if (visa.test(number)) return 'Visa';
    if (mastercard.test(number)) return 'MasterCard';
    if (amex.test(number)) return 'American Express';
    if (diners.test(number)) return 'Diners Club';
    if (discover.test(number)) return 'Discover';
    if (jcb.test(number)) return 'JCB';
    if (elo.test(number)) return 'Elo';
    
    return ''; // Retorna string vazia se a bandeira não for reconhecida
  };

  const addCard = () => {
    if (!cardBrand) {
      setCardError('Número de cartão inválido. Por favor, verifique e tente novamente.');
      return;
    }

    const newCard = {
      cardNumber,
      cardBrand,
      expiryDate,
      cvv,
      holderName,
    };

    setCards([...cards, newCard]);
    setCardNumber('');
    setCardBrand('');
    setExpiryDate('');
    setCvv('');
    setHolderName('');
    setCardError('');
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
          <h3>Adicionar Novo Cartão</h3>
          <label>
            Número do Cartão:
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Número do Cartão"
              maxLength="19" // Limite para um número de cartão de crédito padrão
            />
            {cardBrand && <span>Bandeira: {cardBrand}</span>}
            {cardError && <span style={{ color: 'red' }}>{cardError}</span>} {/* Mensagem de erro */}
          </label>
          <label>
            Data de Expiração:
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/AA"
              maxLength="5" // Limite para MM/AA
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="CVV"
              maxLength="3" // Limite para 3 dígitos
            />
          </label>
          <label>
            Nome do Titular:
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="Nome do Titular"
            />
          </label>
          <button onClick={addCard}>Adicionar Cartão</button>
        </div>
      )}

      {cards.length > 0 && (
        <div>
          <h3>Cartões Adicionados</h3>
          <ul>
            {cards.map((card, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name="selectedCard"
                  value={index}
                  onChange={() => setSelectedCard(card)}
                />
                {card.cardBrand} - **** **** **** {card.cardNumber.slice(-4)} {/* Mostra os últimos 4 dígitos do cartão */}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handlePayment}>Pagar</button>

      {response && (
        <div>
          <h3>Resultado:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
