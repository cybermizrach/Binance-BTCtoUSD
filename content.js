var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      callback((xhr.status === 200)?null:xhr.status, xhr.response);
    };
    xhr.send();
};

var interval = setInterval(function(){
    if(BTCtoUSD != 0){
        $('.accountInfo-lists li.td .equalValue').each(function(element){
            btcValue = parseFloat($(this).text());
            usdValue = btcValue * BTCtoUSD;
            $(this).html(btcValue + " BTC <br /> ~" + usdValue.toFixed(2) + " USD");
            clearInterval(interval);
        })
    }
}, 100)

var BTCtoUSD = 0;
function getUSDvalue() {
    getJSON('https://blockchain.info/ticker', function(err, data) {
        if (err !== null) {
            console.log('Error: ' + err);
            BTCtoUSD = 0;
        } 
        else {
            BTCtoUSD = data.USD.last;
            console.log( "BTC value ==> " + BTCtoUSD + " USD" );
        }
    });
}

getUSDvalue();


// observer.observe(document.getElementsByClassName('accountInfo-lists')[0], { childList: true, subtree: true, characterData: true });

