import { useState, ReactNode, useEffect, ChangeEvent } from "react";
import axios from "axios";

interface ModelDetails {
  type: string;
  description: string;
  hyperparameters: { [key: string]: string };
}

function Model() {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [models, setModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [modelDetails, setModelDetails] = useState<ModelDetails>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string>("");
  const [tempSelectedModel, setTempSelectedModel] = useState('')
  useEffect(() => {
    axios
      .get("http://localhost:5000/models")
      .then((response) => {
        setModels(response.data.models);
        console.log("List of models: ", response.data.models);
      })
      .catch((error) => {
        console.error("No mdoels avaiable", error);
      });
  }, []);

  useEffect(() => {
    if (selectedModel) {
      fetchModelDetails(selectedModel);
      setSelectedModel("");
    }
    if (modelDetails && isSubmitted) {
      showPublic();
    }
  }, [selectedModel, modelDetails]);

  const fetchModelDetails = (model: string) => {
    axios
      .post("http://localhost:5000/model_details", { model: [model] })
      .then((response) => {
        setModelDetails(response.data);
        setIsSubmitted(true);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const showPrivate = () => {
    console.log("private button is clicked");
    setContent(
      <div className="grid justify-center items-center text-white">
        There are not private models available for you!
      </div>
    );
  };

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("changed");
    setSelectedModel(event.target.value);
    setTempSelectedModel(event.target.value);
    console.log("Selected Model:", event.target.value);
  };

  const handleClick = () => {
    setIsSubmitted(true);

    if (!tempSelectedModel) {
      setError("Model is not available!!!");
      return;
    }
    showPublic();
    axios
      .post("http://localhost:5000/models", { model: tempSelectedModel })
      .then((response) => {
          console.log(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const showPublic = () => {
    console.log("private button is clicked");
    setContent(
      <div>
        <div>
          <select
            className="text-black text-2xl w-[30%] h-10 m-5 rounded-lg bg-slate-200 pl-3 border border-slate-800"
            onChange={handleModelChange}
            // value={selectedModel}
          >
            <optgroup label="Choose a model">
              <option value=" " disabled hidden selected>
                Select a model
              </option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </optgroup>
          </select>
          <button
            onClick={handleClick}
            className="text-black border border-slate-800 pr-10 pl-10 h-10 rounded-lg bg-slate-300"
          >
            Submit
          </button>
        </div>
        {isSubmitted && modelDetails && (
          <div className="p-10">
            <h1 className="text-white">Hellow</h1>
            <h2 className="text-white">{selectedModel}</h2>
            <p className="text-white">
              <strong>Type:</strong> {modelDetails.model.type}
            </p>
            <p className="text-white">
              <strong>Description:</strong> {modelDetails.model.description}
            </p>
            <p className="text-white">
              <strong>Hyperparameters:</strong>
            </p>
            <ul>
              {Object.entries(modelDetails.model.hyperparameters).map(
                ([key, value]) => (
                  <li key={key} className="text-white">
                    <strong>{key}:</strong> {value}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    );
  };

  return (
    <div>
      <h1 className=" text-gray-50 text-3xl p-20"> Models </h1>
      <div className="flex">
        <button
          className="pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-l-lg hover:bg-slate-600 text-white"
          onClick={showPrivate}
        >
          Private Model
        </button>
        <button
          className="pl-5 pr-5 pt-3 pb-3 border border-slate-500 rounded-r-lg hover:bg-slate-600 text-white"
          onClick={showPublic}
        >
          Public Model
        </button>
      </div>
      {content}
    </div>
  );
}

export default Model;
