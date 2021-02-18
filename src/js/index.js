let data = {};
let maximums = {};
let minimums = {};
let currentPeriod = "October 2020";
let prevPeriod = "";

$(window).on("load", () => {
   Comps.setLoading();
   Comps.init();
   Comps.updateSelect("#selBlameType", Generate.selectOptions(["All Types"]), ["All Types"]);
   Comps.updateSelect("#selScheme", Generate.selectOptions(["Arch RE DL2 Scheme"]), ["Arch RE DL2 Scheme"]);
   Comps.updateSelect("#selPeriod", Generate.selectOptions(["October 2020", "November 2020", "December 2020", "January 2021", "February 2021", "March 2021"]), ["October 2020"]);

   Data.getAllClaims((response) => {
      const res = response.data[0].results;
      data = {};
      for (let i = 0; i < res.length; i++) {
         const d = res[i];
         data[d.month + " " + d.year] = d;

         const keys = Object.keys(d);
         for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            if (key === "id") continue;
            if (!maximums[key] || parseInt(maximums[key]) < d[key]) maximums[key] = d[key];
            if (!minimums[key] || parseInt(minimums[key]) > d[key]) minimums[key] = d[key];
         }
      }

      initChart(data);
      initSelects();
      update();
      Comps.setFinished();
   });
});

getPropValue = (key = "") => {
   return currentPeriod[key] / maximums[key] * 100;
}

getPropValuePrev = (key = "") => {
   return prevPeriod ? prevPeriod[key] / maximums[key] * 100 : 0;
}

getPropLast = (key = "") => {
   const val = prevPeriod ? currentPeriod[key] - prevPeriod[key] : 0;
   const str = val >= 0 ? "+" + val : val;
   return str + " (previous)";
}

update = () => {
   currentPeriod = data[$("#selPeriod").val()];
   const lastId = currentPeriod.id - 1;
   prevPeriod = lastId > 0 ? Util.findWhere(data, "id", lastId) : null;
   
   $("#totalFromStart").html(currentPeriod.total_from_start);
   $("#totalFromStartLast").html(getPropLast("total_from_start"));
   Comps.updateProgress("#totalFromStartProgressA", getPropValue("total_from_start"));
   Comps.updateProgress("#totalFromStartProgressB", getPropValuePrev("total_from_start"));
   
   $("#broughtForward").html(currentPeriod.brought_forward);
   $("#broughtForwardLast").html(getPropLast("brought_forward"));
   Comps.updateProgress("#broughtForwardProgressA", getPropValue("brought_forward"));
   Comps.updateProgress("#broughtForwardProgressB", getPropValuePrev("brought_forward"));
   
   $("#newClaims").html(currentPeriod.new_claims);
   $("#newClaimsLast").html(getPropLast("new_claims"));
   Comps.updateProgress("#newClaimsProgressA", getPropValue("new_claims"));
   Comps.updateProgress("#newClaimsProgressB", getPropValuePrev("new_claims"));
   
   $("#prevBacklog").html(currentPeriod.previous_backlog);
   $("#prevBacklogLast").html(getPropLast("previous_backlog"));
   Comps.updateProgress("#prevBacklogProgressA", getPropValue("previous_backlog"));
   Comps.updateProgress("#prevBacklogProgressB", getPropValuePrev("previous_backlog"));
   
   $("#reopenedInMonth").html(currentPeriod.reopened_in_month);
   $("#reopenedInMonthLast").html(getPropLast("reopened_in_month"));
   Comps.updateProgress("#reopenedInMonthProgressA", getPropValue("reopened_in_month"));
   Comps.updateProgress("#reopenedInMonthProgressB", getPropValuePrev("reopened_in_month"));
   
   $("#closed").html(currentPeriod.closed);
   $("#closedLast").html(getPropLast("closed"));
   Comps.updateProgress("#closedProgressA", getPropValue("closed"));
   Comps.updateProgress("#closedProgressB", getPropValuePrev("closed"));
   
   $("#carriedForward").html(currentPeriod.carried_forward);
   $("#carriedForwardLast").html(getPropLast("carried_forward"));
   Comps.updateProgress("#carriedForwardProgressA", getPropValue("carried_forward"));
   Comps.updateProgress("#carriedForwardProgressB", getPropValuePrev("carried_forward"));
   
   $("#settledAt").html(currentPeriod.settled_at_nil);
   $("#settledAtLast").html(getPropLast("settled_at_nil"));
   Comps.updateProgress("#settledAtProgressA", getPropValue("settled_at_nil"));
   Comps.updateProgress("#settledAtProgressB", getPropValuePrev("settled_at_nil"));
   
   $("#settledClaims").html(currentPeriod.settled_claims);
   $("#settledClaimsLast").html(getPropLast("settled_claims"));
   Comps.updateProgress("#settledClaimsProgressA", getPropValue("settled_claims"));
   Comps.updateProgress("#settledClaimsProgressB", getPropValuePrev("settled_claims"));
}

