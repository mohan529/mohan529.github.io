function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function computeData(a) {
  let teamname = [];
  for (let i in a) {
    let b = Object.keys(a[i]);
    for (let i in b) {
      if (teamname.indexOf(b[i]) !== -1) {
        continue;
      } else {
        teamname.push(b[i]);
      }
    }
  }

  let year = [];
  for (let k in a) {
    year.push(parseInt(k));
  }

  let final = [];
  for (let i in teamname) {
    c = {};
    bc = [];
    for (let j in year) {
      data = false;
      for (let k in a) {
        if (year[j].toString() === k) {
          let n = Object.keys(a[k]);
          if (n.indexOf(teamname[i]) !== -1) {
            data = true;
          }
        }
      }
      if (data === true) {
        bc.push(a[year[j]][teamname[i]]);
      } else {
        bc.push(0);
      }
    }
    c["name"] = teamname[i];
    c["data"] = bc;
    final.push(c);
  }
  return final;
}

function visualizeData(data) {
  visualizeMatchesPlayedPerYear(
    data.matchesPlayedPerYear,
    data.mostWinsPerYear,
    data.extraRunsByEachTeam,
    data.topEconomicalBowler,
    data.maximumWinByRuns
  );
  return;
}

function visualizeMatchesPlayedPerYear(
  matchesPlayedPerYear,
  mostWinsPerYear,
  extraRunsByEachTeam,
  topEconomicalBowler,
  maximumWinByRuns
) {
  const seriesData = [];
  const extraRuns = [];
  const mostWins = [];
  const topEconomical = [];
  const maximumWin = [];
  const check = [];

  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
    const winData = Object.keys(mostWinsPerYear);
    // console.log(winData);
    for (let a in extraRunsByEachTeam) {
      extraRuns.push([a, extraRunsByEachTeam[a]]);
    }
    for (let a in mostWinsPerYear) {
      mostWins.push([a, mostWinsPerYear[a]]);
    }
    for (let a in topEconomicalBowler) {
      topEconomical.push([a, topEconomicalBowler[a]]);
    }

    for (let a in extraRunsByEachTeam) {
      extraRuns.push([a, extraRunsByEachTeam[a]]);
    }

    for (let a in maximumWinByRuns) {
      maximumWin.push([a, maximumWinByRuns[a]]);
    }
    const s = computeData(mostWinsPerYear);
    console.log(s);
    const yearf = [];
    for (let yeardata in mostWinsPerYear) {
      yearf.push(yeardata);
    }
    console.log(yearf);

    Highcharts.chart("matches-played-per-year", {
      chart: {
        type: "column"
      },
      title: {
        text: "1. Matches Played Per Year"
      },
      subtitle: {
        text:
          'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        min: 0,
        title: {
          text: "Matches"
        }
      },
      series: [
        {
          name: "Years",
          data: seriesData
        }
      ]
    });

    // SOLUTION NUM 2
    Highcharts.chart("most-Wins-Per-Year", {
      chart: {
        type: "column"
      },
      title: {
        text: "2. Number of matches won by all team over all the years of ipl"
      },
      subtitle: {
        text: "Source: WorldClimate.com"
      },
      xAxis: {
        categories: yearf,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: "Matches won"
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: s
    });

    Highcharts.chart("extra-Runs-By-Each-Team", {
      chart: {
        type: "column"
      },
      title: {
        text: "3. Extra runs conceded by each team in 2016"
      },
      subtitle: {
        text:
          'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: -45,
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif"
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Extra Runs"
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: "Extra runs: <b>{point.y:.1f} </b>"
      },
      series: [
        {
          name: "Teams",
          data: extraRuns,
          dataLabels: {
            enabled: true,
            // rotation: -90,
            color: "#FFFFFF",
            align: "right",
            //   format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif"
            }
          }
        }
      ]
    });

    Highcharts.chart("top-Economical-Bowler", {
      chart: {
        type: "column"
      },
      title: {
        text: "4. Top Economical Bowlers in 2015"
      },
      subtitle: {
        text:
          'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
      },
      xAxis: {
        type: "category",
        labels: {
          rotation: -45,
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif"
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Economy"
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        pointFormat: "Economy: <b>{point.y:.1f} </b>"
      },
      series: [
        {
          name: "Teams",
          data: topEconomical,
          dataLabels: {
            enabled: true,
            // rotation: -90,
            color: "#FFFFFF",
            align: "right",
            format: "{point.y:.2f}", //two decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: "13px",
              fontFamily: "Verdana, sans-serif"
            }
          }
        }
      ]
    });
  }

  // Build the chart
  Highcharts.chart("maximum", {
    chart: {
      type: "column"
    },
    title: {
      text: "5. Story: Maximum winning margin by runs in ipl of each team"
    },
    subtitle: {
      text:
        'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    accessibility: {
      announceNewData: {
        enabled: true
      }
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      title: {
        text: "Runs"
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true
        }
      }
    },

    series: [
      {
        name: "Runs",
        colorByPoint: true,
        data: maximumWin
      }
    ]
  });
}
