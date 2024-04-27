document.getElementById("clipboard").addEventListener("input", function(e) {
    
    var pastedData = e.target.value

    fetch('/paste', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({clipboard: pastedData})
    }).then(response => {
        return response.json()
    })
})


var interval = setInterval(function() {
    fetch('/fetch', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        if (data.clipboard !== document.getElementById("clipboard").value) {
            document.getElementById("clipboard").value = data.clipboard
        }
    }).catch(error => {
        console.log(error)
        clearInterval(interval)
    })
}, 2000)



document.getElementById("copy").addEventListener("click", function() {
    var copyText = document.getElementById("clipboard")
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copyText.value)
    
    button = document.getElementById("copy")

    button.classList.add("contrast")
    setTimeout(function() {
        button.classList.remove("contrast")
    }, 500)
})


document.getElementById("clear").addEventListener("click", function() {
    document.getElementById("clipboard").value = ""
    fetch('/paste', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({clipboard: ""})
    }).then(response => {
        return response.json()
    })
})