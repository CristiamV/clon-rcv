/*!

=========================================================
* Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2018 Creative Tim (https://www.creative-tim.com) & UPDIVISION (https://www.updivision.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by www.creative-tim.com & www.updivision.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

//
// Bootstrap Datepicker
//

"use strict";

var Datepicker = (function() {
    // Variables

    var $datepicker = $(".datepicker");

    // Methods

    function init($this) {
        var options = {
            disableTouchKeyboard: true,
            autoclose: false
        };

        $this.datepicker(options);
    }

    // Events

    if ($datepicker.length) {
        $datepicker.each(function() {
            init($(this));
        });
    }
})();

//
// Icon code copy/paste
//

("use strict");

var CopyIcon = (function() {
    // Variables

    var $element = ".btn-icon-clipboard",
        $btn = $($element);

    // Methods

    function init($this) {
        $this.tooltip().on("mouseleave", function() {
            // Explicitly hide tooltip, since after clicking it remains
            // focused (as it's a button), so tooltip would otherwise
            // remain visible until focus is moved away
            $this.tooltip("hide");
        });

        var clipboard = new ClipboardJS($element);

        clipboard.on("success", function(e) {
            $(e.trigger)
                .attr("title", "Copied!")
                .tooltip("_fixTitle")
                .tooltip("show")
                .attr("title", "Copy to clipboard")
                .tooltip("_fixTitle");

            e.clearSelection();
        });
    }

    // Events
    if ($btn.length) {
        init($btn);
    }
})();

//
// Form control
//

("use strict");

var FormControl = (function() {
    // Variables

    var $input = $(".form-control");

    // Methods

    function init($this) {
        $this
            .on("focus blur", function(e) {
                $(this)
                    .parents(".form-group")
                    .toggleClass(
                        "focused",
                        e.type === "focus" || this.value.length > 0
                    );
            })
            .trigger("blur");
    }

    // Events

    if ($input.length) {
        init($input);
    }
})();

var cost = 0;

//
// Google maps
//

var $map = $("#map-canvas"),
    map,
    lat,
    lng,
    color = "#5e72e4";

function initMap() {
    map = document.getElementById("map-canvas");
    lat = map.getAttribute("data-lat");
    lng = map.getAttribute("data-lng");

    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 12,
        scrollwheel: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{ color: "#444444" }]
            },
            {
                featureType: "landscape",
                elementType: "all",
                stylers: [{ color: "#f2f2f2" }]
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "road",
                elementType: "all",
                stylers: [{ saturation: -100 }, { lightness: 45 }]
            },
            {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{ visibility: "simplified" }]
            },
            {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "water",
                elementType: "all",
                stylers: [{ color: color }, { visibility: "on" }]
            }
        ]
    };

    map = new google.maps.Map(map, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Hello World!"
    });

    var contentString =
        '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
        "<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>";

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, "click", function() {
        infowindow.open(map, marker);
    });
}

if ($map.length) {
    google.maps.event.addDomListener(window, "load", initMap);
}

// //
// // Headroom - show/hide navbar on scroll
// //
//
// 'use strict';
//
// var Headroom = (function() {
//
// 	// Variables
//
// 	var $headroom = $('#navbar-main');
//
//
// 	// Methods
//
// 	function init($this) {
//
//     var headroom = new Headroom(document.querySelector("#navbar-main"), {
//         offset: 300,
//         tolerance: {
//             up: 30,
//             down: 30
//         },
//     });
//
//
//
// 	// Events
//
// 	if ($headroom.length) {
// 		headroom.init();
// 	}
//
// })();

//
// Navbar
//

("use strict");

var Navbar = (function() {
    // Variables

    var $nav = $(".navbar-nav, .navbar-nav .nav");
    var $collapse = $(".navbar .collapse");
    var $dropdown = $(".navbar .dropdown");

    // Methods

    function accordion($this) {
        $this
            .closest($nav)
            .find($collapse)
            .not($this)
            .collapse("hide");
    }

    function closeDropdown($this) {
        var $dropdownMenu = $this.find(".dropdown-menu");

        $dropdownMenu.addClass("close");

        setTimeout(function() {
            $dropdownMenu.removeClass("close");
        }, 200);
    }

    // Events

    $collapse.on({
        "show.bs.collapse": function() {
            accordion($(this));
        }
    });

    $dropdown.on({
        "hide.bs.dropdown": function() {
            closeDropdown($(this));
        }
    });
})();

//
// Navbar collapse
//

var NavbarCollapse = (function() {
    // Variables

    var $nav = $(".navbar-nav"),
        $collapse = $(".navbar .collapse");

    // Methods

    function hideNavbarCollapse($this) {
        $this.addClass("collapsing-out");
    }

    function hiddenNavbarCollapse($this) {
        $this.removeClass("collapsing-out");
    }

    // Events

    if ($collapse.length) {
        $collapse.on({
            "hide.bs.collapse": function() {
                hideNavbarCollapse($collapse);
            }
        });

        $collapse.on({
            "hidden.bs.collapse": function() {
                hiddenNavbarCollapse($collapse);
            }
        });
    }
})();

//
// Form control
//

("use strict");

var noUiSlider = (function() {
    // Variables

    // var $sliderContainer = $('.input-slider-container'),
    // 		$slider = $('.input-slider'),
    // 		$sliderId = $slider.attr('id'),
    // 		$sliderMinValue = $slider.data('range-value-min');
    // 		$sliderMaxValue = $slider.data('range-value-max');;

    // // Methods
    //
    // function init($this) {
    // 	$this.on('focus blur', function(e) {
    //       $this.parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    //   }).trigger('blur');
    // }
    //
    //
    // // Events
    //
    // if ($input.length) {
    // 	init($input);
    // }

    if ($(".input-slider-container")[0]) {
        $(".input-slider-container").each(function() {
            var slider = $(this).find(".input-slider");
            var sliderId = slider.attr("id");
            var minValue = slider.data("range-value-min");
            var maxValue = slider.data("range-value-max");

            var sliderValue = $(this).find(".range-slider-value");
            var sliderValueId = sliderValue.attr("id");
            var startValue = sliderValue.data("range-value-low");

            var c = document.getElementById(sliderId),
                d = document.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                //step: 1000,
                range: {
                    min: [parseInt(minValue)],
                    max: [parseInt(maxValue)]
                }
            });

            c.noUiSlider.on("update", function(a, b) {
                d.textContent = a[b];
            });
        });
    }

    if ($("#input-slider-range")[0]) {
        var c = document.getElementById("input-slider-range"),
            d = document.getElementById("input-slider-range-value-low"),
            e = document.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [
                parseInt(d.getAttribute("data-range-value-low")),
                parseInt(e.getAttribute("data-range-value-high"))
            ],
            connect: !0,
            range: {
                min: parseInt(c.getAttribute("data-range-value-min")),
                max: parseInt(c.getAttribute("data-range-value-max"))
            }
        }),
            c.noUiSlider.on("update", function(a, b) {
                f[b].textContent = a[b];
            });
    }
})();

//
// Popover
//

("use strict");

var Popover = (function() {
    // Variables

    var $popover = $('[data-toggle="popover"]'),
        $popoverClass = "";

    // Methods

    function init($this) {
        if ($this.data("color")) {
            $popoverClass = "popover-" + $this.data("color");
        }

        var options = {
            trigger: "focus",
            template:
                '<div class="popover ' +
                $popoverClass +
                '" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        };

        $this.popover(options);
    }

    // Events

    if ($popover.length) {
        $popover.each(function() {
            init($(this));
        });
    }
})();

//
// Scroll to (anchor links)
//

("use strict");

var ScrollTo = (function() {
    //
    // Variables
    //

    var $scrollTo = $(".scroll-me, [data-scroll-to], .toc-entry a");

    //
    // Methods
    //

    function scrollTo($this) {
        var $el = $this.attr("href");
        var offset = $this.data("scroll-to-offset")
            ? $this.data("scroll-to-offset")
            : 0;
        var options = {
            scrollTop: $($el).offset().top - offset
        };

        // Animate scroll to the selected section
        $("html, body")
            .stop(true, true)
            .animate(options, 600);

        event.preventDefault();
    }

    //
    // Events
    //

    if ($scrollTo.length) {
        $scrollTo.on("click", function(event) {
            scrollTo($(this));
        });
    }
})();

//
// Tooltip
//

("use strict");

var Tooltip = (function() {
    // Variables

    var $tooltip = $('[data-toggle="tooltip"]');

    // Methods

    function init() {
        $tooltip.tooltip();
    }

    // Events

    if ($tooltip.length) {
        init();
    }
})();

//
// Charts
//

("use strict");

var Charts = (function() {
    // Variable

    var $toggle = $('[data-toggle="chart"]');
    var mode = "light"; //(themeMode) ? themeMode : 'light';
    var fonts = {
        base: "Open Sans"
    };

    // Colors
    var colors = {
        gray: {
            100: "#f6f9fc",
            200: "#e9ecef",
            300: "#dee2e6",
            400: "#ced4da",
            500: "#adb5bd",
            600: "#8898aa",
            700: "#525f7f",
            800: "#32325d",
            900: "#212529"
        },
        theme: {
            default: "#172b4d",
            primary: "#5e72e4",
            secondary: "#f4f5f7",
            info: "#11cdef",
            success: "#2dce89",
            danger: "#f5365c",
            warning: "#fb6340"
        },
        black: "#12263F",
        white: "#FFFFFF",
        transparent: "transparent"
    };

    // Methods

    // Chart.js global options
    function chartOptions() {
        // Options
        var options = {
            defaults: {
                global: {
                    responsive: true,
                    maintainAspectRatio: false,
                    defaultColor:
                        mode == "dark" ? colors.gray[700] : colors.gray[600],
                    defaultFontColor:
                        mode == "dark" ? colors.gray[700] : colors.gray[600],
                    defaultFontFamily: fonts.base,
                    defaultFontSize: 13,
                    layout: {
                        padding: 0
                    },
                    legend: {
                        display: false,
                        position: "bottom",
                        labels: {
                            usePointStyle: true,
                            padding: 16
                        }
                    },
                    elements: {
                        point: {
                            radius: 0,
                            backgroundColor: colors.theme["primary"]
                        },
                        line: {
                            tension: 0.4,
                            borderWidth: 4,
                            borderColor: colors.theme["primary"],
                            backgroundColor: colors.transparent,
                            borderCapStyle: "rounded"
                        },
                        rectangle: {
                            backgroundColor: colors.theme["warning"]
                        },
                        arc: {
                            backgroundColor: colors.theme["primary"],
                            borderColor:
                                mode == "dark"
                                    ? colors.gray[800]
                                    : colors.white,
                            borderWidth: 4
                        }
                    },
                    tooltips: {
                        enabled: false,
                        mode: "index",
                        intersect: false,
                        custom: function(model) {
                            // Get tooltip
                            var $tooltip = $("#chart-tooltip");

                            // Create tooltip on first render
                            if (!$tooltip.length) {
                                $tooltip = $(
                                    '<div id="chart-tooltip" class="popover bs-popover-top" role="tooltip"></div>'
                                );

                                // Append to body
                                $("body").append($tooltip);
                            }

                            // Hide if no tooltip
                            if (model.opacity === 0) {
                                $tooltip.css("display", "none");
                                return;
                            }

                            function getBody(bodyItem) {
                                return bodyItem.lines;
                            }

                            // Fill with content
                            if (model.body) {
                                var titleLines = model.title || [];
                                var bodyLines = model.body.map(getBody);
                                var html = "";

                                // Add arrow
                                html += '<div class="arrow"></div>';

                                // Add header
                                titleLines.forEach(function(title) {
                                    html +=
                                        '<h3 class="popover-header text-center">' +
                                        title +
                                        "</h3>";
                                });

                                // Add body
                                bodyLines.forEach(function(body, i) {
                                    var colors = model.labelColors[i];
                                    var styles =
                                        "background-color: " +
                                        colors.backgroundColor;
                                    var indicator =
                                        '<span class="badge badge-dot"><i class="bg-primary"></i></span>';
                                    var align =
                                        bodyLines.length > 1
                                            ? "justify-content-left"
                                            : "justify-content-center";
                                    html +=
                                        '<div class="popover-body d-flex align-items-center ' +
                                        align +
                                        '">' +
                                        indicator +
                                        body +
                                        "</div>";
                                });

                                $tooltip.html(html);
                            }

                            // Get tooltip position
                            var $canvas = $(this._chart.canvas);

                            var canvasWidth = $canvas.outerWidth();
                            var canvasHeight = $canvas.outerHeight();

                            var canvasTop = $canvas.offset().top;
                            var canvasLeft = $canvas.offset().left;

                            var tooltipWidth = $tooltip.outerWidth();
                            var tooltipHeight = $tooltip.outerHeight();

                            var top =
                                canvasTop + model.caretY - tooltipHeight - 16;
                            var left =
                                canvasLeft + model.caretX - tooltipWidth / 2;

                            // Display tooltip
                            $tooltip.css({
                                top: top + "px",
                                left: left + "px",
                                display: "block",
                                "z-index": "100"
                            });
                        },
                        callbacks: {
                            label: function(item, data) {
                                var label =
                                    data.datasets[item.datasetIndex].label ||
                                    "";
                                var yLabel = item.yLabel;
                                var content = "";

                                if (data.datasets.length > 1) {
                                    content +=
                                        '<span class="badge badge-primary mr-auto">' +
                                        label +
                                        "</span>";
                                }

                                content +=
                                    '<span class="popover-body-value">' +
                                    yLabel +
                                    "</span>";
                                return content;
                            }
                        }
                    }
                },
                doughnut: {
                    cutoutPercentage: 83,
                    tooltips: {
                        callbacks: {
                            title: function(item, data) {
                                var title = data.labels[item[0].index];
                                return title;
                            },
                            label: function(item, data) {
                                var value = data.datasets[0].data[item.index];
                                var content = "";

                                content +=
                                    '<span class="popover-body-value">' +
                                    value +
                                    "</span>";
                                return content;
                            }
                        }
                    },
                    legendCallback: function(chart) {
                        var data = chart.data;
                        var content = "";

                        data.labels.forEach(function(label, index) {
                            var bgColor =
                                data.datasets[0].backgroundColor[index];

                            content += '<span class="chart-legend-item">';
                            content +=
                                '<i class="chart-legend-indicator" style="background-color: ' +
                                bgColor +
                                '"></i>';
                            content += label;
                            content += "</span>";
                        });

                        return content;
                    }
                }
            }
        };

        // yAxes
        Chart.scaleService.updateScaleDefaults("linear", {
            gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: mode == "dark" ? colors.gray[900] : colors.gray[300],
                drawBorder: false,
                drawTicks: false,
                lineWidth: 0,
                zeroLineWidth: 0,
                zeroLineColor:
                    mode == "dark" ? colors.gray[900] : colors.gray[300],
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2]
            },
            ticks: {
                beginAtZero: true,
                padding: 10,
                callback: function(value) {
                    if (!(value % 10)) {
                        return value;
                    }
                }
            }
        });

        // xAxes
        Chart.scaleService.updateScaleDefaults("category", {
            gridLines: {
                drawBorder: false,
                drawOnChartArea: false,
                drawTicks: false
            },
            ticks: {
                padding: 20
            },
            maxBarThickness: 10
        });

        return options;
    }

    // Parse global options
    function parseOptions(parent, options) {
        for (var item in options) {
            if (typeof options[item] !== "object") {
                parent[item] = options[item];
            } else {
                parseOptions(parent[item], options[item]);
            }
        }
    }

    // Push options
    function pushOptions(parent, options) {
        for (var item in options) {
            if (Array.isArray(options[item])) {
                options[item].forEach(function(data) {
                    parent[item].push(data);
                });
            } else {
                pushOptions(parent[item], options[item]);
            }
        }
    }

    // Pop options
    function popOptions(parent, options) {
        for (var item in options) {
            if (Array.isArray(options[item])) {
                options[item].forEach(function(data) {
                    parent[item].pop();
                });
            } else {
                popOptions(parent[item], options[item]);
            }
        }
    }

    // Toggle options
    function toggleOptions(elem) {
        var options = elem.data("add");
        var $target = $(elem.data("target"));
        var $chart = $target.data("chart");

        if (elem.is(":checked")) {
            // Add options
            pushOptions($chart, options);

            // Update chart
            $chart.update();
        } else {
            // Remove options
            popOptions($chart, options);

            // Update chart
            $chart.update();
        }
    }

    // Update options
    function updateOptions(elem) {
        var options = elem.data("update");
        var $target = $(elem.data("target"));
        var $chart = $target.data("chart");

        $chart.data.labels = [];
        // Parse options
        parseOptions($chart, options);
        // Toggle ticks
        toggleTicks(elem, $chart);

        // Update chart
        $chart.update();
    }

    // Toggle ticks
    function toggleTicks(elem, $chart) {
        if (elem.data("prefix") !== undefined) {
            var prefix = elem.data("prefix") ? elem.data("prefix") : "";

            // Update ticks
            $chart.options.scales.yAxes[0].ticks.callback = function(value) {
                if (!(value % 10)) {
                    return prefix + value;
                }
            };

            // Update tooltips
            $chart.options.tooltips.callbacks.label = function(item, data) {
                var label = data.datasets[item.datasetIndex].label || "";
                var yLabel = item.yLabel;
                var content = "";

                if (data.datasets.length > 1) {
                    content +=
                        '<span class="popover-body-label mr-auto">' +
                        label +
                        "</span>";
                }

                content +=
                    '<span class="popover-body-value">' +
                    prefix +
                    yLabel +
                    "</span>";
                return content;
            };
        }
    }

    // Events

    // Parse global options
    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    // Toggle options
    $toggle.on({
        change: function() {
            var $this = $(this);

            if ($this.is("[data-add]")) {
                toggleOptions($this);
            }
        },
        click: function() {
            var $this = $(this);

            if ($this.is("[data-update]")) {
                updateOptions($this);
            }
        }
    });

    // Return

    return {
        colors: colors,
        fonts: fonts,
        mode: mode
    };
})();

//
// Orders chart
//

var OrdersChart = (function() {
    //
    // Variables
    //

    var $chart = $("#chart-orders");
    var $ordersSelect = $('[name="ordersSelect"]');

    //
    // Methods
    //

    // Init chart
    function initChart($chart) {
        // Create chart
        var ordersChart = new Chart($chart, {
            type: "bar",
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                callback: function(value) {
                                    if (!(value % 10)) {
                                        //return '$' + value + 'k'
                                        return value;
                                    }
                                }
                            }
                        }
                    ]
                },
                tooltips: {
                    callbacks: {
                        label: function(item, data) {
                            var label =
                                data.datasets[item.datasetIndex].label || "";
                            var yLabel = item.yLabel;
                            var content = "";

                            if (data.datasets.length > 1) {
                                content +=
                                    '<span class="popover-body-label mr-auto">' +
                                    label +
                                    "</span>";
                            }

                            content +=
                                '<span class="popover-body-value">' +
                                yLabel +
                                "</span>";

                            return content;
                        }
                    }
                }
            },
            data: {
                labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Sales",
                        data: [25, 20, 30, 22, 17, 29]
                    }
                ]
            }
        });

        // Save to jQuery object
        $chart.data("chart", ordersChart);
    }

    // Init chart
    if ($chart.length) {
        initChart($chart);
    }
})();

//
// Charts
//

("use strict");

//
// Sales chart
//

var SalesChart = (function() {
    // Variables

    var $chart = $("#chart-sales");

    // Methods

    function init($chart) {
        var salesChart = new Chart($chart, {
            type: "line",
            options: {
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                color: Charts.colors.gray[900],
                                zeroLineColor: Charts.colors.gray[900]
                            },
                            ticks: {
                                callback: function(value) {
                                    if (!(value % 10)) {
                                        return "$" + value;
                                    }
                                }
                            }
                        }
                    ]
                },
                tooltips: {
                    callbacks: {
                        label: function(item, data) {
                            var label =
                                data.datasets[item.datasetIndex].label || "";
                            var yLabel = item.yLabel;
                            var content = "";

                            if (data.datasets.length > 1) {
                                content +=
                                    '<span class="popover-body-label mr-auto">' +
                                    label +
                                    "</span>";
                            }

                            content +=
                                '<span class="popover-body-value">$' +
                                yLabel +
                                "</span>";
                            return content;
                        }
                    }
                }
            },
            data: {
                labels: [
                    "Ene",
                    "Feb",
                    "Mar",
                    "Abr",
                    "May",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dic"
                ],
                datasets: [
                    {
                        label: "Performance",
                        data: [
                            stats.year["1"],
                            stats.year["2"],
                            stats.year["3"],
                            stats.year["4"],
                            stats.year["5"],
                            stats.year["6"],
                            stats.year["7"],
                            stats.year["8"],
                            stats.year["9"],
                            stats.year["10"],
                            stats.year["11"],
                            stats.year["12"]
                        ]
                    }
                ]
            }
        });

        // Save to jQuery object

        $chart.data("chart", salesChart);
    }

    // Events

    if ($chart.length) {
        init($chart);
    }
})();

var date_aux_ini = "";
var date_aux_fin = "";

let original_name,
    original_cost,
    original_coverage,
    original_restriction,
    original_allow_crane,
    original_grua,
    original_vehicle_type,
    original_gps,
    original_call_center,
    original_validez,
    original_cosas,
    original_personas,
    original_exceso,
    original_asistencia,
    original_muerte,
    original_invalidez,
    original_funerarios,
    original_medicos;

var tiposFull = [
    "Tipo de vehículo",
    "Ambulancia",
    "Arrastre",
    "Autobus",
    "Autobusete",
    "Backhoe Loader",
    "Baranda",
    "Baranda / Hierro",
    "Barredora",
    "Batea",
    "Buque",
    "Cabina",
    "Camioneta",
    "Carga",
    "Carga Cisterna",
    "Carroceria",
    "Casillero",
    "Cava / Granel",
    "Cava",
    "Cesta",
    "Chasis",
    "Chasis Autobus",
    "Chasis Cabina",
    "Chasis Minibus",
    "Chopper",
    "Chuto",
    "Cisterna",
    "Colectivo",
    "Compactadora",
    "Compacto MPV",
    "Convertible",
    "Coupe",
    "Cross",
    "Crossover",
    "Custom",
    "Custon",
    "Demoledor",
    "Deportivo",
    "Encava",
    "Enduro",
    "Especial",
    "Estaca/Baranda",
    "Estacas",
    "Estacas / Estruc / Hierro",
    "Excavadora",
    "Ferretero",
    "Fibra",
    "Funerario",
    "Furgon",
    "Furgon / Baranda",
    "Furgón/Cachucha",
    "Furgoneta",
    "Gabinete",
    "Gato Hidraulico",
    "Geofisico",
    "Granel",
    "Grua",
    "Grua de Izamiento",
    "Grua de Plataforma",
    "Gruas de Pluma",
    "Hatch Back",
    "Jaula",
    "Jaula Ganadera",
    "Jaula Pollera",
    "Limousine",
    "Low - Boy",
    "Minibus",
    "Minicargador",
    "Minivan",
    "Montacarga",
    "Motocicleta",
    "Motoneta",
    "Nodriza",
    "Pala Mecanica",
    "Panel",
    "Panel de Carga",
    "Paseo",
    "Payloader",
    "Pick Up",
    "Pick Up D/ Cabina",
    "Pick Up/C Cabina",
    "Pick-Up / Baranda",
    "Pick-Up / Baranda/Hierro",
    "Pick-Up/C Furgon",
    "Plat / Estruc / Hierro",
    "Platabanda",
    "Plataf / Cachucha",
    "Plataf/Baranda/Hierro",
    "Plataforma",
    "Plataforma / Baranda Metalica",
    "Plataforma Desplazable",
    "Plataforma Fija",
    "Platf / Baranda",
    "Platf / Estaca",
    "Platf/B Hidraulico",
    "Platf/G Hidráulico",
    "Porta Contenedores",
    "Racing",
    "Ranchera",
    "Recreo",
    "Remolque",
    "Renegado",
    "Retroexcavadora",
    "RG-16",
    "Rustico",
    "Rustico Carga",
    "Scooter",
    "Sedan",
    "Silo",
    "Sobre Ruedas",
    "Sport Wagon",
    "Sport Wagon Convertible",
    "Station Wagon",
    "Supervan",
    "Suv.",
    "Tanque",
    "Techo de Lona",
    "Techo Duro",
    "Touring",
    "Tractor",
    "Transportador",
    "Trayler",
    "Trimovil",
    "Type of ship",
    "Utilitario",
    "Vacuum",
    "Van",
    "Volqueta",
    "Volteo"
];
var motos = ["Tipo de vehículo", "Motocicleta", "Motoneta"];
var autos = [
    "Tipo de vehículo",
    "Ambulancia",
    "Arrastre",
    "Autobus",
    "Autobusete",
    "Backhoe Loader",
    "Baranda",
    "Baranda / Hierro",
    "Barredora",
    "Batea",
    "Buque",
    "Cabina",
    "Camioneta",
    "Carga",
    "Carga Cisterna",
    "Carroceria",
    "Casillero",
    "Cava / Granel",
    "Cava",
    "Cesta",
    "Chasis",
    "Chasis Autobus",
    "Chasis Cabina",
    "Chasis Minibus",
    "Chopper",
    "Chuto",
    "Cisterna",
    "Colectivo",
    "Compactadora",
    "Compacto MPV",
    "Convertible",
    "Coupe",
    "Cross",
    "Crossover",
    "Custom",
    "Custon",
    "Demoledor",
    "Deportivo",
    "Encava",
    "Enduro",
    "Especial",
    "Estaca/Baranda",
    "Estacas",
    "Estacas / Estruc / Hierro",
    "Excavadora",
    "Ferretero",
    "Fibra",
    "Funerario",
    "Furgon",
    "Furgon / Baranda",
    "Furgón/Cachucha",
    "Furgoneta",
    "Gabinete",
    "Gato Hidraulico",
    "Geofisico",
    "Granel",
    "Grua",
    "Grua de Izamiento",
    "Grua de Plataforma",
    "Gruas de Pluma",
    "Hatch Back",
    "Jaula",
    "Jaula Ganadera",
    "Jaula Pollera",
    "Limousine",
    "Low - Boy",
    "Minibus",
    "Minicargador",
    "Minivan",
    "Montacarga",
    "Nodriza",
    "Pala Mecanica",
    "Panel",
    "Panel de Carga",
    "Paseo",
    "Payloader",
    "Pick Up",
    "Pick Up D/ Cabina",
    "Pick Up/C Cabina",
    "Pick-Up / Baranda",
    "Pick-Up / Baranda/Hierro",
    "Pick-Up/C Furgon",
    "Plat / Estruc / Hierro",
    "Platabanda",
    "Plataf / Cachucha",
    "Plataf/Baranda/Hierro",
    "Plataforma",
    "Plataforma / Baranda Metalica",
    "Plataforma Desplazable",
    "Plataforma Fija",
    "Platf / Baranda",
    "Platf / Estaca",
    "Platf/B Hidraulico",
    "Platf/G Hidráulico",
    "Porta Contenedores",
    "Racing",
    "Ranchera",
    "Recreo",
    "Remolque",
    "Renegado",
    "Retroexcavadora",
    "RG-16",
    "Rustico",
    "Rustico Carga",
    "Scooter",
    "Sedan",
    "Silo",
    "Sobre Ruedas",
    "Sport Wagon",
    "Sport Wagon Convertible",
    "Station Wagon",
    "Supervan",
    "Suv.",
    "Tanque",
    "Techo de Lona",
    "Techo Duro",
    "Touring",
    "Tractor",
    "Transportador",
    "Trayler",
    "Trimovil",
    "Type of ship",
    "Utilitario",
    "Vacuum",
    "Van",
    "Volqueta",
    "Volteo"
];
var claseFull = [
    "Clase",
    "Automovil",
    "Camion",
    "Autobus",
    "Camioneta",
    "Taxi",
    "Moto",
    "Rustico",
    "Maquinaria",
    "Trailer",
    "Minibus",
    "Semi Remolque",
    "Remolque",
    "Vehiculo Especial",
    "Aparato Apto"
];
var motosClase = ["Clase", "Taxi", "Moto", "Vehiculo Especial"];
var autosClase = [
    "Clase",
    "Automovil",
    "Camion",
    "Autobus",
    "Camioneta",
    "Taxi",
    "Rustico",
    "Maquinaria",
    "Trailer",
    "Minibus",
    "Semi Remolque",
    "Remolque",
    "Vehiculo Especial",
    "Aparato Apto"
];

function markCategorySelected(cat_id, cat) {
    $(".category-selection").each(function() {
        $(this).attr("selected", cat_id === $(this)[0].value);
    });
    $(".category-new-selection").each(function() {
        $(this).attr("selected", $(this)[0].id === cat);
    });
}

$(document).on("click", ".menu-parent", function() {
    if (
        $(this)
            .parent()
            .find(".menu-child")
            .hasClass("d-none")
    ) {
        $(".menu-child").each(function() {
            $(this).addClass("d-none");
        });
    }
    let el = $(this).find(".arrow");
    if (el.hasClass("fa-caret-down")) {
        el.removeClass("fa-caret-down");
        el.addClass("fa-caret-up");
    } else {
        el.removeClass("fa-caret-up");
        el.addClass("fa-caret-down");
    }

    $(this)
        .parent()
        .find(".menu-child")
        .each(function() {
            $(this).toggleClass("d-none");
        });
});

$(document).on("click", "#inactive-users", function() {
    let count = 0;
    $(".id").each(function() {
        if ($(this).hasClass("active")) {
            $(this)
                .parent()
                .removeClass("selected");
        } else {
            count++;
            $(this)
                .parent()
                .addClass("selected");
        }
    });
    count === 0 ? $("#no-data").show() : $("#no-data").hide();
    $("#display-counter")[0].innerHTML = count;
});

$(document).on("click", "#active-users", function() {
    let count = 0;
    $(".id").each(function() {
        if ($(this).hasClass("inactive")) {
            $(this)
                .parent()
                .removeClass("selected");
        } else {
            count++;
            $(this)
                .parent()
                .addClass("selected");
        }
    });
    count === 0 ? $("#no-data").show() : $("#no-data").hide();
    $("#display-counter")[0].innerHTML = count;
});

$(document).on("click", "#all-users", function() {
    let count = 0;
    $(".search-line").each(function() {
        count++;
        $(this).addClass("selected");
    });
    count === 0 ? $("#no-data").show() : $("#no-data").hide();
    $("#display-counter")[0].innerHTML = count;
});

$(document).on("click", "#inactive-plans", function() {
    let count = 0;
    $(".id").each(function() {
        if ($(this).hasClass("active")) {
            $(this)
                .parent()
                .removeClass("selected");
        } else {
            count++;
            $(this)
                .parent()
                .addClass("selected");
        }
    });
    count === 0 ? $("#no-data").show() : $("#no-data").hide();
});

$(document).on("click", "#active-plans", function() {
    let count = 0;
    $(".id").each(function() {
        if ($(this).hasClass("inactive")) {
            $(this)
                .parent()
                .removeClass("selected");
        } else {
            count++;
            $(this)
                .parent()
                .addClass("selected");
        }
    });
    count === 0 ? $("#no-data").show() : $("#no-data").hide();
});

$(document).on("click", "#all-plans", function() {
    let count = 0;
    $(".search-line").each(function() {
        count++;
        $(this).addClass("selected");
    });
    count === 0 ? $("#no-data").show() : $("#no-data").hide();
});

$(document).on("change", "#home_plan", function() {
    $("#home-plan").val($(this).prop("checked") ? 1 : 0);
    $("#plans-save").prop("disabled", !planOK());
});
/*
$(document).on("input", "#plan-coverage", function() {
    $("#plan-cosas").val($(this).val() * 0.15);
    $("#plan-personas").val($(this).val() * 0.15);
    $("#plan-exceso").val($(this).val() * 0.15);
    $("#plan-asistencia").val($(this).val() * 0.15);
    $("#plan-muerte").val($(this).val() * 0.1);
    $("#plan-invalidez").val($(this).val() * 0.1);
    $("#plan-funerarios").val($(this).val() * 0.1);
    $("#plan-medicos").val($(this).val() * 0.1);
});
*/

