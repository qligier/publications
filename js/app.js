//getHeaders();
//buildBreadcrumbs();
buildSections();

const headerState = {};
const visibleArr = [];
const invisibleArr = [];
window.oldScroll = 0;
window.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                console.log("currently visible " + id);
                headerState[id]="visible";
                if (this.oldScroll > this.scrollY) { //scrolling up
                    console.log("scrolling up");
                    visibleArr.unshift(id);
                    /* if (visibleArr.length > 1) {
                        //deactivate formerly active element
                        var elem=document.querySelector(`li[id="m${visibleArr[1]}"]`);
                        elem.classList.remove("active");
                        if (elem.classList.contains("has-submenu-toggle"))
                        {
                            $(elem).children("button").trigger("click");
                        }
                    } */
                }
                else { //scrolling down
                    console.log("scrolling down or initializing");
                    visibleArr.push(id);
                }
                
                //document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
            } else {
                console.log("currently invisible " + id);
                if (headerState[id] === "visible") {
                    headerState[id]="invisible";
                    if (this.oldScroll > this.scrollY) { //scrolling up
                        console.log("scrolling up");
                        visibleArr.pop();
                    }
                    else { //scrolling down
                        console.log("scrolling down");
                        visibleArr.shift();
                    }
                }
                /* let elem = document.querySelector(`li[id="m${id}"]`);
                if ((visibleArr.length > 0) && (elem !== null)) {
                    if (elem.classList.contains("active")) {
                        elem.classList.remove("active");
                        if (elem.classList.contains("has-submenu-toggle"))
                        {
                            $(elem).children("button").trigger("click");
                        }
                    }
                } */
                //document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
            }
        });
        this.oldScroll = this.scrollY;
        if (visibleArr.length > 0) {
            console.log("To be highlighted ", visibleArr[0]);
            let elem = document.querySelector(`li[id="m${visibleArr[0]}"]`);
            if (elem !== null) {
                if (!elem.classList.contains("active")) {
                    elem.classList.add("active");
                    if (elem.classList.contains("has-submenu-toggle"))
                    {
                        $(elem).children("button").trigger("click");
                    }
                }
            }
            for (const id in headerState) {
                if (id !== visibleArr[0]) {
                    const elem = document.querySelector(`li[id="m${id}"]`);
                    if (elem !== null) {
                        if (elem.classList.contains("active")) {
                            elem.classList.remove("active");
                        }
                        const value = headerState[id].split("^");
                        if (value.length === 2) {
                            if ((value[1]==="expanded") && !isParentMenu(id,visibleArr[0]))
                            {
                                $(elem).children("button").trigger("click");
                            }
                        }
                    }
                }
            }
            //$("#m" + visibleArr[0]).addClass("active");
            //console.log("found <li> " + $("#m" + visibleArr[0]).length );
        }
        console.log("Currently visible: ")
        console.log(visibleArr);
    });

    // Track all sections that have an `id` applied
    document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id], .heading7, .heading8').forEach((header) => {
        observer.observe(header);
    });
});
$(document).foundation();

console.log("compare 3.18 and 3.18.1 -> " + compareHeaders("3.18","3.18.1"));
console.log("compare 3.18.2 and 3.18.1 -> " + compareHeaders("3.18.2","3.18.1"));
console.log("compare 3.18.4.2 and 3.18.1 -> " + compareHeaders("3.18.4.2","3.18.4"));
console.log("compare 3.18.5 and 3.18.5 -> " + compareHeaders("3.18.5","3.18.5"));
// Generic AJAX GET client, handles variable number of arguments. 
// All arguments are then passed to the call-back function, 
// with the addition of the HTTP response body (passed as 
// the first argument to the call-back function.
var HttpClient = function () {
    var args = Array.prototype.slice.call(arguments);
    this.get = function (url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                args.unshift(httpRequest.responseText);
                callback.apply(null, args);
            }
        }

        httpRequest.open("GET", url, true);
        httpRequest.send(null);
    }
}

//Toggler functions
$('[data-toggler]').on('on.zf.toggler', function () {
    //var prefix = this.id.substr(0, this.id.lastIndexOf("-"));
    //$('#' + prefix + '-more').html('Read more<i class="fi fi-arrows-expand" aria-hidden="true"></i>');
    console.log('Toggler is On - ' + prefix);

});

$('[data-toggler]').on('off.zf.toggler', function () {
    //var prefix = this.id.substr(0, this.id.lastIndexOf("-"));
    //$('#' + prefix + '-more').html('Read less<i class="fi fi-arrows-compress" aria-hidden="true"></i>');
    console.log('Toggler is Off - ' + prefix);
});

