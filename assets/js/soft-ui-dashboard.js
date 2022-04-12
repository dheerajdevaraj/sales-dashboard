"use strict";
(function() {
  var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

  if (isWindows) {
    // if we are on windows OS we activate the perfectScrollbar function
    if (document.getElementsByClassName('main-content')[0]) {
      var mainpanel = document.querySelector('.main-content');
      var ps = new PerfectScrollbar(mainpanel);
    };

    if (document.getElementsByClassName('sidenav')[0]) {
      var sidebar = document.querySelector('.sidenav');
      var ps1 = new PerfectScrollbar(sidebar);
    };

    if (document.getElementsByClassName('navbar-collapse')[0]) {
      var fixedplugin = document.querySelector('.navbar:not(.navbar-expand-lg) .navbar-collapse');
      var ps2 = new PerfectScrollbar(fixedplugin);
    };

    if (document.getElementsByClassName('fixed-plugin')[0]) {
      var fixedplugin = document.querySelector('.fixed-plugin');
      var ps3 = new PerfectScrollbar(fixedplugin);
    };
  };
})();

// Verify navbar blur on scroll
navbarBlurOnScroll('navbarBlur');


// initialization of Tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Fixed Plugin

if (document.querySelector('.fixed-plugin')) {
  var fixedPlugin = document.querySelector('.fixed-plugin');
  var fixedPluginButton = document.querySelector('.fixed-plugin-button');
  var fixedPluginButtonNav = document.querySelector('.fixed-plugin-button-nav');
  var fixedPluginCard = document.querySelector('.fixed-plugin .card');
  var fixedPluginCloseButton = document.querySelectorAll('.fixed-plugin-close-button');
  var navbar = document.getElementById('navbarBlur');
  var buttonNavbarFixed = document.getElementById('navbarFixed');

  if (fixedPluginButton) {
    fixedPluginButton.onclick = function() {
      if (!fixedPlugin.classList.contains('show')) {
        fixedPlugin.classList.add('show');
      } else {
        fixedPlugin.classList.remove('show');
      }
    }
  }

  if (fixedPluginButtonNav) {
    fixedPluginButtonNav.onclick = function() {
      if (!fixedPlugin.classList.contains('show')) {
        fixedPlugin.classList.add('show');
      } else {
        fixedPlugin.classList.remove('show');
      }
    }
  }

  fixedPluginCloseButton.forEach(function(el) {
    el.onclick = function() {
      fixedPlugin.classList.remove('show');
    }
  })

  document.querySelector('body').onclick = function(e) {
    if (e.target != fixedPluginButton && e.target != fixedPluginButtonNav && e.target.closest('.fixed-plugin .card') != fixedPluginCard) {
      fixedPlugin.classList.remove('show');
    }
  }

  if (navbar) {
    if (navbar.getAttribute('navbar-scroll') == 'true') {
      buttonNavbarFixed.setAttribute("checked", "true");
    }
  }

}

// Tabs navigation

var total = document.querySelectorAll('.nav-pills');

total.forEach(function(item, i) {
  var moving_div = document.createElement('div');
  var first_li = item.querySelector('li:first-child .nav-link');
  var tab = first_li.cloneNode();
  tab.innerHTML = "-";

  moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
  moving_div.appendChild(tab);
  item.appendChild(moving_div);

  var list_length = item.getElementsByTagName("li").length;

  moving_div.style.padding = '0px';
  moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
  moving_div.style.transform = 'translate3d(0px, 0px, 0px)';
  moving_div.style.transition = '.5s ease';

  item.onmouseover = function(event) {
    let target = getEventTarget(event);
    let li = target.closest('li'); // get reference
    if (li) {
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li) + 1;
      item.querySelector('li:nth-child(' + index + ') .nav-link').onclick = function() {
        moving_div = item.querySelector('.moving-tab');
        let sum = 0;
        if (item.classList.contains('flex-column')) {
          for (var j = 1; j <= nodes.indexOf(li); j++) {
            sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
          }
          moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
          moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        } else {
          for (var j = 1; j <= nodes.indexOf(li); j++) {
            sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
          }
          moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
          moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
        }
      }
    }
  }
});


// Tabs navigation resize

