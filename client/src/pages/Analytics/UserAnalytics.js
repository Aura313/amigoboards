import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import "./Analytics.scss";
import analyticservices from "../../Services/AnalyticsServices.js";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts";

const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "WORKITEMS ANALYSIS",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}</b>",
  },
  accessibility: {
    point: {
      valueSuffix: " ",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} ",
      },
    },
  },
  series: [
    {
      name: "WORKITEMS",
      colorByPoint: true,
      data: [
        {
          name: "TO DO",
          y: 61.41,
          sliced: true,
          selected: true,
        },
        {
          name: "IN PROGRESS",
          y: 11.84,
        },
        {
          name: "COMPLETED",
          y: 11.84,
        },
      ],
    },
  ],
};

export function UserAnalytics() {
  return (
    <Grid>
      <Paper elevation={20} className="userstatspaperStyle">
        <PieChart highcharts={Highcharts} options={options} />
      </Paper>
    </Grid>
  );
}

export default UserAnalytics;
