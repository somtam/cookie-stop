(function (window) {

    var d = window.document;
    var cookieName = "cookieStopAccept";
    var cookieNameId = "ck-stop";
    var btAccept = "cookieStopBt";
    var cookieSetup = false;

    var cookieStop = {
        config: function (cnt, btok, btinfo, link, color) {
            this.cnt = cnt;
            this.btok = btok;
            this.btinfo = btinfo;
            this.link = link;

            if (color === 'dark') {
                this.bg = '#333';
                this.bgBorder = '#222';
                this.textColour = '#ccc';
            } else {
                this.bg = '#ccc';
                this.bgBorder = '#999';
                this.textColour = '#333';
            }
            this.cookieMain();
        },
        cookieMain: function () {
            var hasCookie = this.checkCookie(cookieName);
            if ("" === hasCookie) {
                var cookieBar = this.createBar();
                this.showBar(cookieBar);
                this.addEventsForCookie();
            } else {
                return;
            }
        },
        checkCookie: function (cname) {
            // Display the header only if the cookie has not been set.
            //return d.cookie.match(new RegExp(cookieName + '=([^;]+)'));

            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ')
                    c = c.substring(1);
                if (c.indexOf(name) == 0)
                    return c.substring(name.length, c.length);
            }
            return "";

        },
        createBar: function () {
            var barStyle = 'position:fixed; width:100%; background-color:' + this.bg + '; color:' + this.textColour +
                    '; margin:0; left:0; line-height:2.5; border-bottom:1px solid ' + this.bgBorder + ';' +
                    ' top:0; padding:15px 20px; z-index:1000; text-align:center;';
            var bar = d.createElement('div');
            bar.id = cookieNameId;
            bar.style.cssText = barStyle;
            bar.innerHTML = this.cnt + ' <a href="#" id="cookieStopAccept" style="' +
                    'background-color:#f2f2f2; padding:5px 5px; text-decoration:none; ' +
                    ' -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;color:#333; margin-left:20px;">' +
                    this.btok + '</a> <a href="' + this.link + '" style="color:#666; margin-left:20px">' +
                    this.btinfo + '</a>';
            return bar;
        },
        showBar: function (bar) {
            d.body.appendChild(bar);
        },
        addEventsForCookie: function () {
            d.onclick = this.afterAccept;
            d.onscroll = this.checkScrollAmount;
        },
        checkScrollAmount: function(){
		    if( window.scrollY > 100){
		        window.cookieStop.afterAccept();
			}  
        },
        afterAccept: function () {
            if (cookieSetup === false) {
                insertCookie();
                activateServices();
                cookieSetup = true;
            }
        }
    };
    window.cookieStop = cookieStop;

    function insertCookie() {
        // Set the cookie expiry to one year after today.
        var expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = cookieName + '=y; expires=' + expiryDate.toGMTString() + '; path=/';
    }

    function activateServices() {
        var bar = d.getElementById(cookieNameId);
        bar.parentNode.removeChild(bar);
    }

})(this);