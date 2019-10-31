let avgorande = null;

let getCacheByPath = () => {

    let option = document.forms[0].elements[0].value;

    if (avgorande === null) {
        console.error('Du måste skapa entiteten innan du kan hämta den.');
        return;
    }

    let cacheHaders = null;
    let cache = false;

    //entiteten är precis skapad, vi vet inte versionen.
    if (avgorande.version != null) {
        cache = true;
    }

    let url = null;
    if (option === 'composit') {
        url = "http://localhost:3000/api?id=" + avgorande.id + '-' + avgorande.version;
    } else {
        url = "http://localhost:3000/api/" + avgorande.id + '/' + avgorande.version;
    }
  
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

let getEtag = () => {

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

    let url = "http://localhost:3000/api/etag?id=" + avgorande.id;
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
        //get();
    });

}

let updateEtag = () => {

    let url = "http://localhost:3000/api/etag";

    $.ajax({
        method: "PUT",
        data: avgorande,
        'url': url,
    }).then(function(data, textStatus, jqXHR) {
    });

}

let update = () => {

    let url = "http://localhost:3000/api/";

    $.ajax({
        method: "PUT",
        data: avgorande,
        'url': url,
    }).then(function(data, textStatus, jqXHR) {
        avgorande.version = data.version;
    });

}



let createEtag = () => {

    $.ajax({
        method: "POST",
        data: {},
        url: "http://localhost:3000/api/etag",
    }).then(function(data, textStatus, jqXHR) {
        avgorande = JSON.parse(data);
        //get();
    });

}

