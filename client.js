let avgorande = null;

let get = () => {

    if (avgorande === null) {
        console.error('Du måste skapa entiteten innan du kan hämta den.');
        return;
    }

    let cacheHaders = null;
    let cache = false;

    //entiteten är precis skapad, vi vet inte versionen.
    if (avgorande.version != null) {
        cacheHaders = {
            'If-None-Match': avgorande.version
        }
        cache = true;
    }

    let url = "http://localhost:3000/api?id=" + avgorande.id;
    console.log(url);
    $.ajax({
        'url': url,
        headers: cacheHaders,
        'cache': cache,
    }).then(function(data, textStatus, jqXHR) {
        if (jqXHR.status === 200) { //304 är tomt
            avgorande = data;
            $('.id').text(avgorande.id);
            $('.version').text(avgorande.version);
        }
    });
    
}

let create = () => {

    $.ajax({
        method: "POST",
        data: {},
        url: "http://localhost:3000/api",
    }).then(function(data, textStatus, jqXHR) {
        avgorande = JSON.parse(data);
        get();
    });

}

let update = () => {

    $.ajax({
        method: "PUT",
        data: avgorande,
        url: "http://localhost:3000/api/",
    }).then(function(data, textStatus, jqXHR) {
        get();
    });

}

