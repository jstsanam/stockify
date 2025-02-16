import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        Copyright &copy; 2025. Made with &hearts; by Sanam
      </div>
      <div className="footer-button-group">
        <a
          href="https://github.com/jstsanam/real-time-stock-market"
          className="footer-buttons"
          target="_blank"
        >
          <img
            src="/assets/github.png"
            className="footer-button-image"
            alt="Github logo"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/jstsanam1306/"
          className="footer-buttons"
          target="_blank"
        >
          <img
            src="/assets/linkedin.png"
            className="footer-button-image"
            alt="LinkedIn logo"
          />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=jstsanam@gmail.com"
          className="footer-buttons"
          target="_blank"
        >
          <img
            src="/assets/gmail.png"
            className="footer-button-image"
            alt="Gmail logo"
          />
        </a>
      </div>
    </footer>
  );
}
