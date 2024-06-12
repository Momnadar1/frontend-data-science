import { useState, ChangeEvent, useEffect } from "react"
import axios from 'axios'

interface DatasetRow {
  id: number;
  name: string;
  value: number;
}

function Kernel() {
  const [datasets, setDatasets] = useState<string[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string>('');
  const [datasetRows, setDatasetRows] = useState<DatasetRow[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(new Set());
  const [featureColumns, setFeatureColumns] = useState<Set<string>>(new Set())
  const [unselectedColumns, setUnselectedColumns] = useState<string[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/datasets') // 127.0.0.1 l === local
      .then(response => {
        setDatasets(response.data);
        console.log("datasets",datasets)
      })
      .catch(error => {
        console.error('Error fetching datasets:', error)
      });

    axios.get('http://localhost:5000/features')
      .then(response => setFeatureColumns(new Set(response.data.features)))
      .catch(error => console.error('Error fetching feature columns:', error));
  });

  const fetchDataset = () => {
    const formData = new FormData();
    formData.append('dataset_name', selectedDataset);

    axios.post('http://localhost:5000/datasets', formData)
      .then(response => {
        if (response.data.error) {
          console.error('Error:', response.data.error);
        } else {
          const rows: DatasetRow[] = JSON.parse(response.data.data);
          setDatasetRows(rows);
        }
      })
      .catch(error => console.error('Error fetching dataset:', error));
  };

  const fetchUnselectedColumns = () => {
    const formData = new FormData();
    formData.append('dataset_name', selectedDataset);

    axios.post('http://localhost:5000/get_unselected_columns', formData)
      .then(response => {
        if (response.data.error) {
          console.error('Error:', response.data.error);
        } else {
          setUnselectedColumns(response.data.unselected_columns);
        }
      })
      .catch(error => console.error('Error fetching unselected columns:', error));
  };

  const handleColumnSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const columnName = event.target.name;
    setSelectedColumns(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(columnName)) {
        newSelection.delete(columnName);
      } else {
        newSelection.add(columnName);
      }
      return newSelection;
    });
  };

  const saveSelectedColumns = () => {
    const selected = Array.from(selectedColumns);
    axios.post('http://localhost:5000/features', { selected })
      .then(response => {
        if (response.data.success) {
          console.log('Columns saved successfully');
          setFeatureColumns(new Set(response.data.features));
        } else {
          console.error('Error saving columns:', response.data.error);
        }
      })
      .catch(error => console.error('Error saving columns:', error));
  };

  return (
    <>
      <div className="pl-20 pt-20 text-white">
        <div className="flex mb-5">
          <img
            className="w-[60px]"
            src="/assets/kernel.png"
            alt="" />
          <p className="text-white text-4xl"> &nbsp; Kernel</p>
        </div>

        <div>
          <select className="text-black text-xl w-[30%] h-10 rounded-lg bg-slate-200 pl-3 border border-slate-800 mr-5 mb-5" onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedDataset(e.target.value)}>
            <optgroup label="Choose a dataset">
              <option disabled hidden selected>Select a dataset</option>
              {datasets.map(dataset => (
                <option key={dataset} value={dataset}>{dataset}</option>
              ))}
            </optgroup>
          </select>
          <button onClick={fetchDataset} className="text-black border border-slate-800 pr-10 pl-10 h-10 rounded-lg bg-slate-300">Load Dataset</button>
          {datasetRows.length > 0 && (
            <table className="border-collapse border border-black">
              <thead>
                <tr>
                  {Object.keys(datasetRows[0]).map(column => (
                    <th key={column} className="border px-4 py-2">
                      <label>
                        <input
                          type="checkbox"
                          name={column}
                          onChange={handleColumnSelection}
                          disabled={featureColumns.has(column)}
                        />
                        {column}
                      </label>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datasetRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex} className="border px-4 py-2">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button
            onClick={saveSelectedColumns}
            className="text-black border border-slate-800 pr-10 pl-10 h-10 rounded-lg bg-slate-300 mt-5"
          >
            Save Selection
          </button>

          <button
            onClick={fetchUnselectedColumns}
            className="text-black border border-slate-800 pr-10 pl-10 h-10 rounded-lg bg-slate-300 mt-5"
          >
            Load Target Column
          </button>

          {unselectedColumns.length > 0 && (
            <div className="mt-5">
              <h3 className="text-white text-xl">The target column:</h3>
              <ul>
                {unselectedColumns.map(column => (
                  <li key={column} className="text-white">{column}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>

    </>
  )
}

export default Kernel