window.addEventListener('resize', function(event) {
  total.forEach(function(item, i) {
    item.querySelector('.moving-tab').remove();
    var moving_div = document.createElement('div');
    var tab = item.querySelector(".nav-link.active").cloneNode();
    tab.innerHTML = "-";

    moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
    moving_div.appendChild(tab);

    item.appendChild(moving_div);

    moving_div.style.padding = '0px';
    moving_div.style.transition = '.5s ease';

    let li = item.querySelector(".nav-link.active").parentElement;

    if (li) {
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li) + 1;

      let sum = 0;
      if (item.classList.contains('flex-column')) {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
        }
        moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
        moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
      } else {
        for (var j = 1; j <= nodes.indexOf(li); j++) {
          sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
        }
        moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
        moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';

      }
    }
  });

  if (window.innerWidth < 991) {
    total.forEach(function(item, i) {
      if (!item.classList.contains('flex-column')) {
        item.classList.add('flex-column', 'on-resize');
      }
    });
  } else {
    total.forEach(function(item, i) {
      if (item.classList.contains('on-resize')) {
        item.classList.remove('flex-column', 'on-resize');
      }
    })
  }
});


function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}

// End tabs navigation


//Set Sidebar Color
function sidebarColor(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-color");

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');
  sidebar.setAttribute("data-color", color);

  if (document.querySelector('#sidenavCard')) {
    var sidenavCard = document.querySelector('#sidenavCard');
    let sidenavCardClasses = ['card', 'card-background', 'shadow-none', 'card-background-mask-' + color];
    sidenavCard.className = '';
    sidenavCard.classList.add(...sidenavCardClasses);

    var sidenavCardIcon = document.querySelector('#sidenavCardIcon');
    let sidenavCardIconClasses = ['ni', 'ni-diamond', 'text-gradient', 'text-lg', 'top-0', 'text-' + color];
    sidenavCardIcon.className = '';
    sidenavCardIcon.classList.add(...sidenavCardIconClasses);
  }

}

// Set Navbar Fixed
function navbarFixed(el) {
  let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
  const navbar = document.getElementById('navbarBlur');

  if (!el.getAttribute("checked")) {
    navbar.classList.add(...classes);
    navbar.setAttribute('navbar-scroll', 'true');
    navbarBlurOnScroll('navbarBlur');
    el.setAttribute("checked", "true");
  } else {
    navbar.classList.remove(...classes);
    navbar.setAttribute('navbar-scroll', 'false');
    navbarBlurOnScroll('navbarBlur');
    el.removeAttribute("checked");
  }
};

// Navbar blur on scroll

function navbarBlurOnScroll(id) {
  const navbar = document.getElementById(id);
  let navbarScrollActive = navbar ? navbar.getAttribute("navbar-scroll") : false;
  let scrollDistance = 5;
  let classes = ['position-sticky', 'blur', 'shadow-blur', 'mt-4', 'left-auto', 'top-1', 'z-index-sticky'];
  let toggleClasses = ['shadow-none'];

  if (navbarScrollActive == 'true') {
    window.onscroll = debounce(function() {
      if (window.scrollY > scrollDistance) {
        blurNavbar();
      } else {
        transparentNavbar();
      }
    }, 10);
  } else {
    window.onscroll = debounce(function() {
      transparentNavbar();
    }, 10);
  }

  function blurNavbar() {
    navbar.classList.add(...classes)
    navbar.classList.remove(...toggleClasses)

    toggleNavLinksColor('blur');
  }

  function transparentNavbar() {
    if (navbar) {
      navbar.classList.remove(...classes)
      navbar.classList.add(...toggleClasses)

      toggleNavLinksColor('transparent');
    }
  }

  function toggleNavLinksColor(type) {
    let navLinks = document.querySelectorAll('.navbar-main .nav-link')
    let navLinksToggler = document.querySelectorAll('.navbar-main .sidenav-toggler-line')

    if (type === "blur") {
      navLinks.forEach(element => {
        element.classList.remove('text-body')
      });

      navLinksToggler.forEach(element => {
        element.classList.add('bg-dark')
      });
    } else if (type === "transparent") {
      navLinks.forEach(element => {
        element.classList.add('text-body')
      });

      navLinksToggler.forEach(element => {
        element.classList.remove('bg-dark')
      });
    }
  }
}


// Debounce Function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

