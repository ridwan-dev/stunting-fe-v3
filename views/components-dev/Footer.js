const Footer = {
  /**
   * Render the component content.
   */
  render: async () => {
    return /*html*/ `
    <div id="footer" class="app-footer m-0 fw-normal">
      2022 &copy; <a href="https://www.bappenas.go.id/unit-kerja/0101" class="text-muted  fw-normal text-decoration-none" target="_blank">
                    Direktorat Kesehatan dan Gizi Masyarakat | Kementerian PPN/ Bappenas
                  </a>
    </div>
    `;
  },
  after_render: async () => { },
  getData: async () => {
    return /*html*/ `
          <div class="container text-center text-muted fw-normal">
              2022 &#169; 
              <a href="https://www.bappenas.go.id/unit-kerja/0101" class="text-muted fw-normal text-decoration-none" target="_blank">
                Direktorat Kesehatan dan Gizi Masyarakat | Kementerian PPN/ Bappenas
              </a>
          </div>
    `;
  }
};

export default Footer;