function planOK() {
    return (
        $("#plan-name".trim()).val() !== "" &&
        $("#plan-cost".trim()).val() !== "" &&
        $("#plan-coverage".trim()).val() !== "" &&
        $("#plan-valid".trim()).val() !== "" &&
        $("#plan-cosas".trim()).val() !== "" &&
        $("#plan-poersonas".trim()).val() !== "" &&
        $("#plan-exceso".trim()).val() !== "" &&
        $("#plan-asistencia".trim()).val() !== "" &&
        $("#plan-muerte".trim()).val() !== "" &&
        $("#plan-invalidez".trim()).val() !== "" &&
        $("#plan-funerarios".trim()).val() !== "" &&
        $("#plan-medicos".trim()).val() !== "" &&
        $("#allow_crane".trim()).val() !== "" &&
        $("#vehicle_type".trim()).val() !== ""
    );
}

$(document).on(
    "input",
    "#plan-name, #plan-cost, #plan-coverage, #plan-restriction, #plan-grua, #plan-gps, #plan-call-center, #plan-valid, #plan-cosas, #plan-personas, #plan-exceso, #plan-asistencia, #plan-muerte, #plan-invalidez, #plan-funerarios, #plan-medicos",

    function() {
        $(this).val() !== ""
            ? $(this).addClass("selected")
            : $(this).removeClass("selected");
        $("#plans-save").prop("disabled", !planOK());
        original_name = $("#plan-name").val();
        original_cost = $("#plan-cost").val();
        original_coverage = $("#plan-coverage").val();
        original_restriction = $("#plan-restriction").val();
        original_allow_crane = $("#allow_crane").val();
        original_grua = $("#plan-grua").val();
        original_vehicle_type = $("#vehicle_type").val();
        original_gps = $("#plan-gps").val();
        original_call_center = $("#plan-call-center").val();
        original_validez = $("#plan-valid").val();
        original_cosas = $("#plan-cosas").val();
        original_personas = $("#plan-personas").val();
        original_exceso = $("#plan-exceso").val();
        original_asistencia = $("#plan-asistencia").val();
        original_muerte = $("#plan-muerte").val();
        original_invalidez = $("#plan-invalidez").val();
        original_funerarios = $("#plan-funerarios").val();
        original_medicos = $("#plan-medicos").val();
    }
);

