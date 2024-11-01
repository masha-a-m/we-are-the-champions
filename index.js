import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue } from  "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-7b2ac-default-rtdb.firebaseio.com/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "endorsementsList")

const inputFieldEl = document.getElementById("input-field");
const publishBtn = document.getElementById("publish-btn");
const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const endorsementsListEl = document.getElementById("endorsements-list");

publishBtn.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    let fromValue = fromEl.value;
    let toValue = toEl.value;

    push(endorsementsListInDB, inputValue, fromValue, toValue)

    clearInputFieldEl()
    clearFromEl()
    clearToEl()
})

onValue(endorsementsListInDB, function(snapshot) {
    // console.log(snapshot.val())

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearEndorsementsListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            

            appendItemToEndorsementsListEl(currentItem)
        }
    }
})

function clearEndorsementsListEl() {
    endorsementsListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function clearFromEl() {
    fromEl.value = ""
}
function clearToEl() {
    toEl.value = ""
}

function appendItemToEndorsementsListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("p");
    newEl.textContent = itemValue;

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsementsList/${itemID}`)
    })

    endorsementsListEl.append(newEl);

} 