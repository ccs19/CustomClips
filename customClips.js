

var cssLocation = "customClips.css";
var bottomNav = "<button class='bottomNav-btn bottomNav-active' id='bottomNav-leftColumn'>Clips</button><button class='bottomNav-btn bottomNav-btn-invisible' id='bottomNav-middleColumn'>Computation</button><button class='bottomNav-btn bottomNav-btn-invisible' id='bottomNav-rightColumn'>Right</button>";


var LEFT = 'leftColumn';
var MIDDLE = 'middleColumn';
var RIGHT = 'rightColumn';
var OPTIONS = 'options';
var NAV_PREFIX = 'bottomNav-';


var INVESTMENTS = "Investments";


/** 
 *  Buttons that contain a non breaking space to be removed
 */
var CLEAN_BUTTONS = ['btnInvest', 'btnWithdraw'];

function cleanButtons() {
    var buttons = document.getElementsByTagName('button');
    for(var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        if(button.classList.contains('projectButton')) {
            continue;
        }
        button.innerHTML = button.innerHTML.replace(/&nbsp;/g, '');    
    }
}

function insertCss() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssLocation;
    head.appendChild(link);
}


function insertBottomNav() {
    addBottomNav();
    addBottomNavEvents();
}

function addBottomNav() {
    var page = document.getElementById('page');
    var nav = document.createElement('div');
    nav.classList.add('bottomNav');
    nav.insertAdjacentHTML('beforeend', bottomNav);
    // insert before first script tag
    page.insertBefore(nav, page.getElementsByTagName('script')[0]);

}

function addBottomNavEvents() {
    var leftNavBtn = document.getElementById(NAV_PREFIX + LEFT);
    var middleNavBtn = document.getElementById(NAV_PREFIX + MIDDLE);
    var rightNavBtn = document.getElementById(NAV_PREFIX + RIGHT);
    //var options = document.getElementById(NAV_PREFIX + OPTIONS);
    leftNavBtn.addEventListener('click', function() {
        showColumn(LEFT);
    });

    middleNavBtn.addEventListener('click', function() {
        showColumn(MIDDLE);
    });

    rightNavBtn.addEventListener('click', function() {
        showColumn(RIGHT);
    });
    /*options.addEventListener('click', function() {
        showColumn(OPTIONS);
    });*/
    showColumn(LEFT);
}


function showColumn(column) {
    var columns = [LEFT, MIDDLE, RIGHT];
    var show = document.getElementById(column);
    var hide = columns.filter(function(col) {
        return col !== column;
    });
    show.classList.remove('customClips-column-hide');
    hide.forEach(function(col) {
        var column = document.getElementById(col);
        column.classList.add('customClips-column-hide');
    });

    var button = document.getElementById(NAV_PREFIX + column);
    button.classList.add('bottomNav-active');
    hide.forEach(function(col) {
        var button = document.getElementById(NAV_PREFIX + col);
        button.classList.remove('bottomNav-active');
    });
}



function modifyColumns() {
    var columns = ['leftColumn', 'rightColumn', 'middleColumn'];
    for(var i = 0; i < columns.length; i++) {
        var column = document.getElementById(columns[i]);
        column.classList.add('customClips-column');
    }
}

function listenVisibility() {
    listenLeftColumn();
    listenMiddleColumn();
    listenRightColumn();
}

function listenLeftColumn() {
}

function listenMiddleColumn() {
    var compDiv = document.getElementById('compDiv');
    listenDisplayStyleChange(compDiv, function(mutation) {
        if(mutation.target.style.display !== 'none') {
            document.getElementById(NAV_PREFIX + MIDDLE).classList.remove('bottomNav-btn-invisible');
        }
    });
}