$(document).on(
    "change",
    "#vehicle_type, #allow_crane, #stores_admin_plan, #stores_plan, #agents_plan, #renovation_plan",
    function() {
        $(this).val() !== ""
            ? $(this).addClass("selected")
            : $(this).removeClass("selected");
        $("#plans-save").prop("disabled", !planOK());
    }
);

function loadPlanAttributes(plan) {
    $("#plan-name").val(plan.nombre + " (renovación)");
    $("#plan-cost").val(plan.costo);
    $("#plan-coverage").val(plan.cobertura);
    $("#plan-restriction").val(plan.restriccion);
    $("#allow_crane").val(plan.allow_crane);
    $("#plan-grua").val(plan.grua);
    const $select = document.querySelector("#vehicle_type");
    const $options = Array.from($select.options);
    const optionToSelect = $options.find(
        item => item.text === plan.vehicle_type
    );
    optionToSelect.selected = true;
    // $("#vehicle_type").val(plan.vehicle_type);
    $("#plan-gps").val(plan.gps);
    $("#plan-call-center").val(plan.call_center);
    $("#plan-valid").val(plan.validez);
    $("#plan-cosas").val(plan.cosas);
    $("#plan-personas").val(plan.personas);
    $("#plan-exceso").val(plan.exceso);
    $("#plan-asistencia").val(plan.asistencia);
    $("#plan-muerte").val(plan.muerte);
    $("#plan-invalidez").val(plan.invalidez);
    $("#plan-funerarios").val(plan.funerarios);
    $("#plan-medicos").val(plan.medicos);

    $("#plan-name").addClass("selected");
    $("#plan-cost").addClass("selected");
    $("#plan-coverage").addClass("selected");
    $("#plan-restriction").addClass("selected");
    $("#allow_crane").addClass("selected");
    $("#plan-grua").addClass("selected");
    $("#vehicle_type").addClass("selected");
    $("#plan-gps").addClass("selected");
    $("#plan-call-center").addClass("selected");
    $("#plan-valid").addClass("selected");
    $("#plan-cosas").addClass("selected");
    $("#plan-personas").addClass("selected");
    $("#plan-exceso").addClass("selected");
    $("#plan-asistencia").addClass("selected");
    $("#plan-muerte").addClass("selected");
    $("#plan-invalidez").addClass("selected");
    $("#plan-funerarios").addClass("selected");
    $("#plan-medicos").addClass("selected");
}

