/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        */
    }
};

var db = {
    // database Constructor
    initialize: function() {
        this.populate();
    },
    populate: function() {
       var myDB = window.openDatabase("products", "1.0", "products", 1000000);
       myDB.transaction(this.populateDB, this.errorDB, this.successDB);
    },
    populateDB: function(tx) {
            tx.executeSql('DROP TABLE IF EXISTS DEMO');
            tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
            tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
    },
    errorDB: function(tx, err) {
        alert("Error processing SQL: "+err);
    },
    
    successDB: function() {
    }
};

$(document).on('pageinit', '#accueil', function(){     
    //alert("testaccueil");       
});

$(document).on('pageinit', '#evaluate', function(){
    $(document).on('click', '#submit', function(){
        var mr16 = $("#nb_mr16").val();
        var gu10 = $("#nb_gu10").val();
        var gy635 = $("#nb_gy635").val();
        var tube6 = $("#nb_tube6").val();
        var tube12 = $("#nb_tube12").val();
        var tube15 = $("#nb_tube15").val();
        var carre1 = $("#nb_carre1").val();
        var rectangle2 = $("#nb_rectangle2").val();
        var rectangle3 = $("#nb_rectangle3").val();
        var ronddown = $("#nb_ronddown").val();
        var rectangledown = $("#nb_rectangledown").val();
        var r7s = $("#nb_r7s").val();
        var dalle = $("#nb_dalle").val();
        var globe = $("#nb_globe").val();
        var ampoule75 = $("#nb_ampoule75").val();
        var ampoule100 = $("#nb_ampoule100").val();
        var cloche = $("#nb_cloche").val();
        var tunnel = $("#nb_tunnel").val();

        var total_energy = (mr16*50) + (gu10*50) + (gy635*25) + (tube6*23) + (tube12*45) + (tube15*73) + (carre1*100) + (rectangle2*200) + (rectangle3*300) + (ronddown*52) + (rectangledown*150) + (r7s*300) + (dalle*92) + (globe*100) + (ampoule75*75) + (ampoule100*100) + (cloche*400) + (tunnel*300);
        var led_energy = (mr16*4.5) + (gu10*4.5) + (gy635*4.9) + (tube6*10) + (tube12*20) + (tube15*25) + (carre1*20) + (rectangle2*38) + (rectangle3*58) + (ronddown*18) + (rectangledown*12) + (r7s*30) + (dalle*40) + (globe*30) + (ampoule75*6) + (ampoule100*12) + (cloche*160) + (tunnel*90);
        var economy_energy = Math.round(((total_energy - led_energy) * 300 * 10 )/1000);
        var economy = Math.round((economy_energy * 0.11));
        //alert('Economie de  : '+economy_energy+' KWH / an\n\n Economie totale de '+economy+'€ \ an');

        var resultPage = $("<div data-role=dialog data-url=result><div data-role=header><h1>Resultat</h1></div><div data-role=content>Economie de  : "+economy_energy+" KWH / an<br/><br/> Economie totale de <b>"+economy+" €</b> \ an</div>");
        resultPage.appendTo($.mobile.pageContainer);

        $.mobile.changePage(resultPage);

        return false;
    });
});