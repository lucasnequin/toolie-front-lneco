import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ConfirmacaoAluguelUsuario.module.css';
import backIcon from './ic-left.svg'; // Caminho relativo ao arquivo do componente

// Componente reutilizável para notas
const Nota = ({ texto }) => <p className={styles.nota}>{texto}</p>;

Nota.propTypes = {
  texto: PropTypes.string.isRequired,
};

const ConfirmacaoAluguelUsuario = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleDateChange = (dateType, value) => {
    const formattedDate = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    if (dateType === 'start') {
      setStartDate(formattedDate);
    } else {
      setEndDate(formattedDate);
    }

    // Calcular duração em dias quando ambas as datas estiverem preenchidas
    if (startDate && endDate) {
      const start = new Date(startDate.split('/').reverse().join('-'));
      const end = new Date(endDate.split('/').reverse().join('-'));
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(diffDays);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.backIcon}>
            <img src={backIcon} alt="Voltar" />
          </span>
          <h1>Confirmação de locação</h1>
        </div>
        <hr className={styles.divider} />
      </header>

      <section className={styles.section}>
        <h3 className={styles.subtitulo}>Detalhes da locação</h3>
        <div className={styles.dateContainer}>
          <input
            type="text"
            placeholder="Início"
            maxLength="10"
            value={startDate}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className={styles.dateInput}
          />
          <input
            type="text"
            placeholder="Final"
            maxLength="10"
            value={endDate}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className={styles.dateInput}
          />
        </div>
        <Nota texto="Selecione o período de aluguel" />
        <div className={styles.detailsContainer}>
          <div className={styles.detailBox}>
            <label className={styles.label}>Duração</label>
            <p className={styles.detailValue}>{duration} dias</p>
          </div>
          <div className={styles.detailBox}>
            <label className={styles.label}>Preço total</label>
            <p className={styles.detailValue}>R$ {/* insira aqui o cálculo do preço baseado na duração */}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitulo}>Endereço de entrega</h3>
        <div className={styles.addressContainer}>
          <input
            type="text"
            placeholder="Insira o endereço de entrega"
            className={styles.addressInput}
          />
        </div>
        <Nota texto="Selecione o endereço de entrega" />
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitulo}>Detalhes do Pagamento</h3>
        <div className={styles.paymentOptions}>
          <div
            className={`${styles.paymentOption} ${selectedOption === 'Cartão de Crédito' ? styles.selected : ''}`}
            onClick={() => handleOptionSelect('Cartão de Crédito')}
          >
            Cartão de crédito
          </div>
          <div
            className={`${styles.paymentOption} ${selectedOption === 'Pix' ? styles.selected : ''}`}
            onClick={() => handleOptionSelect('Pix')}
          >
            Pix
          </div>
          <div
            className={`${styles.paymentOption} ${selectedOption === 'Pagamento na entrega' ? styles.selected : ''}`}
            onClick={() => handleOptionSelect('Pagamento na entrega')}
          >
            Pagamento na entrega
          </div>
        </div>
        <Nota texto="Selecione a forma de pagamento desejada" />
      </section>

      <button className={styles.botaoAlugar}>Confirmar aluguel</button>
    </div>
  );
};

export default ConfirmacaoAluguelUsuario;