function restorePlanAttributes() {
    $("#plan-name").val(original_name);
    $("#plan-cost").val(original_cost);
    $("#plan-coverage").val(original_coverage);
    $("#plan-restriction").val(original_restriction);
    $("#allow_crane").val(original_allow_crane);
    $("#plan-grua").val(original_grua);
    $("#vehicle_type").val(original_vehicle_type);
    $("#plan-gps").val(original_gps);
    $("#plan-call-center").val(original_call_center);
    $("#plan-valid").val(original_validez);
    $("#plan-cosas").val(original_cosas);
    $("#plan-personas").val(original_personas);
    $("#plan-exceso").val(original_exceso);
    $("#plan-asistencia").val(original_asistencia);
    $("#plan-muerte").val(original_muerte);
    $("#plan-invalidez").val(original_invalidez);
    $("#plan-funerarios").val(original_funerarios);
    $("#plan-medicos").val(original_medicos);

    $("#plan-name").removeClass("selected");
    $("#plan-cost").removeClass("selected");
    $("#plan-coverage").removeClass("selected");
    $("#plan-restriction").removeClass("selected");
    $("#allow_crane").removeClass("selected");
    $("#plan-grua").removeClass("selected");
    $("#vehicle_type").removeClass("selected");
    $("#plan-gps").removeClass("selected");
    $("#plan-call-center").removeClass("selected");
    $("#plan-valid").removeClass("selected");
    $("#plan-cosas").removeClass("selected");
    $("#plan-personas").removeClass("selected");
    $("#plan-exceso").removeClass("selected");
    $("#plan-asistencia").removeClass("selected");
    $("#plan-muerte").removeClass("selected");
    $("#plan-invalidez").removeClass("selected");
    $("#plan-funerarios").removeClass("selected");
    $("#plan-medicos").removeClass("selected");
}

$(document).on("change", "#renovation_plan", function(e) {
    var availables = document.getElementById("renovation_plan");
    var selected_option = availables.options[availables.selectedIndex].text;
    const selected_plan = plans[e.target.selectedIndex - 1];
    if ($(this).val() !== "") {
        $("#info_plan_name").html(
            `<STRONG>ATENCIÓN:</STRONG> Este plan es de renovación y su nombre será <strong>${selected_option} (renovación)</strong>`
        );
        loadPlanAttributes(selected_plan);
        $("#plan-name").prop("disabled", true);
    } else {
        $("#info_plan_name").html("");
        restorePlanAttributes();
        $("#plan-name").prop("disabled", false);
    }
});

$(document).on("click", ".gallery img", function() {
    const newPic = $(this)[0].classList.contains("new-pic-image");
    const file = $(this)[0].src.split("/");
    const category = file[file.length - 2];
    const file_name = file[file.length - 1];
    $("#file-name").text(file_name);
    $("#category-name").text(category);
    $("#gallery_image_id").val($(this)[0].dataset.id);
    $("#gallery_category_id").val($(this)[0].dataset.cat_id);
    $("#gallery_title").val($(this)[0].dataset.title);
    $("#gallery_description").val($(this)[0].dataset.description);
    markCategorySelected($(this)[0].dataset.cat_id, $(this)[0].dataset.cat);
    newPic
        ? $("#newImage").prop("src", $(this)[0].src)
        : $("#editImage").prop("src", $(this)[0].src);
    newPic
        ? $("#picture-popup-new").css("display", "flex")
        : $("#picture-popup-edit").css("display", "flex");
});

$(document).on("click", ".payment-confirmation", function() {
    $("#payment-confirm").show();
    $("#payment_confirmation_bank").show();
    $("#payment_confirmation_date")[0].innerHTML = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".search-date1")[0].innerHTML;
    $("#payment_confirmation_client")[0].innerHTML = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".serch-input1")[0].innerHTML;
    $("#payment_confirmation_reference")[0].innerHTML = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".search-input2")[0].innerHTML;
    $("#payment_confirmation_type")[0].innerHTML = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".search-select1")[0].innerHTML;
    $("#payment_confirmation_id").val(
        parseInt(
            $(this)
                .parent()
                .parent()
                .parent()
                .parent()
                .find(".payment-id")[0].innerHTML
        )
    );
    $("#payment_confirmation_amount")[0].innerHTML = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .find(".payment-amount")[0].innerHTML;
    if (
        $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".payment-bank")[0].innerHTML === "-"
    ) {
        $("#payment_confirmation_bank").hide();
    } else {
        $("#payment_confirmation_bank")[0].innerHTML = $(this)
            .parent()
            .parent()
            .parent()
            .parent()
            .find(".payment-bank")[0].innerHTML;
    }
});

$(document).on("click", "#contractBenefits", function() {
    $("#contract-details").show();
});

$(document).on("click", "#info-ok", function() {
    $("#contract-details").hide();
});

$(document).on("click", ".card-profile-image img", function() {
    $("#editProfile").prop("src", $(this)[0].src);
});

$(document).on("click", ".close", function() {
    $("#update-picture").css("display", "none");
    $("#load-picture").css("display", "none");
    $(".picture-popup").css("display", "none");
    $("#payment-confirm").css("display", "none");
});

$(document).on("click", ".close-message", function() {
    $(".message-background").css("display", "none");
    $(".communication-background").css("display", "none");
});

imgInp.onchange = evt => {
    const [file] = imgInp.files;
    if (file) {
        newImage.src = URL.createObjectURL(file);
        newImage.src.includes("new_pic") || newImageCat.value === "Seleccionar"
            ? $("#load-picture").css("display", "none")
            : $("#load-picture").css("display", "block");
    }
};

imgEdit.onchange = evt => {
    const [file] = imgEdit.files;
    if (file) {
        editImage.src = URL.createObjectURL(file);
        $("#update-picture").css("display", "block");
    }
};

$(document).on("input", ".form-validation", function() {
    $("#update-picture").css("display", "block");
});

$(document).on("input", ".show-gallery", function() {
    $("#new-pic")[0].dataset.cat = "new";
    const cat = $(this)[0].value;
    $(".img-fluid").each(function() {
        if (
            $(this)[0].dataset.cat !== cat &&
            cat != "all" &&
            $(this)[0].dataset.cat != "new"
        ) {
            $(this)
                .parent()
                .css("display", "none");
        } else {
            $(this)
                .parent()
                .css("display", "block");
        }
        if (cat !== "all" && $(this)[0].dataset.cat == "new") {
            $(this)[0].dataset.cat = cat;
        }
    });
});

$(document).on("input", ".new-pic-validation", function() {
    newImage.src.includes("new_pic") || newImageCat.value === "Seleccionar"
        ? $("#load-picture").css("display", "none")
        : $("#load-picture").css("display", "block");
});

$(document).on("click", ".category-selector", function() {
    const input = $(this).find("input")[0].id;
    $(".img-fluid").each(function() {
        if ($(this)[0].dataset.cat !== input && input != "all") {
            $(this)
                .parent()
                .css("display", "none");
        } else {
            $(this)
                .parent()
                .css("display", "block");
        }
    });
});

function setCategoryAction(title, cat, button, type, id, qty) {
    $("#category-input").val(cat);
    $("#category-input").focus();
    $("#category-label").text(title);
    $("#category-button").text(button);
    $("#category_id").val(id);
    $("#transaction_type").val(type);
    $("#category_qty").val(qty);
}

