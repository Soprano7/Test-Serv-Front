import { CarType } from "../../types/CarType";
import "./styles.css";

interface ITableElement {
    car: CarType;
}

const TableElement = ({ car }: ITableElement) => {
    const formattedDate = car.createdAt.toLocaleDateString(); // Или любой другой метод форматирования

    return (
        <div>
            <p>{car._id}</p>
            <p>
                {car.mark} {car.model}
            </p>
            <p>
                {car.engine.volume} ({car.engine.transmission} л.с.) {car.engine.power}
            </p>
            <p>{car.equipmentName}</p>
            <p>{car.price} P</p>
            <p>{formattedDate}</p>
        </div>
    );
};

export default TableElement;