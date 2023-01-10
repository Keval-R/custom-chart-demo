import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Chart.css";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import { getElementAtEvent, Doughnut } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);

export const centerText = [
  {
    id: "centerText",
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const { ctx } = chart;
      ctx.restore();
      const fontSize = 2;
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      ctx.fillText(chart?.data?.datasets[0]?.text, width / 2, height / 1.5);
      ctx.save();
    },
  },
];

export const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const halfdoughnutOptions = {
  responsive: true,
  maintainAspectRatio: true,
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Chart = (props) => {
  const { data } = props;
  const pieRef = useRef(null);
  const [userIndex, setUserIndex] = useState(0);
  const [userSelectedChartTwoData, setUserSelectedChartTwoData] = useState([]);
  const [chartOneData, setChartOneData] = useState([]);
  const [chartOneBackgroundColor, setChartOneBackgroundColor] = useState([]);
  const [chartOneBorderColor, setChartOneBorderColor] = useState([]);
  const [chartTwoBackgroundColor, setChartTwoBackgroundColor] = useState([]);
  const [chartTwoBorderColor, setChartTwoBorderColor] = useState([]);
  const [chartOneTitle, setChartOneTitle] = useState([]);
  const [chartTwoTitle, setChartTwoTitle] = useState([]);
  const [chartTwoData, setChartTwoData] = useState([]);
  const [centerTextChartTwo, setCenterTextChartTwo] = useState([]);
  const [userSelectedExtraData, setUserSelectedExtraData] = useState([]);

  const doughnutData = {
    labels: chartOneTitle ?? [],
    datasets: [
      {
        label: data?.firstChartDataSetLabel,
        data: chartOneData ?? [],
        backgroundColor: chartOneBackgroundColor,
        borderColor: chartOneBorderColor,
        borderWidth: 1,
      },
    ],
  };

  const halfdoughnutData = {
    labels: chartTwoTitle,
    datasets: [
      {
        label: data?.secondChartDataSetLabel,
        data: userSelectedChartTwoData,
        backgroundColor: chartTwoBackgroundColor,
        borderColor: chartTwoBorderColor,
        borderWidth: 1,
        text: centerTextChartTwo[userIndex],
      },
    ],
  };

  useEffect(() => {
    if (chartTwoData) {
      setUserSelectedChartTwoData(chartTwoData[userIndex]);
    }

    if (data?.extraData.length !== 0 && data?.extraData[userIndex]) {
      setUserSelectedExtraData(data?.extraData[userIndex]);
    }
  }, [userIndex, chartTwoData, data]);

  useEffect(() => {
    if (data?.firstChart) {
      setChartOneBackgroundColor([]);
      setChartOneBorderColor([]);
      setChartOneData([]);
      setChartOneTitle([]);
      setChartTwoData([]);
      setCenterTextChartTwo([]);
      data?.firstChart.map((data) => {
        setChartOneBackgroundColor((oldData) => [
          ...oldData,
          data?.backgroundColor ?? "",
        ]);
        setChartOneBorderColor((oldData) => [
          ...oldData,
          data?.borderColor ?? "",
        ]);

        setChartOneTitle((oldData) => [...oldData, data?.name ?? ""]);
        setChartOneData((oldData) => [...oldData, data?.data ?? ""]);
        setChartTwoData((oldData) => [...oldData, data?.secondChartData ?? []]);
        setCenterTextChartTwo((oldData) => [
          ...oldData,
          data?.secondChartCenterText ?? "",
        ]);
        return true;
      });
    }

    if (data?.secondChart) {
      setChartTwoBorderColor([]);
      setChartTwoBackgroundColor([]);
      setChartTwoTitle([]);

      data?.secondChart.map((data) => {
        setChartTwoBackgroundColor((oldData) => [
          ...oldData,
          data?.backgroundColor ?? "",
        ]);
        setChartTwoBorderColor((oldData) => [
          ...oldData,
          data?.borderColor ?? "",
        ]);
        setChartTwoTitle((oldData) => [...oldData, data?.name ?? ""]);

        return true;
      });
    }
  }, [data]);

  return (
    <div className="container-xxl mt-5">
      <div className="row">
        <div className="col-12 col-xxl-6 col-lg-6 col-md-12 col-sm-12 ">
          <div className="row">
            <div className="col-12 col-xxl-6 col-md-6 col-sm-12">
              <Doughnut
                style={{ cursor: "pointer" }}
                data={doughnutData}
                options={doughnutOptions}
                ref={pieRef}
                onClick={(event) => {
                  const element = getElementAtEvent(pieRef.current, event);
                  setUserIndex(element[0]?.index ?? 0);
                }}
              />
            </div>
            <div className="col-12 col-xxl-6 col-md-6 col-sm-12 mt-5">
              <div className="d-flex flex-wrap flex-column justify-content-center">
                {data?.firstChart?.map((data) => {
                  return (
                    <div key={data?.name} className="">
                      <span
                        style={{
                          float: "left",
                          height: "20px",
                          width: "20px",
                          //   marginBottom: "15px",
                          border: "1px solid black",
                          clear: "both",
                          backgroundColor: `${data?.backgroundColor}`,
                          marginRight: "5px",
                        }}
                      ></span>

                      <label className="pl-10">{data?.name}</label>
                    </div>
                  );
                })}
              </div>
              <div className="d-flex flex-wrap flex-column justify-content-center">
                {data?.tipData && data?.tipData?.length !== 0 && (
                  <div className="mt-5 text-break">
                    <div>
                      <h6 className="pl-10">{data?.firstChartTipTitle}</h6>
                    </div>
                    <div>
                      <label className="pl-10 tip-data text-wrap">
                        {data?.tipData[userIndex]?.firstChartTip ?? ""}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xxl-6 col-lg-6 col-md-12 col-sm-12">
          <div className="row">
            <div className="col-12 col-xxl-6 col-md-6 col-sm-12 ">
              <Doughnut
                data={halfdoughnutData}
                options={halfdoughnutOptions}
                height="400px"
                plugins={centerText}
              />
            </div>
            <div className="col-12 col-xxl-6 col-md-6 col-sm-12 mt-5">
              <div className="d-flex flex-wrap flex-column justify-content-center">
                {data?.secondChart?.map((data) => {
                  return (
                    <div key={data?.name} className="w-100">
                      <span
                        style={{
                          float: "left",
                          height: "20px",
                          width: "20px",
                          //   marginBottom: "15px",
                          border: "1px solid black",
                          clear: "both",
                          backgroundColor: `${data?.backgroundColor}`,
                          marginRight: "5px",
                        }}
                      ></span>

                      <label className="pl-10">{data?.name}</label>
                    </div>
                  );
                })}
              </div>

              <div className="d-flex flex-wrap flex-column justify-content-center">
                {data?.tipData && data?.tipData?.length !== 0 && (
                  <div className="mt-5 text-break tip-data">
                    <div>
                      <h6 className="pl-10">{data?.secondChartTipTitle}</h6>
                    </div>
                    <div>
                      <label className="pl-10 tip-data">
                        {data?.tipData[userIndex]?.secondChartTip ?? ""}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap mt-5">
        {userSelectedExtraData && userSelectedExtraData.length !== 0 && (
          <div className="d-flex flex-wrap flex-column">
            <div>
              <h4>{data?.labelExtraData ?? ""}</h4>
            </div>
            {Object.keys(userSelectedExtraData).map((key, index) => (
              <div className="my-3" key={index}>
                <h6>{key.charAt(0).toUpperCase() + key.slice(1)}</h6>
                <span>{userSelectedExtraData[key]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
