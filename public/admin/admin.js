document.addEventListener("DOMContentLoaded",function(){

// Get the radio buttons and the corresponding forms
const radioButtons = document.querySelectorAll("input[name='mode']");
const formDivs = document.querySelectorAll(".form-div")
const forms = document.querySelectorAll('form');

forms.forEach(form => form.addEventListener("submit",function(event){
    event.preventDefault()
    let id;
    let oplz;
    switch (form.className) {
        case "1":
            id = form["id"].value.trim()
            oplz = form["oldPlz"].value
            fetch(`/data/${id}/${oplz}/${getApiKey()}`,{
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    plz: form["newPlz"].value==""?null:form["newPlz"].value,
                    ort: form["ort"].value==""? null:form["ort"].value,
                    adresse: form["adresse"].value==""? null:form["adresse"].value,
                    status: $("select#upStat option:checked" ).val()
                })
            }).then(a=>{
                if(a.status==200){
                    alert("Erfolgreich geändert")
                }
                
            }).catch(error=>alert(`Error ${error}`))
            form.reset()
            break;
        case "2":
            id = form["id"].value
            oplz = form["plz"].value
            fetch(`/data/${id}/${oplz}/${getApiKey()}`,{
                method: "DELETE",
            }).then(a=>{
                if(a.status==200){
                    alert("Erfolgreich gelöscht")
                }
                
            }).catch(error=>alert(`Error ${error}`))
            form.reset()
            break;
    }
}) )

document.querySelector("#aktualisieren").style.display="block"

radioButtons.forEach(radioButton => radioButton.addEventListener('click', () => {
    let windowParams = window.location.search.substring(1).split("&")
    formDivs.forEach(div => {
        if (div.id === radioButton.value) {
            div.style.display = 'block';
            try {
                div.querySelector("form").reset();
            } catch (error) {
                updateList()
            }
        } else {
            div.style.display = 'none';
        }
    });
}));

function updateList() {
    fetch(`/data/${getApiKey()}`)
      .then(res => res.json())
      .then(items => {
        items.sort((a, b) => a.plz - b.plz);
        const itemsList = document.querySelector('#items-table');
        let dClass = 0;
  

        const trElements = document.querySelectorAll('tr');
        trElements.forEach(checkAndDeleteTr);
        items.forEach(item => {
          const itemElement = document.createElement('tr');
          itemElement.className = `dClass${dClass++ % 2}`;
  
          const text = `
            <td>${item._id}</td>
            <td>${item.plz}</td>
            <td>${item.ort}</td>
            <td>${item.adresse}</td>
            <td>${item.status}</td>
            <td>${item.gewicht}kg</td>
            <td>${new Date(item.ankunft).toLocaleDateString()}</td>
          `;
          itemElement.innerHTML = text;
          itemsList.appendChild(itemElement);
        })
    });
        
}});
    
function getApiKey() {
    let key = document.querySelector("#api-key").value
    return key
}

//ChatGPT Generiert
function checkAndDeleteTr(tr) {
    const thChildElements = tr.querySelectorAll('th');
    const tdChildElements = tr.querySelectorAll('td');
  
    if (tdChildElements.length > 0) {
      tr.remove();
    }
  }