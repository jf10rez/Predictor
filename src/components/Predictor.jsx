import { useEffect, useState } from "react";

export const Predictor = () => {
  const net = new brain.recurrent.LSTMTimeStep();
  const [newResult, setNewResult] = useState(0);
  const [resultsToTrain, setResultsToTrain] = useState([1, 2, 3, 4, 5]);
  const [prediction, setPrediction] = useState(0);

  const addNewResult = (e) => {
    e.preventDefault();
    setResultsToTrain([...resultsToTrain, newResult]);
  };

  useEffect(() => {

    if (resultsToTrain.length > 0) {
      /* Entrenamiento */
      net.train([resultsToTrain]);

      /* Predicción */
      setPrediction(net.run(resultsToTrain));
    }
  }, [resultsToTrain]);

  return (
    <div>
      <form onSubmit={addNewResult}>
        <input
          type="text"
          placeholder="Agregar nuevo resultado"
          name="new"
          value={newResult.result}
          onChange={(e) => setNewResult(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <h1>Posible proximo resultado: {prediction}</h1>
    </div>
  );
};
