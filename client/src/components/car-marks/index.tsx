import { useEffect, useState } from "react";
import "./styles.css";
import { api } from "../../api";

interface ICarMarks {
  mark: string;
  onChangeMark: (mark: string) => void;
}

const CarMarks = ({ mark, onChangeMark }: ICarMarks) => {
  const [marks, setMarks] = useState<string[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<string[]>("/cars/marks");
        if (data) {
          setMarks(data);
        }
      } catch (error: any) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchMarks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
      <div className="CarMarks">
        {marks.map((mark) => (
            <p key={mark} onClick={() => onChangeMark(mark)}>
              {mark}
            </p>
        ))}
      </div>
  );
};

export default CarMarks;