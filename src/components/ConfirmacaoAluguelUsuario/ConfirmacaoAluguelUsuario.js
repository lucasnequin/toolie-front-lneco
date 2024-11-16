import React, { useState, useEffect } from 'react';
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

  // Recalcular a duração sempre que as datas mudarem
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate); // Formato ISO yyyy-mm-dd é compatível
      const end = new Date(endDate);

      if (!isNaN(start) && !isNaN(end) && start <= end) {
        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDuration(diffDays);
      } else {
        setDuration(0); // Define como 0 se as datas forem inválidas
      }
    }
  }, [startDate, endDate]);

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
            type="date" // Substituir por type="date" para simplificar o uso
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.dateInput}
          />
          <input
            type="date" // Substituir por type="date" para simplificar o uso
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
            <p className={styles.detailValue}>
              R$ {duration * 20} {/* Substituir por cálculo real */}
            </p>
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
            className={`${styles.paymentOption} ${
              selectedOption === 'Cartão de Crédito' ? styles.selected : ''
            }`}
            onClick={() => handleOptionSelect('Cartão de Crédito')}
          >
            Cartão de crédito
          </div>
          <div
            className={`${styles.paymentOption} ${
              selectedOption === 'Pix' ? styles.selected : ''
            }`}
            onClick={() => handleOptionSelect('Pix')}
          >
            Pix
          </div>
          <div
            className={`${styles.paymentOption} ${
              selectedOption === 'Pagamento na entrega' ? styles.selected : ''
            }`}
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
