import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AluguelFerramenta.module.css';
import backIcon from './ic-left.svg'; // Importe o SVG da seta

const FerramentaItem = ({ icon, nome, preco, onRemove }) => (
  <div className={styles.ferramentaItem}>
    <div className={styles.icone}>{icon}</div>
    <div className={styles.nome}>{nome}</div>
    <div className={styles.preco}>
      <span className={styles.remover} onClick={onRemove}>X</span>
      <span>{`$${preco}`}</span>
    </div>
    <div className={styles.divisor} />
  </div>
);

FerramentaItem.propTypes = {
  icon: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  preco: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const OpcoesEntrega = ({ texto, selecionado, aoSelecionar }) => (
  <div className={styles.opcaoEntrega} onClick={aoSelecionar}>
    <button className={`${styles.indicador} ${selecionado ? styles.selecionado : ''}`} />
    <span>{texto}</span>
  </div>
);

OpcoesEntrega.propTypes = {
  texto: PropTypes.string.isRequired,
  selecionado: PropTypes.bool.isRequired,
  aoSelecionar: PropTypes.func.isRequired,
};

const AluguelFerramenta = () => {

  const [ferramentas, setFerramentas] = useState([
    { icon: '🔧', nome: "", preco: 10 },
    { icon: '🔩', nome: 'Ferramenta B', preco: 30 },
    { icon: '🔩', nome: 'Ferramenta C', preco: 30 },
    { icon: '🔩', nome: 'Ferramenta D', preco: 30 },
  ]);
  const [opcaoEntrega, setOpcaoEntrega] = useState('Retirada grátis');
  

  const handleRemoveItem = (index) => {
    setFerramentas(ferramentas.filter((_, i) => i !== index));
  };

  const handleSelectOption = (texto) => {
    setOpcaoEntrega(texto);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.backIcon}>
          <img src={backIcon} alt="Voltar" />
        </span>
        <h1>Aluguel da ferramenta</h1>
      </header>

      <section className={styles.section}>
        <div className={styles.headerFerramentas}>
          <h3 className={styles.subtitulo}>Ferramentas adicionadas</h3>
          <button onClick={() => setFerramentas([])} className={styles.esvaziar}>Esvaziar</button>
        </div>

        <div className={styles.ferramentasLista}>
          {ferramentas.length === 0 ? (
            <div className={styles.ferramentasVazio}>
              <span>Nenhuma ferramenta selecionada</span>
            </div>
          ) : (
            ferramentas.map((item, index) => (
              <FerramentaItem
                key={index}
                icon={item.icon}
                nome={item.nome}
                preco={item.preco}
                onRemove={() => handleRemoveItem(index)}
              />
            ))
          )}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.subtitulo}>Detalhes da entrega</h3>
        <input type="text" placeholder="Insira seu CEP" className={styles.input} />
        <div className={styles.endereco}>
          <span>Endereço:</span>
          <span>123 Rua da EACH</span>
        </div>
      </section>

      <section className={styles.opcoesEntrega}>
        <h3 className={styles.subtitulo}>Opções de Entrega</h3>
        {['Entrega rápida', 'Retirada grátis'].map((texto) => (
          <OpcoesEntrega
            key={texto}
            texto={texto}
            selecionado={opcaoEntrega === texto}
            aoSelecionar={() => handleSelectOption(texto)}
          />
        ))}
      </section>

      <button className={styles.botaoAlugar}>Alugar</button>
    </div>
  );
};

export default AluguelFerramenta;
