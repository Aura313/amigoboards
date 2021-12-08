import React, { useState, useEffect } from "react";
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
import authservice from "../../Services/AuthenticationService.js";
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts";
import axios from "../../middleware/axios";
// import axios from "../middleware/axios";
import Config from "../../Configuration/Config.json";

export class UserAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
    };
  }

  componentDidMount() {
    const username = authservice.getCurrentUser().userName;
    console.log(username);
    axios
      .post(
        Config.userStories_url + "/username",
        { username },
        { headers: authservice.authHeader() }
      )
      .then((response) => {
        this.setState({
          stats: response.data,
        });

        console.log(
          this.state.stats.filter((item) => item.status === "In Progress")
            .length
        );
      })

      .catch((error) => {
        console.log(error);
      });
  }

  getstats() {
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "WORKITEM ANALYSIS",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.y}</b>",
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
            format: "<b>{point.name}</b>: {point.y} ",
          },
          colors: ["#ff9504", "#3f51b5", "mediumseagreen"],
        },
      },
      series: [
        {
          name: "WORKITEMS",
          colorByPoint: true,
          data: [
            {
              name: "TO DO",
              y: this.state.stats.filter((item) => item.status === "To do")
                .length,
              sliced: true,
              selected: true,
            },
            {
              name: "IN PROGRESS",
              y: this.state.stats.filter(
                (item) => item.status === "In Progress"
              ).length,
            },
            {
              name: "COMPLETED",
              y: this.state.stats.filter((item) => item.status === "Completed")
                .length,
            },
          ],
        },
      ],
    };
    return options;
  }

  render() {
    return (
      <Grid>
        <Paper elevation={20} className="userstatspaperStyle">
          <PieChart highcharts={Highcharts} options={this.getstats()} />
        </Paper>
      </Grid>
    );
  }
}

export default UserAnalytics;