$('.iframe-toggle').click(function (event) {
    console.log('Toggle clicked');
    $('#audit-5.1.1').foundation('toggle');
    event.preventDefault();
});

//execute body element functions
/*for (i = 0; i < hr_functions.length; i++) {
    hr_functions[i]();
}*/

var currYear = new Date().getFullYear();
$("#current-year").text(currYear);

//Handle search
$("#ihe-search-button").click(function () {
    var searchValue = $("#ihe-search-field").val();
    if (searchValue.length > 0) {
        var query = escape("site:https://profiles.ihe.net " + searchValue);
        window.location.href = "https://google.com/search?q=" + query;
    }
});

$('#ihe-search-field').keypress(function (e) {
    if (e.which == 13) {
        $(this).blur();
        $('#ihe-search-button').focus().click();
    }
});

//Back to top
$(function () {

    $(document).on('scroll', function () {

        if ($(window).scrollTop() > 100) {
            $('.scroll-top-wrapper').addClass('show');
        } else {
            $('.scroll-top-wrapper').removeClass('show');
        }
    });

    $('.scroll-top-wrapper').on('click', scrollToTop);
});

function scrollToTop() {
    verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $('body');
    offset = element.offset();
    offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop }, 500, 'linear');
}

function buildSections() {
    var headers = getHeaders();
    console.log(headers);
    buildBreadcrumbs(headers);
    //var element = $("main");
    //var headers = findTopHeader(element);
    var top = headers.menu.top;
    var children = headers.menu.children;

    if (top.multiple !== undefined) {
        console.log('Mutliple top-level headers');
    }
    else {
        console.log('Top is ' + top.id);
    }
    var menuItems = $(document.createElement("ul"));
    menuItems.addClass("vertical menu accordion-menu");
    menuItems[0].setAttribute("data-accordion-menu", "");
    menuItems[0].setAttribute("data-submenu-toggle", "true");
    //menuItems[0].setAttribute("data-magellan","");

    if (top.multiple !== undefined) {
        $('#section-menu').append(top.link);
    }
    else {
        $('#section-menu').append("<a href='#" + top.id + "'>" + top.innerText + "</a>\n");
    }

    var curDepth = parseInt(children.substring(1)) - 1;
    var first = true;
    headers.arr.each(function () {
        if ((top.multiple == undefined) && (this.id == top.id)) return;
        console.log("Header id: " + this.id);
        console.log("Tag: " + this.tagName);

        var $li = $('<li id="m' + this.id + '" />').append("<a href='#" + this.id + "'>" + $(this).text() + "</a>");
        var depth = 0;
        if (this.tagName.toLowerCase() == "p") {
            if ($(this).attr("class").toLowerCase() == "heading7") {
                depth = 7;
            }
            else if ($(this).attr("class").toLowerCase() == "heading8") {
                depth = 8;
            }
        }
        else {
            depth = parseInt(this.tagName.substring(1));
        }
        console.log("Depth: " + depth);
        console.log("Is it first? " + first);
        if (depth > curDepth) { // going deeper
            if (first) {
                menuItems.append($li);
                menuItems = $li;
                first = false;
            }
            else {
                var $ul = $('<ul/>');
                $ul.addClass("vertical menu nested");
                $ul.append($li);
                menuItems.append($ul);
                menuItems = $li;
            }
        }
        else if (depth < curDepth) { // going shallower
            console.log("Pull up to " + (curDepth - depth - 1));
            console.log("the node is below");
            console.log(menuItems.parents('ul:eq(' + (curDepth - depth) + ')'));

            menuItems.parents('ul:eq(' + (curDepth - depth) + ')').append($li);
            menuItems = $li;
        }
        else { // same level
            menuItems.parent().append($li);
            menuItems = $li;
        }

        curDepth = depth;
    });
    menuItems = menuItems.parents('ul:last');
    /*
    var subsections = top.find(children);
    subsections.each(function() {
        menuItems.append("<li><a href='#" + $(this).attr('id') + "'>" + $(this).text() + "</a></li>\n");
        $('#tf-small-menu-list').append("<li><a href='#" + $(this).attr('id') + "'>" + $(this).text() + "</a></li>\n");
    });
    */
    $('#section-menu').append(menuItems);
    //smallMenu.append(smallMenuList);
    //$('#tf-small-menu').append(smallMenu);

}