//Set Sidebar Type
function sidebarType(a) {
  var parent = a.parentElement.children;
  var color = a.getAttribute("data-class");

  var colors = [];

  for (var i = 0; i < parent.length; i++) {
    parent[i].classList.remove('active');
    colors.push(parent[i].getAttribute('data-class'));
  }

  if (!a.classList.contains('active')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }

  var sidebar = document.querySelector('.sidenav');

  for (var i = 0; i < colors.length; i++) {
    sidebar.classList.remove(colors[i]);
  }

  sidebar.classList.add(color);
}


// Toggle Sidenav
const iconNavbarSidenav = document.getElementById('iconNavbarSidenav');
const iconSidenav = document.getElementById('iconSidenav');
const sidenav = document.getElementById('sidenav-main');
let body = document.getElementsByTagName('body')[0];
let className = 'g-sidenav-pinned';

if (iconNavbarSidenav) {
  iconNavbarSidenav.addEventListener("click", toggleSidenav);
}

if (iconSidenav) {
  iconSidenav.addEventListener("click", toggleSidenav);
}

function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
    setTimeout(function() {
      sidenav.classList.remove('bg-white');
    }, 100);
    sidenav.classList.remove('bg-transparent');

  } else {
    body.classList.add(className);
    sidenav.classList.add('bg-white');
    sidenav.classList.remove('bg-transparent');
    iconSidenav.classList.remove('d-none');
  }
}

// Resize navbar color depends on configurator active type of sidenav

let referenceButtons = document.querySelector('[data-class]');

window.addEventListener("resize", navbarColorOnResize);

function navbarColorOnResize() {
  if (window.innerWidth > 1200) {
    if (referenceButtons.classList.contains('active') && referenceButtons.getAttribute('data-class') === 'bg-transparent') {
      sidenav.classList.remove('bg-white');
    } else {
      sidenav.classList.add('bg-white');
    }
  } else {
    sidenav.classList.add('bg-white');
    sidenav.classList.remove('bg-transparent');
  }
}

// Deactivate sidenav type buttons on resize and small screens
window.addEventListener("resize", sidenavTypeOnResize);
window.addEventListener("load", sidenavTypeOnResize);

function sidenavTypeOnResize() {
  let elements = document.querySelectorAll('[onclick="sidebarType(this)"]');
  if (window.innerWidth < 1200) {
    elements.forEach(function(el) {
      el.classList.add('disabled');
    });
  } else {
    elements.forEach(function(el) {
      el.classList.remove('disabled');
    });
  }
}

// line chart