$(document).on("click", ".category-edit", function() {
    const id = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .children()[0].innerHTML;
    const cat = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .children()[1].innerHTML;
    const qty = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .children()[2].innerHTML;
    setCategoryAction("Editar", cat, "Guardar Cambios", "edit", id, qty);
    $("#category-button").removeClass("btn-danger");
    $("#category-input").prop("disabled", false);
    $("#category-button").prop("disabled", true);
});

$(document).on("click", ".category-delete", function() {
    const id = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .children()[0].innerHTML;
    const cat = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .children()[1].innerHTML;
    const qty = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .children()[2].innerHTML;
    setCategoryAction("Borrar categoría", cat, "Borrar", "delete", id, qty);
    $("#category-button").addClass("btn-danger");
    $("#category-input").prop("disabled", true);
    $("#category-button").prop("disabled", false);
});

$(document).on("click", ".category-create", function() {
    setCategoryAction("Agregar Nueva", null, "Crear", "create", null, null);
    $("#category-button").prop("disabled", true);
    $("#category-button").removeClass("btn-danger");
    $("#category-input").prop("disabled", false);
});

$(document).on("click", ".close", function() {
    setCategoryAction("Agregar Nueva", null, "Crear", "create", null, null);
    $("#category-button").removeClass("btn-danger");
    $("#category-input").prop("disabled", false);
});

$(document).on("input", "#category-input", function() {
    $(this)[0].value
        ? $("#category-button").prop("disabled", false)
        : $("#category-button").prop("disabled", true);
});

$(document).on("click", ".open-form", function() {
    $("#category-form").show();
});

$(document).on("click", ".close-form", function() {
    $("#category-form").hide();
});

function getCommunicationImage(image) {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf("/") + 1);
    return (
        loc.href.substring(
            0,
            loc.href.length -
                ((loc.pathname + loc.search + loc.hash).length -
                    pathName.length)
        ) +
        "img/resources/" +
        image +
        "_icon.svg"
    );
}

$(document).on("click", "#category-button", function() {
    if ($(this)[0].innerHTML === "Borrar") {
        if ($("#category_qty")[0].value > 0) {
            $(".communication-background .icon-message").prop(
                "src",
                getCommunicationImage("warning")
            );
            $(".communication-background span").html(
                "Esta categoría contiene fotos, la borramos de todos modos?"
            );
            $(".communication-background").css("display", "flex");
        } else {
            document.category_form.submit();
        }
    } else {
        document.category_form.submit();
    }
});

$(document).on("click", "#confirm-erase-category", function() {
    document.category_form.submit();
});

$(document).on("click", "#customCheckRegister", function() {
    $(this).prop("checked")
        ? $("#register-submit").prop("disabled", false)
        : $("#register-submit").prop("disabled", true);
});

$(document).on("change", "#user-document-type", function(e) {
    if (e.target.value === "V") {
        $('#user-nationality > option[value="venezolana"]').attr(
            "selected",
            "selected"
        );
    }
});

var profile = document.getElementById("profileEdit");
if (profile != null) {
    profileEdit.onchange = evt => {
        const [file] = profileEdit.files;
        if (file) {
            editProfile.src = URL.createObjectURL(file);
            $("#update-profile-picture").css("display", "block");
        }
    };
}

function unselectService(service) {
    $(`#extras-${service}`).val("");
    $(`#extras-${service}`).prop("checked", false);
    $(`#extras-${service}`).prop("disabled", false);
    $(`#extras-${service}`)
        .parent()
        .css("pointer-events", "unset");
    $(`#extras-${service}-label`).css("color", "#adb5bd");
    $(`#extras-${service}`).show();
}

function freeService(service) {
    $(`#extras-${service}`).val("on");
    $(`#extras-${service}`).prop("checked", true);
    $(`#extras-${service}`).prop("disabled", true);
    $(`#extras-${service}`)
        .parent()
        .css("pointer-events", "none");
    $(`#extras-${service}`)
        .parent()
        .css("pointer-events", "none");
    $(`#extras-${service}-label`).css("color", "#0a3d69");
}

$(document).on("click", "#extras-gps", function(e) {
    const plan_id = $("#contract-type").val();
    var extra_gps = 200;
    if ($(this).prop("checked") == true) {
        $("#extras-gps-label").css("color", "#798086");
        loadContractDetails(plan_id, true, extra_gps);
    } else {
        $("#extras-gps-label").css("color", "#adb5bd");
        extra_gps = 0;
        loadContractDetails(plan_id, false, extra_gps);
    }
    var cost = parseInt(plans[plan_id].costo) + extra_gps;
    $("#extras-gps-label").css("color", "#798086");
    $("#cost").text("COSTO: $" + cost);
    $("#total").val(cost);
});

$(document).on("change", "#receive-cash", function() {
    $("#cash").val($(this).prop("checked") ? 1 : 0);
});

$(document).on("change", "#confirm-payments", function() {
    $("#conf_payment").val($(this).prop("checked") ? 1 : 0);
});

$(document).on("change", "#view-payments", function() {
    $("#view_payment").val($(this).prop("checked") ? 1 : 0);
});

$(document).on("change", "#bonus_payments", function() {
    $("#bonus_payment").val($(this).prop("checked") ? 1 : 0);
});

function changeVehicleOptions(item) {
    var tipo_vehiculo = document.getElementById("vehicle-type");
    var option = document.createElement("option");
    option.text = item;
    tipo_vehiculo.add(option);
}

function changeClaseOptions(item) {
    var clase_vehiculo = document.getElementById("vehicle-class");
    var option = document.createElement("option");
    option.text = item;
    clase_vehiculo.add(option);
}

function loadContractData(
    cost,
    coverage,
    extra_info,
    vehicle_type,
    set_vehicle = true
) {
    $("#vehiculo-año option").each(function() {
        $(this).prop("disabled", false);
    });

    if (/\d/.test(extra_info)) {
        // La cadena contiene números
        var year = parseInt(extra_info.slice(-4));
        var excluir = "";
        if (extra_info.includes("A partir")) {
            excluir = "menores";
        }
        $("#vehiculo-año option").each(function() {
            if (excluir === "menores") {
                if (parseInt($(this).val()) < year) {
                    $(this).prop("disabled", true);
                }
            } else {
                if (parseInt($(this).val()) > year) {
                    $(this).prop("disabled", true);
                }
            }
        });
    }
    $("#cost").text("COSTO: $" + cost);
    $("#total").val(cost);
    $("#cost").show();
    $("#info-2").text(extra_info);
    $("#vehicle-type").removeClass("selected");
    $("#vehicle-class").removeClass("selected");

    // if (set_vehicle) {
    //     if (vehicle_type === "Moto") {
    //         motos.forEach(changeVehicleOptions);
    //         motosClase.forEach(changeClaseOptions);
    //     } else {
    //         autos.forEach(changeVehicleOptions);
    //         autosClase.forEach(changeClaseOptions);
    //     }
    // }

    $(".quarter.info").css("pointer-events", "unset");
    $(".quarter.info").css("opacity", 1);
}

$(document).on("change", "#contract-type", function(e) {
    // $("#vehicle-type option")
    //     .filter(function() {
    //         return true;
    //     })
    //     .remove();
    // $("#vehicle-class option")
    //     .filter(function() {
    //         return true;
    //     })
    //     .remove();

    if (plans[e.target.value].allow_crane) {
        $("#extras-grua")
            .parent()
            .show();
        if (plans[e.target.value].grua) {
            freeService("grua");
        } else {
            unselectService("grua");
        }
    } else {
        $("#extras-grua").val("");
        $("#extras-grua").prop("checked", false);
        $("#extras-grua").prop("disabled", false);
        $("#extras-grua")
            .parent()
            .hide();
    }

    if (plans[e.target.value].gps) {
        freeService("gps");
    } else {
        unselectService("gps");
    }

    loadContractDetails(e.target.value, plans[e.target.value].gps, 0);
    $(".quarter.info").addClass("show-info");

    var cond = plans[e.target.value].restriccion;

    if (cond == null) {
        cond = plans[e.target.value].grua
            ? "Incluye servicios adicionales"
            : "No incluye servicio de grua";
    }

    loadContractData(
        plans[e.target.value].costo,
        plans[e.target.value].cobertura,
        cond,
        plans[e.target.value].vehicle_type
    );
});

///////////////// CUPONES /////////////////

function resetTarget() {
    $("#agent").val("");
    $("#cupon_agent").hide();
    $("#assigned").val("");
    $("#cupons_assigned").hide();
    $("#cupon-users").val("");
    $("#cupon_camp").hide();
    $("#specific-user").val("");
    $("#specific_user").hide();
    $("#user-list").val("");
    $("#list_users").hide();
    $("#qty").val("");
    $("#param_qty").hide();
    $("#days").val("");
    $("#param_days").hide();
}

function validList() {
    return (
        $("#user-list").val() === "vencido" ||
        $("#user-list").val() === "nuevos" ||
        ($("#user-list").val() === "porvencer" &&
            $("#days".trim()).val() !== "" &&
            parseInt($("#days").val()) !== 0) ||
        ($("#user-list").val() === "activos" && $("#qty".trim()).val() !== "")
    );
}

function dataOk() {
    const valid =
        $("#cupon-code".trim()).val() !== "" &&
        $("#cupon-duration".trim()).val() !== "" &&
        (($("#agent".trim()).val() !== "" &&
            parseInt($("#assigned").val()) !== 0 &&
            $("#assigned".trim()).val() !== "") ||
            ($("#cupon-users".trim()).val() !== "" &&
                ($("#specific-user".trim()).val() !== "" || validList()))) &&
        valueOk();
    if (valid && $("#user-type".trim()).val() === "master") {
        $("#cupon_status").show();
    } else {
        $("#cupon_status").hide();
    }
    return true;
    // return valid;
}

function valueOk() {
    return (
        $("#cupon-value".trim()).val() !== "" &&
        parseInt($("#cupon-value").val()) !== 0 &&
        ($("#tipo".trim()).val() === "montoFijo" ||
            ($("#tipo".trim()).val() === "porcentaje" &&
                $("#cupon-max".trim()).val() !== "" &&
                $("#cupon-max").val() > 0))
    );
}

function userOK() {
    const basic_data =
        $("#user-name".trim()).val() !== "" &&
        $("#user-document-type".trim()).val() !== "" &&
        $("#user-document-number".trim()).val() !== "" &&
        parseInt($("#user-document-number").val()) !== 0 &&
        $("#user-nationality".trim()).val() !== "" &&
        $("#user-adress".trim()).val() !== "" &&
        $("#user-phone1".trim()).val() !== "" &&
        parseInt($("#user-phone1").val()) !== 0 &&
        $("#user-email".trim()).val() !== "";
    const agent_data =
        $("#user-store".trim()).val() !== "" &&
        $("#user-comission".trim()).val() !== "" &&
        $("#user-goal".trim()).val() !== "" &&
        $("#user-reward".trim()).val() !== "";
    const client_data = $("#user-agent".trim()).val() !== "";

    switch ($("#user-type".trim()).val()) {
        case "agent":
            return basic_data && agent_data;
        case "client":
            return basic_data && client_data;
        default:
            return basic_data;
    }
}

