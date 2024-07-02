import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { UseBudget } from "../hooks/useBudget";

export default function FilterByCategory() {
  const {dispatch } = UseBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    dispatch({ type: "add-filter-category", payload: { id: e.target.value } });
  };
  return (
    <div className="p-10 bg-white rounded-lg shadow-lg">
      <form>
        <div className="flex flex-col md:flex-row md:items-center">
          <label htmlFor="category"></label>
          <select
            name="category"
            id="category"
            className="flex-1 p-3 rounded bg-slate-100"
            onChange={handleChange}
          >
            <option value="">-- Todas las Categorias --</option>
            {categories.map((categori) => (
              <option key={categori.id} value={categori.id}>
                {categori.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