function findTopHeader(tops) {
    var retValue = {};
    //retValue.top = element.find("h1");
    //console.log("How many h1? " +retValue.top.length)
    if (tops.h1.length > 0) {
        retValue.top = tops.h1;
        console.log("How many h1? " + retValue.top.length);
        if (retValue.top.length == 1) {
            retValue.top = tops.h1[0];
            retValue.children = "h2";
        }
        else if (retValue.top.length > 1) {
            retValue.children = "h1";
            retValue.top = { "multiple": true };
        }
    }
    else {
        retValue.top = tops.h2;
        console.log("How many h2? " + retValue.top.length)
        if (retValue.top.length == 1) {
            retValue.top = tops.h2[0];
            retValue.children = "h3";
        }
        else if (retValue.top.length > 1) {
            retValue.children = "h2";
            retValue.top = { "multiple": true };
        }
    }
    if ((retValue.top.multiple !== undefined) && (retValue.top.multiple)) {
        retValue.top.link = "<a href='#'>" + "Sections" + "</a>\n";
    }
    return retValue;
}

function buildBreadcrumbs(headers) {
    if ($('.breadcrumbs').length < 1) {
        return;
    }
    var path = window.location.pathname;
    console.log("The path is ", path);
    var pathParts = getPathParts(path);
    if (pathParts.length == 0) {
        return;
    }

    var pathURLs = getURLs(pathParts);
    var crumbs = [];

    //var headers = findTopHeader($("main"));
    var currText = "";
    if (headers.menu.top.multiple === undefined) {
        currText = headers.menu.top.innerText;
    }

    if (/^[0-9]$/.test(currText[0])) {
        currText = currText.substr(currText.indexOf(' ') + 1)
    }
    crumbs.unshift('<li><span  class="show-for-sr">Current: </span> ' + currText + "</li>");
    if ((pathParts[0] !== "GeneralIntro") && (pathParts[pathParts.length - 1].startsWith(pathParts[0] + "-"))) {
        //Domain-specific chapter 3 trasactions in individual pages
        console.log(pathParts[pathParts.length - 1]);
        crumbs.unshift('<li class="disabled">Chapter 3</li>');
    }
    if ((pathParts.length > 3) && (pathParts[pathParts.length - 3].toLowerCase() === "tf")) {
        if (pathParts[pathParts.length - 2].toLowerCase() === "volume1") {
            crumbs.unshift('<li><a href="./index.html">Volume 1</a></li>');
            $('#volumeNo').text("1");
        } else if (pathParts[pathParts.length - 2].toLowerCase() === "volume2") {
            crumbs.unshift('<li><a href="./index.html">Volume 2</a></li>');
            $('#volumeNo').text("2");
        } else if (pathParts[pathParts.length - 2].toLowerCase() === "volume3") {
            crumbs.unshift('<li><a href="./index.html">Volume 3</a></li>');
            $('#volumeNo').text("3");
        } else if (pathParts[pathParts.length - 2].toLowerCase() === "volume4") {
            crumbs.unshift('<li><a href="./index.html">Volume 4</a></li>');
            $('#volumeNo').text("4");
        }
        crumbs.unshift('<li><a href="../index.html">Technical Framework</a></li>');
    }
    else if ((pathParts.length == 3) && (pathParts[pathParts.length - 2].toLowerCase() === "tf")) {
        crumbs.unshift('<li><a href="./index.html">Technical Framework</a></li>')
    }

    if (pathURLs.domain !== "") {
        var domainName = "";
        if (pathParts[0] === "GeneralIntro") {
            domainName = "General Introduction";
        }
        else {
            domainName = pathParts[0];
        }
        crumbs.unshift('<li><a href="' + pathURLs.domain + '">' + domainName + '</a></li>');
    }
    crumbs.unshift('<li><a href="' + pathURLs.home + '">Home</a></li>');

    crumbs.forEach(element => $('.breadcrumbs').append(element));
}

function getPathParts(path) {
    var result = path.split("/");
    console.log("Number of parts: " + result.length);
    result.shift(); //empty string
    if (result[0] === "publications") {
        //we are at github.io, remove first segment of path
        result.shift();
    }
    console.log("Number of parts: " + result.length);
    if (result.length == 1) {
        if ((result[0] === "") || (result[0] === "index.html")) {
            //root element, not breadcrumbs
            return [];
        }
    }
    console.log("Number of parts: " + result.length);
    return result;
}

function getURLs(pathParts) {
    var url = {};
    if (pathParts.length == 1) {
        url.home = "./index.html";
        url.domain = "";
        return url;
    }
    var stepsBack = pathParts.length - 2;
    var prefix = "";

    for (i = 0; i < stepsBack; i++) {
        prefix = prefix + "../";
    }

    if (prefix === "") {
        url.domain = "./index.html";
    }
    else {
        url.domain = prefix + "index.html";
    }

    url.home = prefix + "../" + "index.html";

    return url;
}