function listenRightColumn() {
    var investment = document.getElementById('investmentEngine');
    var battle = document.getElementById('battleCanvasDiv');
    var power = document.getElementById('powerDiv');
    var probe = document.getElementById('probeDesignDiv');
    var all = [investment, battle, power, probe];

    listenDisplayStyleChange(investment, function(mutation) {
        const navRight = document.getElementById(NAV_PREFIX + RIGHT);
        if(mutation.target.style.display !== 'none') {
            navRight.classList.remove('bottomNav-btn-invisible');
            navRight.innerHTML = INVESTMENTS;
        } else if(allInvisible(all)) {
            navRight.classList.add('bottomNav-btn-invisible');
        }
    });

    listenDisplayStyleChange(battle, function(mutation) {
        const navRight = document.getElementById(NAV_PREFIX + RIGHT);
        if(mutation.target.style.display !== 'none') {
            navRight.classList.remove('bottomNav-btn-invisible');
            navRight.innerHTML = 'Battle';
        } else if(allInvisible(all)) {
            navRight.classList.add('bottomNav-btn-invisible');
        }
    });

    listenDisplayStyleChange(power, function(mutation) {
        const navRight = document.getElementById(NAV_PREFIX + RIGHT);
        if(mutation.target.style.display !== 'none') {
            navRight.classList.remove('bottomNav-btn-invisible');
            navRight.innerHTML = 'Power';
        } else if(allInvisible(all)) {
            navRight.classList.add('bottomNav-btn-invisible');
        }
    });

    listenDisplayStyleChange(probe, function(mutation) {
        const navRight = document.getElementById(NAV_PREFIX + RIGHT);
        if(mutation.target.style.display !== 'none') {
            navRight.classList.remove('bottomNav-btn-invisible');
            navRight.innerHTML = 'Power';
        } else if(allInvisible(all)) {
            navRight.classList.add('bottomNav-btn-invisible');
        }
    });
}

function allInvisible(elements) {
    return elements.every(function(elem) {
        return elem.style.display === 'none';
    });
}

/** 
 *  Listen for changes to visiblity of an element. If the element has its style.display changed, this will trigger 
 */

function listenDisplayStyleChange(elem, callback) {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.attributeName === 'style') {
                callback(mutation);
            }
        });
    });

    observer.observe(elem, {attributes: true});

}


function determineInitialVisiblity() {
    var compDiv = document.getElementById('compDiv');
    var investment = document.getElementById('investmentEngine');
    var battle = document.getElementById('battleCanvasDiv');
    var power = document.getElementById('powerDiv');
    var probe = document.getElementById('probeDesignDiv');

    if(investment.style.display !== 'none') {
        document.getElementById(NAV_PREFIX + RIGHT).classList.remove('bottomNav-btn-invisible');
        document.getElementById(NAV_PREFIX + RIGHT).innerHTML = INVESTMENTS;
        console.log('investment now visible');
    } 
    if(battle.style.display !== 'none') {
        document.getElementById(NAV_PREFIX + RIGHT).classList.remove('bottomNav-btn-invisible');
        document.getElementById(NAV_PREFIX + RIGHT).innerHTML = 'Battle';
        console.log('battle now visible');
    }
    if(power.style.display !== 'none') {
        document.getElementById(NAV_PREFIX + RIGHT).classList.remove('bottomNav-btn-invisible');
        document.getElementById(NAV_PREFIX + RIGHT).innerHTML = 'Power';
        console.log('power now visible');
    }
    if(probe.style.display !== 'none') {
        document.getElementById(NAV_PREFIX + RIGHT).classList.remove('bottomNav-btn-invisible');
        document.getElementById(NAV_PREFIX + RIGHT).innerHTML = 'Probe';
        console.log('probe now visible');
    }
    if(compDiv.style.display !== 'none') {
        document.getElementById(NAV_PREFIX + MIDDLE).classList.remove('bottomNav-btn-invisible');
        console.log('Computation now visible');
    } 
}

// TODO: Add options for importing and exporting save data
function addOptions() {
    const importSaveButton = document.getElementById('importSaveButton');
    const exportSaveButton = document.getElementById('exportSaveButton');
    
}

insertBottomNav();
insertCss();
modifyColumns();
cleanButtons();
listenVisibility();
//addOptions();

// wait for 1 second before determining initial visiblity
setTimeout(determineInitialVisiblity, 50);
