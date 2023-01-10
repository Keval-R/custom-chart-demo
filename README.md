# react-custom-doughnut-chart

Custom doughnut chart is dynamic chart component.  
Here is showing 2 charts. First is full doughnut chart when user select any colour section of first chart that time second chart (half doughnut chart)  value change. Also same as change dynamic way bottom side data.Here we create this chart component dynamic way using JSON object. So here you can change title, colour, text more.
## Image & video

**Image**:![screenshot-localhost_3000-2023 01 06-16_27_45](https://user-images.githubusercontent.com/108857417/211002967-1eccf892-809c-4da4-98b9-b19583a08feb.png)

**Video:** https://user-images.githubusercontent.com/108857417/211003095-3dddd797-803f-42e1-87f8-6352b1c5cccf.mp4

## JSON

- Here we use JSON which is use show dynamic data & UI in component. 
- We can hide some UI seaction if set key value as explian here.
  - Object key tipData & extraChartData value pass as empty array ([]).
  - Object key firstChartTipData & secondChartTipData value pass as empty string ("").

## Installation

Install package.

```bash
  npm i custom-react-doughnut-chart
```

## Examples

```javascript
import Chart from "custom-react-doughnut-chart";

const apiData = {
  chartOneDatasetLabel: "use",
  chartTwoDatasetLabel: "use",
  chartOne: [
    {
      name: "Dharam Singh Deol",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      data: 65,
      chartTwoData: [12, 15, 12],
      text: "60%",
    },
    {
      name: "Bobby Deol",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      data: 44,
      chartTwoData: [50, 85, 92],
      text: "64%",
    },
    {
      name: "Sunny Deol",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      data: 80,
      chartTwoData: [20, 65, 72],
      text: "15%",
    },
  ],
  chartTwo: [
    {
      name: "Food",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    {
      name: "Education",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgba(153, 102, 255, 1)",
      data: [20, 45, 93, 45, 62],
      text: "95%",
    },
    {
      name: "Others",
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      borderColor: "rgba(255, 159, 64, 1)",
    },
  ],
  chartOneTipData: "Tip one:",
  chartTwoTipData: "Tip two:",
  tipData: [
    {
      tip1: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
      tip2: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
    },
    {
      tip1: "Demo tip1",
      tip2: "Demo tip2 extra",
    },
    {
      tip1: "Demo tip3 main",
      tip2: "Demo tip3 extra",
    },
  ],
  chartExtraDataLabel: "User Data",
  chartExtraData: [
    {
      name: "Dharam Singh Deol",
      bio: 'Dharam Singh Deol (born 8 December 1935), also known mononymously as Dharmendra, is an Indian actor, producer and politician who is known for his work in Hindi films He has also worked in few Punjabi films. Known as the first "He-Man" of Bollywood, Dharmendra has worked in over 301 films in a career spanning over six decades,[1][2]He is one of the most successful actors in the history of Hindi Cinema.[3][4][5] In 1997, he received the Filmfare Lifetime Achievement Award for his contribution to Hindi cinema. He was a member of the 15th Lok Sabha of India, representing Bikaner constituency in Rajasthan from Bharatiya Janata Party (BJP). In 2012, he was awarded India third-highest civilian honour Padma Bhushan by the Government of India.',
      dob: "December 8,1935  ",
      work: "Actor",
    },
    {
      name: "Bobby Deol",
      bio: "Vijay Singh Deol (born 27 January 1967) popularly known as Bobby Deol, is an Indian actor who works in Hindi cinema and web series.[1][2] A member of the Deol family, he is the younger son of veteran actor Dharmendra. His accolades include a Filmfare Award.",
      dob: "January 27, 1967",
    },
    {
      name: "Sunny Deol",
      bio: "Ajay Singh Deol (born 19 October 1956),[1][3] better known by his stage name Sunny Deol, is an Indian actor, film director, producer, politician and current Member of Parliament from Gurdaspur (Lok Sabha constituency) of Punjab, India.[4] As an actor, he has worked in more than 100 Hindi films and earned the image of an angry action hero.[5] He went on to star in numerous successful films in the 1980s and 1990s and is considered as one of the top stars of that time.[6] He starred in several blockbuster movies such as Ghayal, Darr, Damini, Jeet, Ghatak, Ziddi, Border and Gadar: Ek Prem Katha.[7] Deol has won two National Film Award for Best Actor[8][9] and two Filmfare Awards.[",
      dob: "October 19,1956 ",
    },
  ],
};

const App = () => {
  return <Chart data={apiData} />;
};

export default App;
```

# LICENSE!

React custom doughnut chart is [MIT-licensed](https://github.com/Mindinventory/react-native-tabbar-interaction/blob/master/LICENSE).

# Let us know!

We’d be really happy if you send us links to your projects where you use our component. Just send an email to sales@mindinventory.com And do let us know if you have any questions or suggestion regarding our work.
