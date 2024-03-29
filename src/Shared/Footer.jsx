const Footer = () => {
  return (
    <>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by ReactHub.</p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
