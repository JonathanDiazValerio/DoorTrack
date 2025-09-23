import { useState } from 'react'
import MeasurementForm from '../MeasurementForm'

export default function MeasurementFormExample() {
  const [measurements, setMeasurements] = useState([]);

  const handleSaveMeasurement = (height, width) => {
    const newMeasurement = {
      id: Date.now().toString(),
      height,
      width,
      createdAt: new Date().toISOString(),
    };
    setMeasurements([...measurements, newMeasurement]);
  };

  return (
    <MeasurementForm
      clientName="Johnson Construction"
      onSaveMeasurement={handleSaveMeasurement}
    />
  )
}