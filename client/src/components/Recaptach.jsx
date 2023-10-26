import ReCAPTCHA from "react-google-recaptcha";

function onChange(value) {
  console.log("Captcha value:", value);
}

ReactDOM.render(
  <ReCAPTCHA
    sitekey="6Ld0bdAoAAAAAMY78QHC8fiU-Xb3vlBSg71xSkY2"
    onChange={onChange}
  />,
  document.body
);