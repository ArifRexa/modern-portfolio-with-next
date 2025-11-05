'use client';

export default function Contact() {
  return (
    <div className="p-4 lg:p-6">
      <section className="st-dark-bg" style={{ marginBottom: '250px', marginTop: '100px' }}>
    <div className="st-height-b100 st-height-lg-b80"></div>
    <div className="container">
      <div className="st-section-heading st-style1">
        <h4 className="st-section-heading-title">CONTACT ME</h4>
        <h2 className="st-section-heading-subtitle">CONTACT ME</h2>
      </div>
      <div className="st-height-b25 st-height-lg-b25"></div>
    </div>

    {/* Contact Container */}
    <div className="container">
      <div className="row">
        <div className="st-height-b0 st-height-lg-b30"></div>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <div className="st-height-b0 st-height-lg-b40"></div>
          {/* <h3 className="st-contact-title">Contact Info</h3> */}
          <div className="st-contact-text text-center">
            If you&apos;d like to get in touch, feel free to reach out through any of the following methods:
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <div className="st-single-contact-info">
              <i className="fas fa-message"></i>
              <div className="st-single-info-details">
                <h4>Send Message</h4>
                <a href="https://form.jotform.com/242975702212050" className="st-social-btn" target="_blank">
                  <span className = "st-social-icon">Click here <br /> Send me direct message</span>
                </a>
              </div>
            </div>
            <div className="st-single-contact-info">
              <i className="fas fa-envelope"></i>
              <div className="st-single-info-details">
                <h4>Email</h4>
                <a href="#">arif.reza3126@gmail.com</a>
                <a href="#">mailarif3126@gmail.com</a>
              </div>
            </div>
            <div className="st-single-contact-info phone">
              <i className="fas fa-phone-alt"></i>
              <div className="st-single-info-details">
                <h4>Phone</h4>
                <a href="#">+8801677243126 <br /> +8801995652864</a>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <div>
              {/* <div className="st-social-text">Visit my social profile and get connected</div> */}
              <div className="st-social-link d-flex flex-wrap justify-content-center align-items-center">
                <a href="https://www.linkedin.com/in/md-arif-rexa/" className="st-social-btn" target="_blank">
                  <span className="st-social-icon"><i className="fab fa-linkedin"></i></span>
                  <span className="st-icon-name">LinkedIn</span>
                </a>
                <a href="https://github.com/ArifRexa/" className="st-social-btn" target="_blank">
                  <span className="st-social-icon"><i className="fab fa-github"></i></span>
                  <span className="st-icon-name">Github</span>
                </a>
                <a href="https://x.com/MdArifReza3" className="st-social-btn" target="_blank">
                  <span className="st-social-icon"><i className="fab fa-twitter"></i></span>
                  <span className="st-icon-name">Twitter</span>
                </a>
                <a href="https://www.threads.net/@arif_rexa" className="st-social-btn" target="_blank">
                  <span className="st-social-icon"><i className="fa-brands fa-threads"></i></span>
                  <span className="st-icon-name">Threads</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="st-height-b100 st-height-lg-b80"></div>
    <style jsx>{`
      .st-single-contact-info {
        margin: 0px 50px 50px 0px;
      }

      @media only screen and (min-device-width: 10px) and (max-device-width: 1024px) {
        .phone {
          margin-left: -42px;
        }
      }
    `}</style>
  </section>
</div>
  );
}
