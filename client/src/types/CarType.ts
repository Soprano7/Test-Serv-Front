export type CarType = {
  _id: string; // ID
  mark: string; // Марка
  model: string; // Модель
  engine: {
    power: number; // Мощность
    volume: number; // Объем
    transmission: string; // КПП,
    fuel: string; // Топливо
  };
  drive: string;
  equipmentName: string; // Название комплектации
  price: number; // Стоимость
  createdAt: Date; // Дата создания
};
