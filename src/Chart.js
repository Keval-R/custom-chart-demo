import "./Chart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getElementAtEvent, Doughnut } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

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
  const [userSelectedExtraData, setUserSelectedExtraData] = useState(null);

  const doughnutData = {
    labels: chartOneTitle ?? [],
    datasets: [
      {
        label: data?.chartOneDatasetLabel,
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
        label: data?.chartTwoDatasetLabel,
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
    if (data?.chartExtraData.legend !== 0 && data?.chartExtraData[userIndex]) {
      setUserSelectedExtraData(data?.chartExtraData[userIndex]);
    }
  }, [userIndex, chartTwoData, data]);

  useEffect(() => {
    if (data?.chartOne) {
      setChartOneBackgroundColor([]);
      setChartOneBorderColor([]);
      setChartOneData([]);
      setChartOneTitle([]);
      data?.chartOne.map((data) => {
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
        return true;
      });
    }

    if (data?.chartTwo) {
      setChartTwoBorderColor([]);
      setChartTwoBackgroundColor([]);
      setChartTwoTitle([]);
      setChartTwoData([]);
      setCenterTextChartTwo([]);

      data?.chartTwo.map((data) => {
        setChartTwoBackgroundColor((oldData) => [
          ...oldData,
          data?.backgroundColor ?? "",
        ]);
        setChartTwoBorderColor((oldData) => [
          ...oldData,
          data?.borderColor ?? "",
        ]);
        setChartTwoTitle((oldData) => [...oldData, data?.name ?? ""]);
        setChartTwoData((oldData) => [...oldData, data?.data ?? []]);
        setCenterTextChartTwo((oldData) => [...oldData, data?.text ?? ""]);
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
                {data?.chartOne?.map((data) => {
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
                      <h6 className="pl-10">{data?.chartOneTipData}</h6>
                    </div>
                    <div>
                      <label className="pl-10 tip-data text-wrap">
                        {data?.tipData[userIndex]?.tip1 ?? ""}
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
                {data?.chartTwo?.map((data) => {
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
                      <h6 className="pl-10">{data?.chartTwoTipData}</h6>
                    </div>
                    <div>
                      <label className="pl-10 tip-data">
                        {data?.tipData[userIndex]?.tip2 ?? ""}
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
        {userSelectedExtraData && (
          <div className="d-flex flex-wrap flex-column">
            <div>
              <h4>{data?.chartExtraDataLabel ?? ""}</h4>
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