initSelects = () => {
   $("#selPeriod").on("change", () => {
      update();
   });
}

initChart = (data = {}) => {
  const keys = Object.keys(data);
  const newPoints = [], oldPoints = [], diffPoints = [];
  for (let i = 0; i < keys.length; i++) {
     const d = data[keys[i]];
     newPoints[i] = d.new_claims;
     oldPoints[i] = d.closed;
     diffPoints[i] = d.new_claims - d.closed;
  }

  const config = {
     type: "line",
     data: {
        labels: keys,
        datasets: [{
           label: "New claims",
           fill: false,
           backgroundColor: Util.cssVar("positive"),
           borderColor: Util.cssVar("positive2"),
           data: newPoints
        }, {
           label: "Closed claims",
           fill: false,
           backgroundColor: Util.cssVar("negative"),
           borderColor: Util.cssVar("negative2"),
           data: oldPoints,
        }, {
           label: "Difference",
           fill: false,
           backgroundColor: Util.cssVar("neutral"),
           borderColor: Util.cssVar("neutral2"),
           data: diffPoints,
        }]
     },
     options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
           display: true,
           text: "Opened vs Closed Claims"
        },
        layout: {
         padding: {
            right: 20
         }
        },
        tooltips: {
           mode: "index",
           intersect: false,
        },
        hover: {
           mode: "nearest",
           intersect: true
        },
        scales: {
           xAxes: [{
              display: false,
              scaleLabel: {
                 display: true,
                 labelString: "Period"
              }
           }],
           yAxes: [{
              display: true,
              scaleLabel: {
                 display: true,
                 labelString: "Claims"
              }
           }]
        }
     }
  }
  
  const chart = $("#chart");
  const myChart = new Chart(chart, config);

  window.addEventListener("resize", function () { myChart.resize(); });
}

Comps.updateProgress = (id = "", percent = 0) => {
  $(id + " .progress").each(function () {
     $(this).css("width", percent + '%');
  });
}

Comps.setLoading = () => {
    $(".loader").removeClass("run finish error");
    $(".loader").delay(50).addClass("run");
}

Comps.setFinished = () => {
    $(".loader").removeClass("run finish error");
    $(".loader").delay(50).addClass("finish");
}

Comps.setError = () => {
    $(".loader").removeClass("run finish error");
    $(".loader").delay(50).addClass("error");
}

Comps.setSelect = (selector = "", value = "") => {
    $(selector).val(value).trigger("change");
}

Comps.updateSelect = (selector = "", values = [], selected = []) => {
    $(selector).html(values).val(selected).trigger("change");
}

Comps.setToggle = (selector = "", isOn = true) => {
    $(selector).data("is-on", !isOn).trigger("click");
}

Comps.toggle = (selector = "") => {
    $(selector).trigger("click");
}