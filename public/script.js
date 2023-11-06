const trackingForm = document.getElementById("tracking-form");
const trackingCodeInput = document.getElementById("tracking-code");
const plzInput = document.getElementById("plz");
const errorMsg = document.getElementById("tracking-error-msg");
const codeElement = document.getElementById("code");
const statusElement = document.getElementById("status");
const lieferadresseElement = document.getElementById("lieferadresse");
const arrivalElement = document.getElementById("arrival");
const gewichtElement = document.getElementById("gewicht");

trackingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const trackingCode = trackingCodeInput.value;
  const plz = plzInput.value;

  if (trackingCode === "" || trackingCode === null) {
    errorMsg.innerHTML = "Tracking-Code darf nicht leer sein.";
    return;
  } else if (plz === "" || plz === undefined) {
    errorMsg.innerHTML = "PLZ darf nicht leer sein.";
    return;
  }

  errorMsg.innerHTML = "";

  //TEMP REQUEST
 await fetch(`/data/${trackingCode.trim()}/${plz.trim()}`).then(res=>res.json()).then(data=>{
    codeElement.innerHTML = `${data._id || "Unbekannt"}`;
    statusElement.innerHTML = `${data.status || "Unbekannt"}`;
    lieferadresseElement.innerHTML = `${data.adresse || "Unbekannt"}, ${data.plz || "Unbekannt"} ${data.ort || "Unbekannt"}`;
    arrivalElement.innerHTML = `${data.ankunft || "Unbekannt"}`;
    gewichtElement.innerHTML = `${data.gewicht || "Unbekannt"}`;
  })
});