am5.ready(function() {

  // Create root and chart
  var root = am5.Root.new("chartdiv");
  
  root.setThemes([
    am5themes_Animated.new(root)
  ]);
  
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelY: "zoomX",
    layout: root.verticalLayout,
    pinchZoomX:true
  }));
  
  // Create Y-axis
  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation:1,
    renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
  }));
  
  // Create X-Axis
  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
    groupData: true,
    maxDeviation:0.5,
    baseInterval: { timeUnit: "minute", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 50, pan:"zoom"
    })
  }));
  
  // xAxis.get("dateFormats")["day"] = "MM/dd";
  // xAxis.get("periodChangeDateFormats")["day"] = "MMMM";
  
  // Generate random data
  function generateChartData() {
    var chartData = [];
    // current date
    var firstDate = new Date();
    // now set 500 minutes back
    firstDate.setMinutes(firstDate.getDate() - 500, 0, 0);
  
    // and generate 500 data items
    var visits = 500;
    for (var i = 0; i < 500; i++) {
      var newDate = new Date(firstDate);
      // each time we add one minute
      newDate.setMinutes(newDate.getMinutes() + i);
      // some random number
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      // add data item to the array
      chartData.push({
        date: newDate.getTime(),
        visits: visits
      });
    }
    return chartData;
  }
  var data = generateChartData();
  
  // Create series
  var series = chart.series.push(am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "visits",
    valueXField: "date",
    fill: am5.color(0x574AE2),
    stroke: am5.color(0x574AE2),
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}"
    })
  }));
 
  series.strokes.template.set("strokeWidth", 3);
  series.fills.template.setAll({
    visible: true,
    fillOpacity: 0.2
  });
  
  series.data.setAll(data);
  
  // Pre-zoom X axis to last hour
  series.events.once("datavalidated", function(ev, target) {
    var lastDate = new Date(data[data.length - 1].date);
    var firstDate = new Date(lastDate.getTime() - 3600000);
    xAxis.zoomToDates(firstDate, lastDate);
  })
  
  // Add cursor
  chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "none",
    xAxis: xAxis
  }));
  
  xAxis.set("tooltip", am5.Tooltip.new(root, {}));
  
  yAxis.set("tooltip", am5.Tooltip.new(root, {}));
  
  
  var scrollbarX = am5xy.XYChartScrollbar.new(root, {
    orientation: "horizontal",
    height: 50
  });
  
  chart.set("scrollbarX", scrollbarX);
  
  var sbxAxis = scrollbarX.chart.xAxes.push(am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "minute", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      opposite: false,
      strokeOpacity: 0
    })
  }));
  
  var sbyAxis = scrollbarX.chart.yAxes.push(am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  }));
  
  var sbseries = scrollbarX.chart.series.push(am5xy.LineSeries.new(root, {
    xAxis: sbxAxis,
    yAxis: sbyAxis,
    valueYField: "visits",
    valueXField: "date"
  }));
  sbseries.data.setAll(data);
  
  }); 

  // cluster column chart

  am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("visitor-activity");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout
    }));
    
    
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );
    
    var data = [{
      "Month": "Sun",
      "europe": 2.8,
      "namerica": 2.5,
    }, {
      "Month": "Mon",
      "europe": 2.6,
      "namerica": 2.2,
    }, {
      "Month": "Tue",
      "europe": 2.9,
      "namerica": 2.4,
    },
    {
      "Month": "Wed",
      "europe": 2.8,
      "namerica": 2.3,
    },
    {
      "Month": "Thur",
      "europe": 2.8,
      "namerica": 2.2,
    },
    {
      "Month": "Fri",
      "europe": 2.6,
      "namerica": 2.3,
    },
    {
      "Month": "Sat",
      "europe": 2.9,
      "namerica": 2.4,
    }]
    
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "Month",
      renderer: am5xy.AxisRendererX.new(root, {
        cellStartLocation: 0.1,
        cellEndLocation: 0.9
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    xAxis.data.setAll(data);
    
    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {})
    }));
    
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName) {
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: fieldName,
        categoryXField: "Month"
      }));
    
      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}:{valueY}",
        width: am5.percent(70),
        tooltipY: 0
      });
    
      series.data.setAll(data);
    
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
    
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 0,
          sprite: am5.Label.new(root, {
            text: "{valueY}",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: 0,
            centerX: am5.p50,
            populateText: true
          })
        });
      });
    
      legend.data.push(series);
    }
    
    makeSeries("Active visitor", "europe");
    makeSeries("Round visitor", "namerica");
  
   
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    
    })

    //date-event chart


    am5.ready(function() {

      // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      var root = am5.Root.new("date-event");
      root.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd",
        dateFields: ["valueX", "openValueX"]
      });
      
      
      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root)
      ]);
      
      
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
      }));
      
      
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      }))
      
      var colors = chart.get("colors");
      
      // Data
      var data = [{
        category: "Module #1",
        start: new Date(2016, 0, 1).getTime(),
        end: new Date(2016, 0, 14).getTime(),
        columnSettings: {
          fill: am5.color(0x574AE2)
        },
        task: "Daily sales report"
      }, {
        category: "Module #1",
        start: new Date(2016, 0, 16).getTime(),
        end: new Date(2016, 0, 27).getTime(),
        columnSettings: {
          fill: am5.color(0x9087EE)
        },
        task: "Producing specifications"
      }, {
        category: "Module #1",
        start: new Date(2016, 1, 5).getTime(),
        end: new Date(2016, 3, 18).getTime(),
        columnSettings: {
          fill: am5.color(0x9087EE)
        },
        task: "product launch"
      }, {
        category: "Module #1",
        start: new Date(2016, 3, 18).getTime(),
        end: new Date(2016, 3, 30).getTime(),
        columnSettings: {
          fill: am5.color(0x574AE2)
        },
        task: "Client meeting"
      }, {
        category: "Module #2",
        start: new Date(2016, 0, 8).getTime(),
        end: new Date(2016, 0, 10).getTime(),
        columnSettings: {
          fill: am5.color(0x9087EE)
        },
        task: "product launch"
      }, {
        category: "Module #2",
        start: new Date(2016, 0, 12).getTime(),
        end: new Date(2016, 0, 15).getTime(),
        columnSettings: {
          fill: am5.color(0xFFAF61)
        },
        task: "Producing specifications"
      }, {
        category: "Module #2",
        start: new Date(2016, 0, 16).getTime(),
        end: new Date(2016, 1, 5).getTime(),
        columnSettings: {
          fill: am5.color(0x23dab2)
        },
        task: "Daily sales report"
      }, {
        category: "Module #2",
        start: new Date(2016, 1, 10).getTime(),
        end: new Date(2016, 1, 18).getTime(),
        columnSettings: {
          fill: am5.Color.brighten(colors.getIndex(2), 1.2)
        },
        task: "Testing and QA"
      }, {
        category: "Module #3",
        start: new Date(2016, 0, 2).getTime(),
        end: new Date(2016, 0, 8).getTime(),
        columnSettings: {
          fill: am5.Color.brighten(colors.getIndex(4), 0)
        },
        task: "Daily sales report"
      }, {
        category: "Module #3",
        start: new Date(2016, 0, 8).getTime(),
        end: new Date(2016, 0, 16).getTime(),
        columnSettings: {
          fill: am5.Color.brighten(colors.getIndex(4), 0.4)
        },
        task: "Producing specifications"
      }, {
        category: "Module #3",
        start: new Date(2016, 0, 19).getTime(),
        end: new Date(2016, 2, 1).getTime(),
        columnSettings: {
          fill: am5.Color.brighten(colors.getIndex(4), 0.8)
        },
        task: "Development"
      }, {
        category: "Module #3",
        start: new Date(2016, 2, 12).getTime(),
        end: new Date(2016, 3, 5).getTime(),
        columnSettings: {
          fill: am5.Color.brighten(colors.getIndex(4), 1.2)
        },
        task: "Testing and QA"
      }, {
        category: "Module #4",
        start: new Date(2016, 0, 1).getTime(),
        end: new Date(2016, 0, 19).getTime(),
        columnSettings: {
          fill: am5.color(0x8FDAFC)
        },
        task: "Gathering requirements"
      }, {
        category: "Module #4",
        start: new Date(2016, 0, 19).getTime(),
        end: new Date(2016, 1, 3).getTime(),
        columnSettings: {
          fill: am5.color(0x73C8EF)
        },
        task: "Producing specifications"
      }, {
        category: "Module #4",
        start: new Date(2016, 2, 20).getTime(),
        end: new Date(2016, 3, 25).getTime(),
        columnSettings: {
          fill: am5.color(0x8FDAFC)
        },
        task: "Development"
      }, {
        category: "Module #4",
        start: new Date(2016, 3, 27).getTime(),
        end: new Date(2016, 4, 15).getTime(),
        columnSettings: {
         
          fill: am5.color(0x73C8EF)
         
        },
        task: "Testing and QA"
      }, {
        category: "Module #5",
        start: new Date(2016, 0, 1).getTime(),
        end: new Date(2016, 0, 12).getTime(),
        columnSettings: {
          fill: am5.color(0x8175FF)
        },
        task: "Gathering requirements"
      }, {
        category: "Module #5",
        start: new Date(2016, 0, 12).getTime(),
        end: new Date(2016, 0, 19).getTime(),
        columnSettings: {
          fill: am5.color(0x9B92FE)
        },
        task: "Producing specifications"
      }, {
        category: "Module #5",
        start: new Date(2016, 0, 19).getTime(),
        end: new Date(2016, 2, 1).getTime(),
        columnSettings: {
          fill: am5.color(0xB9B3FC)
         
        },
        task: "Development"
      }, {
        category: "Module #5",
        start: new Date(2016, 2, 8).getTime(),
        end: new Date(2016, 2, 30).getTime(),
        columnSettings: {
          fill: am5.color(0x958DEC)
        },
        task: "Testing and QA"
      }];
      
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "category",
          renderer: am5xy.AxisRendererY.new(root, {}),
          tooltip: am5.Tooltip.new(root, {})
        })
      );
      
      yAxis.data.setAll([
        { category: "Module #1" },
        { category: "Module #2" },
        { category: "Module #3" },
        { category: "Module #4" },
        { category: "Module #5" }
      ]);
      
      var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: "minute", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {})
        })
      );
      
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        openValueXField: "start",
        valueXField: "end",
        categoryYField: "category",
        sequencedInterpolation: true
      }));
      
      series.columns.template.setAll({
        templateField: "columnSettings",
        strokeOpacity: 0,
        tooltipText: "{task}:\n[bold]{openValueX}[/] - [bold]{valueX}[/]"
      });
      
      series.data.setAll(data);
      
      // Add scrollbars
      chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();
      chart.appear(1000, 100);
      
      });