function contractOK() {
    return true;
    return (
        $("#contract-type".trim()).val() !== "" &&
        $("#vehicle-type".trim()).val() !== "" &&
        $("#vehicle-color".trim()).val() !== "" &&
        $("#vehicle-bodywork-serial".trim()).val() !== "" &&
        $("#vehicle-class".trim()).val() !== "" &&
        $("#vehiculo-placa".trim()).val() !== "" &&
        $("#vehiculo-marca".trim()).val() !== "" &&
        $("#vehiculo-modelo".trim()).val() !== "" &&
        $("#vehiculo-año".trim()).val() !== ""
    );
}

function CiOK() {
    return (
        $("#user-document-type".trim()).val() !== "" &&
        $("#user-document-number".trim()).val() !== ""
    );
}

$(document).on("change", "#cupon-tipo", function(e) {
    $(this).val() !== ""
        ? $(this).addClass("selected")
        : $(this).removeClass("selected");
    resetTarget();
    switch (e.target.value) {
        case "recap":
            $("#cupon-title")[0].innerHTML = "Nuevo Cupón de Recaptación";
            $("#cupon_camp").hide();
            $("#cupon_agent").show();
            $("#cupons_assigned").show();
            $(".quarter.info").css("opacity", 1);
            break;
        case "camp":
            $("#cupon-title")[0].innerHTML = "Nuevo Cupón de Campaña";
            $("#cupon_agent").hide();
            $("#cupons_assigned").hide();
            $("#cupon_camp").show();
            break;
        default:
            $("#cupon-title")[0].innerHTML = "Nuevo Cupón";
    }
    $("#btn-save").prop("disabled", !dataOk());
});

$(document).on("change", "#cupon-users", function(e) {
    $(this).val() !== ""
        ? $(this).addClass("selected")
        : $(this).removeClass("selected");
    $("#btn-save").prop("disabled", dataOk);
    switch (e.target.value) {
        case "specific":
            $("#list_users").val("");
            $("#list_users").hide();
            $("#days").val("");
            $("#param_days").hide();
            $("#qty").val("");
            $("#param_qty").hide();
            $("#specific-user").val("");
            $("#specific_user").show();
            break;
        case "list":
            $("#user-list").val("");
            $("#specific-user").val("");
            $("#specific_user").hide();
            $("#list_users").show();
            break;
        default:
    }
    $("#btn-save").prop("disabled", !dataOk());
});

$(document).on("change", "#user-list", function(e) {
    $(this).val() !== ""
        ? $(this).addClass("selected")
        : $(this).removeClass("selected");
    switch (e.target.value) {
        case "porvencer":
            $("#param_qty").hide();
            $("#param_days").show();
            break;
        case "activos":
            $("#param_days").hide();
            $("#param_qty").show();
            break;
        default:
            $("#param_qty").hide();
    }
    $("#btn-save").prop("disabled", !dataOk());
});

$(document).on("change", "#tipo", function(e) {
    $(this).val() !== ""
        ? $(this).addClass("selected")
        : $(this).removeClass("selected");
    $("#cupon-value").val("");
    $("#cupon-duration").val("");
    $("#cupon-max").val("");
    $("#cupon_duration").show();
    switch (e.target.value) {
        case "porcentaje":
            $("#cupon_value").show();
            $("#cupon_max_desc").css("display", "flex");
            $("#cupon_max").show();
            break;
        case "montoFijo":
            $("#cupon_value").show();
            $("#cupon_max_desc").hide();
            $("#cupon_max").hide();
            break;
        default:
            $("#cupon_max_desc").hide();
            $("#cupon_max").hide();
            $("#cupon_value").hide();
    }
    $("#btn-save").prop("disabled", !dataOk());
});

$(document).on(
    "change",
    "#agent, #specific-user, #qty, #cupon-duration, #cupon-status",
    function(e) {
        $(this).val() !== ""
            ? $(this).addClass("selected")
            : $(this).removeClass("selected");
        $("#btn-save").prop("disabled", !dataOk());
    }
);

$(document).on("input", "#assigned, #days, #cupon-value, #cupon-max", function(
    e
) {
    this.value = this.value.replace(/[^0-9]/g, "");
    $(this).val() !== ""
        ? $(this).addClass("selected")
        : $(this).removeClass("selected");
    $("#btn-save").prop("disabled", !dataOk());
});

$(document).on("input", "#cupon-code", function(e) {
    $(this).val() !== ""
        ? $(this).addClass("selected")
        : $(this).removeClass("selected");
    $("#btn-save").prop("disabled", !dataOk());
});

/////////////// SUCURSALES //////////////

$(document).on("input", "#store-name, #store-adress, #store-comision", function(
    e
) {
    const valid =
        $("#store-name".trim()).val() !== "" &&
        $("#store-adress".trim()).val() !== "" &&
        $("#store-comision".trim()).val() !== "";
    $(this).val() !== ""
        ? $(this).addClass("selected")
        : $(this).removeClass("selected");
    $("#btn-store-save").prop("disabled", !valid);
});

////////////////// CHARTS ///////////

$(document).on("click", "#chart-months", function(e) {
    $("#chart-title")[0].innerHTML = "Ventas del año";
});
$(document).on("click", "#chart-weeks", function(e) {
    $("#chart-title")[0].innerHTML = "Ventas del mes";
});
$(document).on("click", "#chart-days", function(e) {
    $("#chart-title")[0].innerHTML = "Ventas de la semana";
});

///////////////// USUARIOS /////////////////////


function enableCamera() {
    $(".hole").css("opacity", 1);
    $("#target").css("opacity", 1);
}
function disableCamera() {
    $(".hole").css("opacity", 0);
    $("#target").css("opacity", 0);
}

//////////////////// CONTRATOS //////////////////////

$(document).on(
    "input",
    "#vehicle-color, #vehicle-bodywork-serial, #vehicle-class, #vehiculo-placa ",
    function(e) {
        $(this).val() !== ""
            ? $(this).addClass("selected")
            : $(this).removeClass("selected");
        $("#btn-contract-save").prop("disabled", !contractOK());
    }
);

$(document).on("input", "#user-document-type, #user-document-number", function(e) {
    $(this).val() !== ""
        ? $(this).addClass("selected")
        : $(this).removeClass("selected");
    $("#btn-search-user").prop("disabled", !CiOK());
    $("#btn-search-user1").prop("disabled", !CiOK());
    $("#btn-search-user2").prop("disabled", !CiOK());
});

$(document).on(
    "change",
    "#contract-type, #vehicle-type, #vehiculo-marca, #vehiculo-modelo, #vehiculo-año",
    function(e) {
        $(this).val() !== ""
            ? $(this).addClass("selected")
            : $(this).removeClass("selected");
        $("#btn-contract-save").prop("disabled", !contractOK());
    }
);

$(document).on("change", "#vehicle-class", function(e) {
    $(this).val() !== ""
        ? $(this).addClass("selected")
        : $(this).removeClass("selected");
    $("#btn-contract-save").prop("disabled", !contractOK());
});

////////// GASTOS ////////

$(document).on("input", "#expense-description", function(e) {
    const valid =
        $("#expense-type".trim()).val() !== "" &&
        $("#expense-description".trim()).val() !== "" &&
        $("#expense-value".trim()).val() !== "" &&
        parseInt($("#expense-value").val()) !== 0;
    $("#btn-expense-save").prop("disabled", !valid);
});
$(document).on("change", "#expense-type", function(e) {
    const valid =
        $("#expense-type".trim()).val() !== "" &&
        $("#expense-description".trim()).val() !== "" &&
        $("#expense-value".trim()).val() !== "" &&
        parseInt($("#expense-value").val()) !== 0;
    $("#btn-expense-save").prop("disabled", !valid);
});
$(document).on("input", "#expense-value", function(e) {
    this.value = this.value.replace(/[^0-9]/g, "");
    const valid =
        $("#expense-type".trim()).val() !== "" &&
        $("#expense-description".trim()).val() !== "" &&
        $("#expense-value".trim()).val() !== "" &&
        parseInt($("#expense-value").val()) !== 0;
    $("#btn-expense-save").prop("disabled", !valid);
});

////////////////// QR CODE///////////////////////////

$(document).on("click", ".qr-container", function(e) {
    let scanner = new Instascan.Scanner({
        video: document.getElementById("qr-preview")
    });

    scanner.addListener("scan", function(content) {
        const cont = content.split(/\r\n|\r|\n/, -1);
        let placa = cont[4].substr(cont[4].indexOf(":") + 1).trim();
        let marca = cont[5]
            .substr(cont[5].indexOf(":") + 1)
            .trim()
            .toLowerCase();
        let modelo = cont[6]
            .substr(cont[6].indexOf(":") + 1)
            .trim()
            .toLowerCase();
        let año = cont[7].substr(cont[7].indexOf(":") + 1).trim();
        $("#vehiculo-placa").val(placa);
        $("#vehiculo-marca").val(marca);
        $("#vehiculo-modelo").val(modelo);
        $("#vehiculo-año").val(año);
        scanner.stop();
        disableCamera();
    });
    Instascan.Camera.getCameras()
        .then(function(cameras) {
            if (cameras.length > 0) {
                if (screen.width < 768) {
                    scanner.mirror = false;
                    scanner.scanPeriod = 20;
                    scanner.start(cameras[1]);
                } else {
                    scanner.start(cameras[0]);
                }
            } else {
                console.error("No cameras found.");
            }
        })
        .catch(function(e) {
            console.error(e);
        });
    setTimeout(() => {
        enableCamera();
    }, "2000");
});

$(document).on("click", "#btn-manual", function() {
    $("#manual-data").css("opacity", 1);
    $("#manual-data").css("height", "auto");
    $("#manual-data").css("margin-bottom", "1.5rem");
});

////////// FILTROS ////////////

function formatDate(date) {
    if (date.trim() !== "") {
        return new Date(
            parseInt(date.split("/")[2]),
            parseInt(date.split("/")[1]) - 1,
            parseInt(date.split("/")[0].substring(0, 2))
        );
    } else {
        return "-";
    }
}

function checkData(elem, type, data, end) {
    var founded = false;
    elem.find(`.search-${type}1`).each(function() {
        if (!founded) {
            if (type === "date") {
                var date = formatDate($(this)[0].innerHTML);
                if (
                    (date >= data && end === null) ||
                    (date >= data && date <= end)
                ) {
                    founded = true;
                }
            } else {
                if (type === "select") {
                    $(this)[0].innerHTML.toUpperCase() === data
                        ? (founded = true)
                        : (founded = false);
                } else {
                    if (
                        $(this)[0]
                            .innerHTML.toUpperCase()
                            .indexOf(data) > -1
                    ) {
                        founded = true;
                    }
                }
            }
        }
    });
    return founded;
}

