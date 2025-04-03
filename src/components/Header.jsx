import unicornCharacter from '../assets/images/unicorn-character.svg';

function Header() {
  return (
    <header className="app-header">
      <img src={unicornCharacter} alt="Eenhoorn" className="unicorn-logo" />
      <h1 className="rainbow-text">Eenhoorn Reken Avontuur</h1>
      <p className="subtitle">Rekenen leren is magisch!</p>
    </header>
  );
}

export default Header;
