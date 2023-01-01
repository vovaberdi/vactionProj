import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from "axios";

  ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );

function Chart(): JSX.Element {
    const [vication, setVication] = useState<any[]>([]);


    const token = localStorage.getItem('token');
    useEffect(() => {
        const url = "http://localhost:3001/vication/all";
        axios.get(url,{
            headers: {authorization: `Bearer ${token}`,
            }
        })
       .then((response) => {
        setVication(response.data);
       }).catch((error) => {console.log("error", error);});
   }, []);


    const graph = {
        labels: vication.map(v => v.destenation),
        datasets: [{
          label: 'Most Followed vacation',
          data: vication.map(v => v.followers),
          backgroundColor: [
            'rgb(153, 102, 255)'
          ],
          borderColor: [
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      };

    return (
        <div className="Chart">
            <Bar  data={graph} />
        </div>
    );
}
export default Chart;