function inputFilters(input, select, start, end) {
    var result1 = 0;
    var result2 = 0;
    var count = 0;
    var founded;
    var show1 = $("#display-result1").length ? true : false;
    var show2 = $("#display-result2").length ? true : false;
    var show_counter = $("#display-counter").length ? true : false;
    $(".search-line").each(function() {
        if (input !== "") {
            founded = checkData($(this), "input", input, end);
            if (founded) {
                if (select !== "") {
                    founded = checkData($(this), "select", select, end);
                }
                if (start !== null) {
                    if (founded) {
                        founded = checkData($(this), "date", start, end);
                    }
                }
            }
        } else {
            if (select !== "") {
                founded = checkData($(this), "select", select, end);
                if (founded) {
                    if (start !== null) {
                        founded = checkData($(this), "date", start, end);
                    }
                }
            } else {
                start !== null
                    ? (founded = checkData($(this), "date", start, end))
                    : (founded = true);
            }
        }
        if (!founded) {
            $(this).removeClass("selected");
            $("#no-data").show();
        } else {
            if (show1) {
                // Sumar solo si el select es "pago movil"
                if (select === "pago movil") {
                    result1 += parseFloat($(this).find(".show-data1")[0].innerHTML);
                } else {
                    result1 += parseFloat($(this).find(".show-data1")[0].innerHTML);
                }
            }
            if (show2) {
                result2 += parseFloat($(this).find(".show-data2")[0].innerHTML);
            }
            count++;
            $(this).addClass("selected");
            $("#no-data").hide();
        }
    });
    count === 0 ? $("#no-data").show() : $("#no-data").hide();
    if (show1) {
        $("#display-result1")[0].innerHTML = result1.toString();
    }
    if (show2) {
        $("#display-result2")[0].innerHTML = result2.toString();
    }

    if (show_counter) {
        $("#display-counter")[0].innerHTML = count;
    }
}

/////// BUSCADOR ////////

$(document).on("input", "#search-input1", function() {
    var input = $(this)
        .val()
        .toString()
        .trim()
        .toUpperCase();
    var select = $("#search-select1").length
        ? $("#search-select1")
              .val()
              .toString()
              .trim()
              .toUpperCase()
        : "";
    var ini = $("#data1").length ? $("#data1").val() : null;
    var end = $("#data2").length ? $("#data2").val() : null;
    if (end == "") {
        end = null;
    }

    inputFilters(input, select, ini, end);
});

$(document).on("change", "#search-select1", function() {
    if (location.href.includes("comisiones")) {
        $(".header-title")[0].innerHTML =
            $(".header-title")[0].innerHTML.split(" ")[0] +
            " " +
            $(this)
                .val()
                .toString()
                .trim()
                .toUpperCase() +
            "S";
    }

    if ($("#btn-comission-payment").length > 0) {
        $(this).val() === "pendiente"
            ? $("#btn-comission-payment").show()
            : $("#btn-comission-payment").hide();
    }

    var input = $("#search-input1").length
        ? $("#search-input1")
              .val()
              .toString()
              .trim()
              .toUpperCase()
        : "";
    var select = $(this)
        .val()
        .toString()
        .trim()
        .toUpperCase();
    var ini = $("#data1").length ? $("#data1").val() : null;
    var end = $("#data2").length ? $("#data2").val() : null;
    if (end == "") {
        end = null;
    }

    if (document.getElementById("comisionsAll") !== null) {
        $("#comisionsAll").prop("checked", true);
    }
    console.log(select);
    if (select !== "PENDIENTE") {
        $("#comisionsAll").addClass("d-none");
        $(".comissions").each(function() {
            $(this).addClass("d-none");
        });
    } else {
        $("#comisionsAll").removeClass("d-none");
        $(".comissions").each(function() {
            $(this).removeClass("d-none");
        });
    }
    $(".comissions").each(function() {
        $(this).prop("checked", true);
    });

    inputFilters(input, select, ini, end);
});

/////// FILTROS FECHAS ////////

function initializeDates() {
    const firstDay = getFirstDayOfTheMonth();
    $("#data1").val(firstDay);
    $("#data2").val("");
    inputFilters("", "", firstDay, null);
    $("#search-input1").val("");
    $("#search-select1").val("");
    $("#daterange").val("");
}

function getFirstDayOfTheMonth() {
    var date = new Date();
    date.setDate(1); // 1 will result in the first day of the month
    date.setHours(0, 0, 0, 0);
    return date;
}

$(document).on("click", "#periodo", function() {
    inputFilters(
        $("#search-input1").length > 0 ? $("#search-input1").val() : null,
        $("#search-select1").length > 0
            ? $("#search-select1")
                  .val()
                  .toUpperCase()
            : "",
        date_aux_ini,
        date_aux_fin
    );
    $(".periodo").show();
});

$(document).on("click", "#actual", function() {
    $(".periodo").hide();
    const firstDay = getFirstDayOfTheMonth();
    date_aux_ini = $("#data1").val();
    date_aux_fin = $("#data2").val();
    $("#data1").val(firstDay);
    $("#data2").val("");
    inputFilters(
        $("#search-input1").length > 0 ? $("#search-input1").val() : null,
        $("#search-select1").length > 0
            ? $("#search-select1")
                  .val()
                  .toUpperCase()
            : "",
        firstDay,
        null
    );
});

$(document).on("click", "#all", function() {
    $(".periodo").hide();
    $("#data1").val("");
    $("#data2").val("");
    inputFilters(
        $("#search-input1").length > 0 ? $("#search-input1").val() : null,
        $("#search-select1").length > 0
            ? $("#search-select1")
                  .val()
                  .toUpperCase()
            : null,
        null,
        null
    );
});

// $(document).on("click", "#no-date", function() {
//     inputFilters("", "", null, null);
// });

jQuery(function() {
    var show_counter = $("#display-counter").length ? true : false;
    if ($(".id").length > 0) {
        let count = 0;
        $(".id").each(function() {
            if ($(this).hasClass("inactive")) {
                $(this)
                    .parent()
                    .removeClass("selected");
            } else {
                count++;
                $(this)
                    .parent()
                    .addClass("selected");
            }
        });
        count === 0 ? $("#no-data").show() : $("#no-data").hide();

        if (show_counter) {
            $("#display-counter")[0].innerHTML = count;
        }
    }

    if ($("#no-date").length > 0) {
        inputFilters("", "", null, null);
    }

    $("form").bind("submit", function() {
        $(this)
            .find(":input")
            .prop("disabled", false);
    });
    if ($("#imgSinister").length > 0) {
        imgSinister.onchange = evt => {
            const [file] = imgSinister.files;
            if (file) {
                newSinisterPic.src = URL.createObjectURL(file);
                $("#siniestro-img-label")[0].innerHTML = "Cambiar foto";
            }
        };
    }
    if (document.getElementById("comisionsAll") !== null) {
        $("#btn-comission-payment").hide();
        $(".search-select1").each(function() {
            if ($(this)[0].innerHTML === "PENDIENTE") {
                $("#btn-comission-payment").show();
            }
        });

        var input = $("#search-input1").length
            ? $("#search-input1")
                  .val()
                  .toString()
                  .trim()
                  .toUpperCase()
            : "";
        var select = $("#search-select1")
            .val()
            .toString()
            .trim()
            .toUpperCase();
        var ini = $("#data1").length ? $("#data1").val() : null;
        var end = $("#data2").length ? $("#data2").val() : null;
        if (end == "") {
            end = null;
        }

        if (document.getElementById("comisionsAll") !== null) {
            $("#comisionsAll").prop("checked", true);
        }
        $(".comissions").each(function() {
            $(this).prop("checked", true);
        });
        console.log(select);
        inputFilters(input, select, ini, end);

        var checkbox = document.getElementById("comisionsAll");
        checkbox.addEventListener("click", function() {
            var count = 0;
            var new_com = 0;
            $(".comissions").each(function() {
                $(this).prop("checked", checkbox.checked);
                if (checkbox.checked) {
                    new_com =
                        new_com +
                        parseInt(
                            $(this)
                                .parent()
                                .parent()
                                .find(".show-data1")[0].innerHTML
                        );
                }
                count++;
            });
            if (count > 0) {
                $("#btn-comission-payment").prop("disabled", !checkbox.checked);
            }
            $("#display-result1")[0].innerHTML = new_com;
        });
        $(".comissions").on("click", function(e) {
            var total_com = parseInt($("#display-result1")[0].innerHTML);
            var some_checked = false;
            var new_com = 0;
            if (!e.target.checked) {
                $("#comisionsAll").prop("checked", false);
                new_com =
                    total_com -
                    parseInt(
                        $(this)
                            .parent()
                            .parent()
                            .find(".show-data1")[0].innerHTML
                    );
            } else {
                new_com =
                    total_com +
                    parseInt(
                        $(this)
                            .parent()
                            .parent()
                            .find(".show-data1")[0].innerHTML
                    );
                var allchecked = true;
                $(".comissions").each(function() {
                    if (!$(this).prop("checked")) {
                        allchecked = false;
                    }
                });
            }
            $(".search-select1").each(function() {
                if ($(this)[0].innerHTML === "PENDIENTE") {
                    if (
                        $(this)
                            .siblings()
                            .find(".comissions")
                            .prop("checked")
                    ) {
                        some_checked = true;
                    }
                }
            });
            $("#btn-comission-payment").prop("disabled", !some_checked);
            $("#comisionsAll").prop("checked", allchecked);
            $("#display-result1")[0].innerHTML = new_com;
        });
    }

    if (document.getElementById("start-solicitadas") !== null) {
        inputFilters("", "SOLICITADA", null, null);
    } else {
        if (document.getElementById("actual") !== null) {
            if ($("#actual").prop("checked")) {
                initializeDates();
            }
        }
    }

    // Al cargar la página, si existen fechas cargo #data1 con el primer dia del mes y filtro los datos
    if ($("#data1").length && $("#no-data").length == 0) {
        $("#data1").val(getFirstDayOfTheMonth());
    }

    if (
        document.querySelector(".quarter.info.view") ||
        document.querySelector(".quarter.info.edit") !== null
    ) {
        const set_vehicle = document.querySelector(".quarter.info.edit");
        if (!set_vehicle) {
            $("#contract-type").css("background-color", "#e9ecef");
            $("#contract-type").css("color", "#6c747c");
        }
        const plan_id = $("#contract-type").val();
        var cond = plans[plan_id].restriccion;

        if (cond == null) {
            cond = plans[plan_id].grua
                ? "Incluye servicio de grua"
                : "No incluye servicio de grua";
        }

        loadContractData(
            plans[plan_id].costo,
            plans[plan_id].cobertura,
            cond,
            plans[plan_id].vehicle_type,
            set_vehicle
        );

        var cost = plans[plan_id].costo;
        if ($("#extras-gps").prop("checked") == true) {
            cost = cost + 260;
            $("#cost").text("COSTO: $" + cost);
            $("#total").val(cost);
            loadContractDetails($("#contract-type").val(), cost, 0);
        } else {
            loadContractDetails($("#contract-type").val(), null, 0);
        }
    }
});