function googSearch() {
    var searchField = $("#ihe-search-field");
    if (searchField && searchField.value) {
        var query = encodeURIComponent("site:https://profiles.ihe.net " + searchField.value);
        window.location.href = "https://google.com/search?q=" + query;
    }
}

function getHeaders() {
    var headersArr = $("h1, h2, h3, h4, h5, h6, .heading7, .heading8");
    var anchor;
    var link;
    var tops = { "h1": [], "h2": [] };
    console.log("how many? " + headersArr.length);
    for (i = 0; i < headersArr.length; i++) {
        if (headersArr[i].localName.toLowerCase() == "h1") {
            tops.h1.push(headersArr[i]);
        }
        if (headersArr[i].localName.toLowerCase() == "h2") {
            tops.h2.push(headersArr[i]);
        }
        //headersArr[i].prepend($('<section data-magellan-target="' + headersArr[i].id +'" />'));
        headersArr[i].append(" ");
        //headersArr[i].setAttribute("data-magellan-target",headersArr[i].id);
        anchor = document.createElement("a");
        anchor.setAttribute("class", "heading-link");
        anchor.setAttribute("href", headersArr[i].baseURI.split("#")[0] + "#" + headersArr[i].id);
        anchor.setAttribute("title", "Click to copy link");
        link = document.createElement("i");
        link.setAttribute("class", "fi fi-link");

        anchor.appendChild(link);

        headersArr[i].append(anchor);
    }
    console.log(tops);
    var headers = {};
    headers.arr = headersArr;
    headers.menu = findTopHeader(tops);
    return headers;
}

//copy anchor link to clipboard on click
$('.heading-link').click(function (e) {
    //e.preventDefault();
    var copyText = $(this).attr("href")
    document.addEventListener('copy', function (e) {
        e.clipboardData.setData('text/plain', copyText);
        e.preventDefault();
    }, true);

    document.execCommand('copy');
    //console.log('copied text : ', copyText); 
});

$('#section-menu').on('down.zf.accordionMenu', function (e, target) {
    console.log("menu expanded");
    console.log(e);
    console.log(target);
    console.log("scrollHeight", $('#section-menu')[0].scrollHeight);
    console.log("clientHeight", $('#section-menu')[0].clientHeight);
    console.log("windowHeight", $(window).height());
    if ($('#section-menu')[0].scrollHeight > $(window).height()) {
        console.log("overflow!");
        //$('#section-menu')[0].setAttribute("data-stick-to","bottom");
        //$('#section-menu')[0].removeAttribute("data-sticky");
        //$('#section-menu')[0].removeAttribute("data-anchor");
        //$('#section-menu').foundation('_destroy');
    }
    const id = target.prevObject[0].id.substr(1,target.prevObject[0].id.length - 1);
    console.log("clicking on id " + id);
    const stateArr = headerState[id].split("^");
    if (stateArr.length === 1) {
        stateArr.push("expanded");
    }
    else {
        stateArr[1] = "expanded";
    }
    headerState[id] = stateArr.join("^");
});

$('#section-menu').on('up.zf.accordionMenu', function (e, target) {
    console.log("menu closed");
    console.log(e);
    console.log(target);
    const id = target.prevObject[0].id.substr(1,target.prevObject[0].id.length - 1);
    console.log("closing for id " + id);
    const stateArr = headerState[id].split("^");
    headerState[id] = stateArr[0];
});

$('#section-menu a').click(function (e) {
    console.log("menu link clicked! " + $(this).attr("href"));
    let $li = $(this).parent();
    if (($li.attr("class") !== undefined) && $li.hasClass("has-submenu-toggle")) {
        console.log("Parent class " + $li.attr("class"));
        $li.children("button").trigger("click");
    }
});

// returns -1 if a<b
//          0 if a==b
//          1 if a>b
function compareHeaders(a, b) {
    if (!(isValid(a) && isValid(b))) return undefined;
    const arrA = a.split(".");
    const arrB = b.split(".");
    const length = (arrA.length > arrB.length ? arrB.length : arrA.length);
    for (let i = 0; i < length; i++) {
        if (arrA[i] < arrB[i]) {
            return -1;
        }
        else if (arrA[i] > arrB[i]) {
            return 1;
        }
    }

    if (arrA.length == arrB.length) return 0;

    return (arrA.length > arrB.length ? 1 : -1);
}

function isValid(str) {
    return !(!str || str.trim().length === 0);
}

function isParentMenu(a, b) {
    if (!(isValid(a) && isValid(b))) return undefined;
    const arrA = a.split(".");
    const arrB = b.split(".");
    if (arrA.length >= arrB.length) {
        return false;
    }
    for (let i = 0; i < arrA.length; i++) {
        if (arrA[i] != arrB[i]) {
            return false;
        }
    }
    return true;
}