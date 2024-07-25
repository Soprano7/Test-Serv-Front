import { useEffect, useState } from "react";
import "./App.css";
import CarsTable from "./components/cars-table";
import CarMarks from "./components/car-marks";
import CarModels from "./components/car-models";
import Pagination from "./components/pagination";
import { CarType } from "./types/CarType";
import { api } from "./api";

const url = process.env.SERVER_LINK;

function App() {
  const [page, setPage] = useState(1);
  const [cars, setCars] = useState<CarType[]>([]);
  const [mark, setMark] = useState("");
  const [models, setModels] = useState<string[]>([]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const onChangeMark = (mark: string) => {
    setMark(mark);
  };

  const onChangeModel = (model: string) => {
    if (models.indexOf(model) === -1) {
      setModels(prev => [...prev, model]);
    }
  };

  const onRemoveModel = (model: string) => {
    setModels(models.filter(element => element !== model));
  };

  useEffect(() => {
    async function fetchCars() {
      try {
        const { data } = await api.get<CarType[]>(`/cars?page=${page}&mark=${mark}&models=${models.join(",")}`);
        if (data) setCars(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCars();
  }, [page, mark, models]);

  return (
    <div className="App">
      <CarMarks onChangeMark={onChangeMark} mark={mark} />
      <CarModels onChangeModel={onChangeModel} models={models} mark={mark} onRemoveModel={onRemoveModel} />
      <CarsTable cars={cars} />
    </div>
  );
}

export default App;