///// INFO CONTRACTS ///////
function loadContractDetails(contract, extra_gps, gps_cost) {
    var complement = extra_gps ? " + GPS $" : " $";
    const total_cost = plans[contract].costo;

    $("#contract-details h4")[0].innerHTML =
        plans[contract].nombre + complement + total_cost;
    $("#contract-details-cond > span")[0].innerHTML = plans[contract].condicion
        ? "(" + plans[contract].plan-cosas + ")"
        : "No aplica";
    $("#contract-details-coverage > span")[0].innerHTML =
        "$" + plans[contract].cobertura;
    $("#contract-details-crane > span")[0].innerHTML = plans[contract].grua
        ? plans[contract].grua
        : "No posee";
    $("#contract-details-call > span")[0].innerHTML = plans[contract]
        .call_center
        ? plans[contract].call_center
        : "No posee";
    $("#contract-details-gps > span")[0].innerHTML = plans[contract].gps
        ? plans[contract].gps
        : "No posee";
    $("#cob-1").val(plans[contract].cosas);
    $("#cob-2").val(plans[contract].personas);
    $("#cob-3").val(plans[contract].exceso);
    $("#cob-4").val(plans[contract].asistencia);
    $("#cob-5").val(plans[contract].muerte);
    $("#cob-6").val(plans[contract].invalidez);
    $("#cob-7").val(plans[contract].funerarios);
    $("#cob-8").val(plans[contract].medicos);
}

function createPDF(name, orientation) {
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF(orientation, "mm", [1050, 1350]);
    doc.setFontSize(40);
    doc.text(name, 12, 25);
    var pdfjs = document.querySelector("#PDFreport");

    doc.html(pdfjs, {
        callback: function(doc) {
            window.open(doc.output("bloburl"), "_blank");
            // doc.save(name + ".pdf");
        },
        x: 12,
        y: 40
    });
}

function pagoOK() {
    return (
        ($("#pago_type").val() === "zelle" &&
            $('input[name="referencia"]')
                .val()
                .toString()
                .trim() !== "" &&
                $("#efectivo-img")[0].files.length > 0) ||
        ($("#pago_type").val() === "vpos" &&
            $('input[name="ncard"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('input[name="cvv"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('input[name="vpospin"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('input[name="nafi"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('input[name="fexp"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('select[name="tcard"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('select[name="vpostype"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('input[name="vposid"]')
                .val()
                .toString()
                .trim() !== "") ||
        ($("#pago_type").val() === "c2p" &&
            $('input[name="p_c2p"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('input[name="terminal_c2p"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('input[name="token_c2p"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('select[name="id_bank"]')
                .val()
                .toString()
                .trim() !== "" &&
            $('input[name="ci_debt"]')
                .val()
                .toString()
                .trim() !== "") ||
        ($("#pago_type").val() === "pago_movil" &&
            $('input[name="pagoMovil"]')
                .val()
                .toString()
                .trim() !== "" &&
                $("#efectivo-img")[0].files.length > 0) ||
		($("#pago_type").val() === "zinli" &&
            $("#efectivo-img")[0].files.length > 0) ||
		($("#pago_type").val() === "BNC" &&
			$('input[name="BNC"]')
                .val()
                .toString()
                .trim() !== "") ||
        ($("#pago_type").val() === "transferencia" &&
            $('input[name="comprobante"]')
                .val()
                .toString()
                .trim() !== "" &&
            $("#banco")
                .val()
                .toString()
                .trim() !== "" &&
                $("#efectivo-img")[0].files.length > 0) ||
        ($("#pago_type").val() === "puntoVenta" &&
            $("#efectivo-img")[0].files.length > 0)    ||
        ($("#pago_type").val() === "efectivo" &&
            $("#efectivo-img")[0].files.length > 0)
    );
}

function sinisterOK() {
    return (
        $("#sinister-title".trim()).val() !== "" &&
        $("#sinister-date").val() !== "" &&
        $("#sinister-description").val().length >= 30
    );
}

function cuponOK() {
    return (
        $('input[name="cupon"]')
            .val()
            .toString()
            .trim().length > 3
    );
}

$("#pago_type").on("change", function() {
    //zelle
    $("#zelleData").hide();
    $("#zelle_img").hide();
    $("#referencia").hide();
    //tarjetas
    $("#tarjetaprepagadaData").hide();
    $("#tarjetaprepagadaField").hide();
    //pagomovil

    $("#pagoMovilData").hide();
    //vpos
    $("#fexp_data").hide();
    $("#vposid_data").hide();
    $("#vposid").hide();
    $("#tcard").hide();
    $("#ncard").hide();
    $("#cvv").hide();
    $("#vpospin").hide();
    $("#vpostype").hide();
    $("#ncard").hide();
    $("#fexp").hide();
    $("#nafi").hide();
    $("#nafi_data").hide();
    $("#maestro").hide();
    $("#mastercard").hide();
    $("#visa").hide();
    //c2p
    $("#p_c2p").hide();
    $("#id_bank").hide();
    $("#token_c2p").hide();
    $("#ci_debt").hide();
    $("#terminal_c2p").hide();
    $("#c2p_img").hide();
    $("#terminal_c2p_data").hide();
    //zinli
    $("#zinliData").hide();
    $("#zinli").hide();
    $("#paypal").hide();
    //datos varios
	$("#BanPanData").hide();
	$("#BNCData").hide();
    $("#dolares").hide();
    $("#phonePagoMovil").hide();
    $("#phonePuntoVenta").hide();
    $("#comprobanteTransfer").hide();
    $("#tranferenciaData").hide();
    $("#tranferenciaData2").hide();
    $("#bancoEmision").hide();
    $("#fotoPago").hide();
    $("#halfSpace").hide();
    $("#threeQuarterSpace").show();
    $('input[name="referencia"]').val("");
    $('input[name="puntoVenta"]').val("");
    $('input[name="pagoMovil"]').val("");
    $('select[name="banco"]').val("");
    $('input[name="comprobante"]').val("");
    $("#efectivo-img-label")[0].innerHTML = "Sube el comprobante";
    $("#btn-save").prop("disabled", true);

    switch (this.value) {
        case "zelle":
            $("#zelleData").show();
            $("#zelle_img").show();
            $("#referencia").show();
            $("#threeQuarterSpace").hide();
            $("#fotoPago").show();
            break;
        case "c2p":
            $("#p_c2p").show();
            $("#id_bank").show();
            $("#ci_debt").show();
            $("#token_c2p").show();
            $("#terminal_c2p").show();
            $("#terminal_c2p_data").show();
            $("#c2p_img").show();
            $("#threeQuarterSpace").hide();
            break;
        case "tarjetaprepagada":
            $("#tarjetaprepagadaData").show();
            $("#tarjetaprepagadaField").show();
            $("#threeQuarterSpace").hide();
            break;
        case "vpos":
            $("#fexp_data").show();
            $("#vposid_data").show();
            $("#vposid").show();
            $("#tcard").show();
            $("#ncard").show();
            $("#fexp").show();
            $("#vposname").show();
            $("#vpostype").show();
            $("#cvv").show();
            $("#vpospin").show();
            $("#indentification").show();
            $("#nafi").show();
            $("#nafi_data").show();
            $("#visa").show();
            $("#mastercard").show();
            $("#maestro").show();
            $("#threeQuarterSpace").hide();
            break;
        case "pago_movil":
            $("#pagoMovilData").show();
            $("#phonePagoMovil").show();
            $("#threeQuarterSpace").hide();
            $("#fotoPago").show();
            break;
		case "zinli":
            $("#zinliData").show();
            $("#zinli").show();
            $("#paypal").show();
            $("#threeQuarterSpace").hide();
            $("#fotoPago").show();
            break;
		case "puntoVenta":
            $("#phonePuntoVenta").show();
            $("#threeQuarterSpace").hide();
            $("#fotoPago").show();
            break;
		case "BNC":
            $("#BNCData").show();
            $("#BNC").show();
            $("#threeQuarterSpace").hide();
            $("#fotoPago").show();
            break;
        case "transferencia":
            $("#tranferenciaData").show();
            $("#tranferenciaData2").show();
            $("#bancoEmision").show();
            $("#comprobanteTransfer").show();
            $("#threeQuarterSpace").hide();
            $("#fotoPago").show();
            break;
        case "efectivo":
            $("#threeQuarterSpace").hide();
            $("#halfSpace").show();
            $("#dolares").show();
            $("#btn-save").prop("disabled", pagoOK());
            break;
    }
});

function fileChoose(event, element) {
    if (event.target.files.length > 0) {
        $("#efectivo-img-label")[0].innerHTML = "Cambiar comprobante";
    }
    $("#btn-save").prop("disabled", !pagoOK());
}

$(document).on(
    "input",
    'input[name="terminal_c2p"], input[name="p_c2p"], input[name="ci_debt"], select[name="id_bank"]',
    function() {
        $("#btn-save").prop("disabled", !pagoOK());
    }
);


$(document).on(
    "input",
    'input[name="vposid"], input[name="ncard"], input[name="cvv"], input[name="vpospin"], input[name="nafi"], input[name="fexp"], select[name="tcard"], select[name="vpostype"]',
    function() {
        $("#btn-save").prop("disabled", !pagoOK());
    }
);


$(document).on(
    "input",
    'input[name="referencia"], input[name="pagoMovil"], input[name="comprobante"]',
    function() {
        $("#btn-save").prop("disabled", !pagoOK());
    }
);

$(document).on(
    "input",
    'input[name="referencia"], input[name="puntoVenta"], input[name="comprobante"]',
    function() {
        $("#btn-save").prop("disabled", !pagoOK());
    }
);

$(document).on("input", 'input[name="cupon"]', function() {
    $("#btn-cupon").prop("disabled", !cuponOK());
});

$(document).on("click", "#privacy-policy", function() {
    $("#register-title")[0].innerHTML = "POLÍTICAS Y PRIVACIDAD";
    $(".card-body").attr("style", "padding: 20px !important");
    $("#register-data").hide();
    $("#policy-data").show();
});

$(document).on("click", ".close-policy", function() {
    $("#register-title")[0].innerHTML = "REGISTRATE";
    $(".card-body").attr("style", "padding: 3rem !important");
    $("#policy-data").hide();
    $("#register-data").show();
});

 // --------------------------------- ESTO ES PARA FILTRAR EL TIPO DE PAGO EN LA CONFIRMACION DE PAGOS ---------------------------

// Obtener el select y la tabla
 const select = document.getElementById('payment-type');
 const tableBody = document.querySelector('table tbody');

 // Función para filtrar los datos
 function filterTable() {
 const searchTerm = select.value.toLowerCase();
 const rows = tableBody.querySelectorAll('tr');


 // Recorrer cada fila de la tabla
 rows.forEach(row => {
     const paymentMethod = row.querySelector('td.search-select1').textContent.toLowerCase();
     // Modificamos la condición para que se muestren todos los registros cuando se selecciona "Todos"
     if (searchTerm === 'todos' || !searchTerm || paymentMethod.includes(searchTerm)) {
     row.style.display = '';
     } else {
     row.style.display = 'none';
     }
 });
 }

 // Escuchar el evento de cambio en el select
 select.addEventListener('change', filterTable);

 /// ------------------------------- FIN DE EL FILTRADO DE TIPO DE PAGO EN CONFIRMACION DE PAGOS ---------------------------
 
 
 