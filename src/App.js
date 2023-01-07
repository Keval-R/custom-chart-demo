import Chart from "./lib/Chart";
import { fakeData } from "./lib/api";

function App() {
  return(
    <Chart data={fakeData}/>
  )
}

export default App;
