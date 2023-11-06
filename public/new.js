
document.addEventListener("DOMContentLoaded",function(){
    const errMsg = document.getElementById("code-return")
    const form = document.querySelector("form");

    let plz;
    let ort;
    let adresse;
    let gewicht;

    

    form.addEventListener("submit",function(event){
        event.preventDefault()
        plz = document.querySelector('input[name="plz"]').value;
        ort = document.querySelector('input[name="ort"]').value;
        adresse = document.querySelector('input[name="adresse"]').value;
        gewicht = document.querySelector('input[name="gewicht"]').value;
        if (plz === '' || ort === '' || adresse === '' || gewicht === '') {
            errMsg.style.color="red";
            errMsg.innerHTML="Alle Felder müssen ausgefüllt sein"
            return;
        }
        errMsg.innerHTML=""
        errMsg.style.color="black"
        form.reset()
        fetch(`/data/`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "plz": `${plz}`,
                "ort": `${ort}`,
                "adresse": `${adresse}`,
                "gewicht": `${gewicht}`
            })
        }).then(res=>res.json()).then(resp=>errMsg.innerHTML=`Packet ${resp._id} wurde erstellt`)
    })





})